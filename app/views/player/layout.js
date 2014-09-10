
namespace('App.Views.Player');

App.Views.Player.Layout = Backbone.View.extend({

    initialize: function(options) {
        this.app            = options.app;
        this.playerView     = new App.Views.Player.Player();
        this.artistView     = new App.Views.Player.Artist();
        this.playlistView   = new App.Views.Player.Playlist();
    },

    render: function() {
        this.$el.append(this.playerView.render().$el);
        this.$el.append(this.artistView.render().$el);
        this.$el.append(this.playlistView.render().$el);
        return this;
    }

});