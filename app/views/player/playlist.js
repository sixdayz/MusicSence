
namespace('App.Views.Player');

App.Views.Player.Playlist = Backbone.View.extend({

    tagName: 'div',
    className: 'playlist',

    initialize: function(options) {
        this.template   = jst['app/templates/player/playlist.hbs'];
    },

    render: function() {
        this.$el.html(this.template);
        this.delegateEvents();
        return this;
    }
});