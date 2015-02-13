
namespace('App');

App.Application = Backbone.View.extend({

    el: 'body',

    initialize: function(config) {

        this.config             = new App.Models.Config(config);
        this.apiClient          = new App.Lib.ApiClient({ api_host: this.config.get('api_host') });
        this.userManager        = new App.Managers.UserManager({ api_client: this.apiClient });
        this.favoritesManager   = new App.Managers.FavoritesManager({ api_client: this.apiClient });

        this.contextManager = new App.Managers.ContextManager();
        this.feedManager    = new App.Managers.FeedManager({
            api_client:         this.apiClient,
            context_manager:    this.contextManager
        });

        this.router         = new App.Routers.Main({ app: this });
    },

    navigate: function(fragment) {
        this.router.navigate(
            fragment,
            { trigger: true }
        );
    },

    render: function() {
        this.$content = this.$('[data-role=page-content]');
        return this;
    },

    // Возвращает ссылку на блок контента страницы
    getContent: function() {
        return this.$content;
    },

    start: function() {
        this.render();

        // Инициализация роутинга
        Backbone.history.start({ pushState: true });
    }

});