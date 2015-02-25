
/** @namespace App.Managers */
namespace('App.Managers');

App.Managers.ContextManager = Backbone.Model.extend({

    createContext: function() {
        var deferred = new $.Deferred();
        var context = new App.Models.Context();

        $.ajax({
            url: 'http://ipinfo.io',
            type: 'GET',
            dataType: 'jsonp'
        }).done(function(data) {

            context.set('ip', data.ip);

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

                    deferred.resolve(context);
                }.bind(this));
            }

        }.bind(this));

        return deferred.promise();
    }

});