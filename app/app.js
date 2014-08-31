
namespace('App');

App.Application = Backbone.View.extend({

    initialize: function(config) {
        this.config         = new App.Models.Config(config);
        this.apiClient      = new App.Lib.ApiClient({ api_host: this.config.get('api_host') });
        this.userManager    = new App.Managers.UserManager({ api_client: this.apiClient });
    },

    start: function() {

        // Авторизуем пользователя
        this.userManager.authorize()
            .done(function() {
                // Рендерим шаблон для авторизованного пользователя
            })
            .fail(function() {
                // Отправляем на авторизацию
            });
    }

});