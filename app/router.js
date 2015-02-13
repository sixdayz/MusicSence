
/** @namespace App.Routers */
namespace('App.Routers');

App.Routers.Main = Backbone.Router.extend({

    initialize: function(options) {
        this.app        = options.app;
        this.enterView  = new App.Views.Enter.Layout({ app: this.app });
        this.playerView = new App.Views.Player.Layout({ app: this.app });
    },

    routes: {
        'player':       'start',
        'player/enter': 'enter',
        'player/start': 'player'
    },

    start: function() {
        console.log('start');
        console.trace();

        // Нарисуем стартовый вид
        //this.app.getContent().html(this.enterView.render().$el);
        //this.enterView.showLoginView();

        // Авторизуем пользователя
        this.app.userManager.authorize()

            // В случае успеха - показываем основной интерфейс
            .done(function() {
                this.app.navigate('player/start');
            }.bind(this))

            // А если не удалось - страницу входа
            .fail(function() {
                this.app.navigate('player/enter');
            }.bind(this));
    },

    enter: function() {
        console.log('enter');
        console.trace();
        this.app.getContent().html(this.enterView.render().$el);
        this.enterView.showLoginView();
    },

    player: function() {
        if ( ! this.app.userManager.isAuthorized()) {
            this.app.navigate('player/enter');
        } else {
            this.app.getContent().html(this.playerView.render().$el);
        }
    }

});