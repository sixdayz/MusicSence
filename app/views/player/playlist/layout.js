
/** @namespace App.Views.Player.Playlist */
namespace('App.Views.Player.Playlist');

App.Views.Player.Playlist.Layout = Backbone.View.extend({

    tagName: 'ul',
    className: 'media-list',
    template: jst['app/templates/player/playlist/layout.hbs'],

    render: function() {
        this.$el.html(this.template);
        this.delegateEvents();
        return this;
    }
});