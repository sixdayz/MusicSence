
/** @namespace App.Views.Player */
namespace('App.Views.Player');

App.Views.Player.Layout = Backbone.View.extend({

    tagName: 'section',
    className: 'play',
    template: jst['app/templates/player/layout.hbs'],

    initialize: function(options) {
        this.app            = options.app;
        this.playlistSongs  = new App.Collections.Songs();
        this.playerView     = new App.Views.Player.Player.Layout({ app: this.app });
        this.searchView     = new App.Views.Player.Search.Layout({ app: this.app });
        this.playlistView   = new App.Views.Player.Playlist.Layout({ app: this.app });
        this.favoritesView  = new App.Views.Player.Favorites.Layout({ app: this.app });
    },

    render: function() {
        this.$el.html(this.template);

        this.$('[data-role=player]').html(this.playerView.render().$el);
        this.$('[data-role=search]').html(this.searchView.render().$el);
        this.$('[data-role=playlist]').html(this.playlistView.render().$el);
        this.$('[data-role=favorites]').html(this.favoritesView.render().$el);

        return this;
    }

});