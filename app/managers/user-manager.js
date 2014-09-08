
namespace('App.Managers');

App.Managers.UserManager = Backbone.Model.extend({

    initialize: function(options) {
        this.set('api_client', options.api_client);
        this.set('current_user', new App.Models.User({ is_authorized: false }));
    },

    authenticate: function(login, password) {

        // При успешной аутентификации в cookie пользователя
        // запишется токен авторизации, и все последующие
        // запросы уже можно отпаравлять, пока не появится 403
        var request = this.get('api_client').post('/users/login', {
            account:    login,
            password:   password
        });

        request.done(function() {
            // Сгенерируем событие об успешной аутентификации
            App.Dispatcher.trigger(App.Events.authenticate);
        });

        return request;
    },

    register: function(username, email, password) {
        var request = this.get('api_client').post('/users/register', {
            name:       username,
            email:      email,
            password:   password
        });

        request.done(function() {
            // Сгенерируем событие об успешной регистрации
            App.Dispatcher.trigger(App.Events.registration);
        });

        return request;
    },

    authorize: function() {
        var request = this.get('api_client').get('/users/info');

        request.done(function(data) {
            this.get('current_user').set(data);
            this.get('current_user').set('is_authorized', true);

            // Сгенерируем событие об успешной авторизации
            App.Dispatcher.trigger(App.Events.authorize);

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