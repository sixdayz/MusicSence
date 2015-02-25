
/** @namespace App.Views.Player.Favorites */
namespace('App.Views.Player.Favorites');

App.Views.Player.Favorites.Layout = Backbone.View.extend({

    tagName: 'div',

    initialize: function (options) {
        this.collection = new App.Collections.Songs();
        this.collection.on('add reset remove', this.render, this);
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
            songView.on('select', this._onItemSelect, this);
            songView.on('click:remove', this._onItemRemoveClick, this);
            this.$el.append(songView.render().$el);
        }, this);

        this.delegateEvents();
        return this;
    },

    _onItemSelect: function (song) {
        this.trigger('select:song', song);
    },

    _onItemRemoveClick: function (song) {
        this.manager
            .remove(song)

            .done(function () {
                this.collection.remove(song);
            }.bind(this))

            .fail(function () {
                alert('When you remove the error occurred. Please try again later');
            })
        ;
    }
});