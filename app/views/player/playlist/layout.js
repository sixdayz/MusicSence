
/** @namespace App.Views.Player.Playlist */
namespace('App.Views.Player.Playlist');

App.Views.Player.Playlist.Layout = Backbone.View.extend({

    tagName: 'ul',
    className: 'media-list',

    initialize: function () {
        this.collection.on('remove reset', this.render, this);
    },

    render: function() {
        this.$el.empty();

        this.collection.each(function (model) {
            var itemView = new App.Views.Player.Playlist.Item({ model: model });
            itemView.on('select', this._onItemSelect, this);
            this.$el.append(itemView.render().$el);
        }, this);

        this.delegateEvents();
        return this;
    },

    _onItemSelect: function (song) {
        this.trigger('select:song', song);
    }
});