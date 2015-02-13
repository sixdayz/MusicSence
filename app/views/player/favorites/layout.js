
/** @namespace App.Views.Player.Favorites */
namespace('App.Views.Player.Favorites');

App.Views.Player.Favorites.Layout = Backbone.View.extend({

    tagName: 'div',

    initialize: function (options) {
        this.collection = new App.Collections.Songs();
        this.collection.on('reset remove', this.render, this);
        this.manager    = options.manager;
        this._loadFavorites();
    },

    _loadFavorites: function () {
        this.manager.getList().done(function (songs) {
            this.collection.reset(songs.models);
        }.bind(this));
    },

    render: function() {
        this.$el.empty();

        this.collection.each(function (songModel) {
            var songView = new App.Views.Player.Favorites.Item({ model: songModel });
            this.$el.append(songView.render().$el);
        }, this);

        this.delegateEvents();
        return this;
    }
});