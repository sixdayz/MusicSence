
namespace('App.Routers');

App.Routers.Main = Backbone.Router.extend({

    initialize: function(options) {
        this.app        = options.app;
        this.enterView  = new App.Views.Enter.Layout({ app: this.app });
    },

    routes: {
        '':         'start',
        'enter':    'enter',
        'player':   'player'
    },

    start: function() {

        // Нарисуем стартовый вид
        this.app.getContent().html(this.enterView.render().$el);

        // Авторизуем пользователя
        this.app.userManager.authorize()

            // В случае успеха - показываем основной интерфейс
            .done(function() {
                this.app.navigate('player');
            }.bind(this))

            // А если не удалось - страницу входа
            .fail(function() {
                this.app.navigate('enter');
            }.bind(this));
    },

    enter: function() {
        this.app.getContent().html(this.enterView.render().$el);
        this.enterView.showEnterControls();
    },

    player: function() {
        if ( ! this.app.userManager.isAuthorized()) {
            this.app.navigate('enter');
        }

        //
        console.log('player!!!');
    }

});