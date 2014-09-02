
namespace('App.Managers');

App.Managers.ContextManager = Backbone.Model.extend({

    createContext: function() {
        this.set('create_deferred', new $.Deferred());
        this.set('context', new App.Models.Context());

        this._setIp(this.get('context')).then(function() {
            this._setLocation(this.get('context'));
        }.bind(this));

        return this.get('create_deferred').promise();
    },

    _setIp: function(context) {
        return $.ajax({
            url: 'http://ipinfo.io',
            type: 'GET',
            dataType: 'jsonp',
            success: function(data) {
                context.set('ip', data.ip);
            }
        });
    },

    _setLocation: function(context) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                if (position) {
                    context.set(
                        'location',
                        position.coords.latitude + ';' + position.coords.longitude
                    );
                } else {
                    // Пользователь не одобрил
                    context.set('location', 'disabled');
                }

                this.get('create_deferred').resolve(context);
            }.bind(this));
        }
    }

});