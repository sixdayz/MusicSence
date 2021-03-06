
/** @namespace App.Views.Player */
namespace('App.Views.Player');

App.Views.Player.Layout = Backbone.View.extend({

    tagName: 'section',
    className: 'play',
    template: jst['app/templates/player/layout.hbs'],

    initialize: function(options) {
        this.app = options.app;
        this.playlistSongs = new App.Collections.Songs();

        this.playerView = new App.Views.Player.Player.Layout({ app: this.app, collection: this.playlistSongs });
        this.playerView.on('add:favorite', this._onAddFavorite, this);

        this.searchView = new App.Views.Player.Search.Layout({ app: this.app });
        this.searchView.on('generate', this._onGenerateFeed, this);

        this.playlistView = new App.Views.Player.Playlist.Layout({ app: this.app, collection: this.playlistSongs });
        this.playlistView.on('select:song', this._onSongSelect, this);

        this.favoritesManager   = this.app.favoritesManager;
        this.favoritesView      = new App.Views.Player.Favorites.Layout({ app: this.app, manager: this.favoritesManager });
        this.favoritesView.on('select:song', this._onSongSelect, this);
    },

    render: function() {
        this.$el.html(this.template);

        this.$('[data-role=player]').html(this.playerView.render().$el);
        this.$('[data-role=search]').html(this.searchView.render().$el);
        this.$('[data-role=playlist]').html(this.playlistView.render().$el);
        this.$('[data-role=favorites]').html(this.favoritesView.render().$el);

        return this;
    },

    // Когда трек добавился в избранное в API,
    // вручную добавим его в список избранного,
    // чтобы не делать лишних запросов на сервер
    _onAddFavorite: function (song) {
        this.favoritesView.collection.add(song);
    },

    _onGenerateFeed: function (songs) {
        this.playlistSongs.reset(songs.models);
        this.showPlayer();
        this.showPlaylist();
    },

    _onSongSelect: function (song) {
        this.searchView.generateFeed(song.get('artist'), 'artist');
        this.playerView.play(song);
        this.showPlayer();
    },

    showPlayer: function () {
        this.$('[data-role=player-tab]').tab('show');
    },

    showSearch: function () {
        this.$('[data-role=search-tab]').tab('show');
    },

    showPlaylist: function () {
        this.$('[data-role=playlist-tab]').tab('show');
    },

    showFavorites: function () {
        this.$('[data-role=favorites-tab]').tab('show');
    }

});