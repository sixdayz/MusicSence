
namespace('App.Managers');

App.Managers.UserManager = Backbone.Model.extend({

    initialize: function(options) {
        this.set('api_client', options.api_client);
        this.set('current_user', new App.Models.User({ is_authorized: false }));
    },

    authenticate: function(login, password) {

        // При успешной авторизации в cookie пользователя
        // запишется токен авторизации, и все последующие
        // запросы уже можно отпаравлять, пока не появится 403
        return this.get('api_client').post('/users/login', {
            account: login,
            password: password
        });
    },

    register: function() {

    },

    authorize: function() {
        var request = this.get('api_client').get('/users/info');

        request.done(function(data) {
            this.get('current_user').set(data);
            this.get('current_user').set('is_authorized', true);
        }.bind(this));

        return request;
    },

    isAuthorized: function() {
        return this.getUser().get('is_authorized');
    },

    getUser: function() {
        return this.get('current_user');
    }

});