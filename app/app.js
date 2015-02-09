
namespace('App');

App.Application = Backbone.View.extend({

    el: 'body',

    initialize: function(config) {
        this.playlistSongs  = new App.Collections.Songs();
        this.config         = new App.Models.Config(config);
        this.apiClient      = new App.Lib.ApiClient({ api_host: this.config.get('api_host') });
        this.userManager    = new App.Managers.UserManager({ api_client: this.apiClient });
        this.suggestManager = new App.Managers.SuggestManager({ api_client: this.apiClient });

        this.contextManager = new App.Managers.ContextManager();
        this.feedManager    = new App.Managers.FeedManager({
            api_client:         this.apiClient,
            context_manager:    this.contextManager
        });

        this.router         = new App.Routers.Main({ app: this });
        this.suggestView    = new App.Views.Suggest.Control({ app: this });
    },

    navigate: function(fragment) {
        this.router.navigate(
            fragment,
            { trigger: true }
        );
    },

    render: function() {

        // // Инициализируем ссылки на контейнеры
        // this.$header    = this.$('[data-role=page-header]');
        // this.$content   = this.$('[data-role=page-content]');

        // // Добавим представления
        // this.$header.append(this.suggestView.render().$el.hide());

        return this;
    },

    // Возвращает ссылку на блок контента страницы
    getContent: function() {
        return this.$content;
    },

    start: function() {
        this.render();

        // Инициализация роутинга
        Backbone.history.start({ pushState: false });

        // Идем на главную
        this.navigate('');
    }

});