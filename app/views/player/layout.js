
namespace('App.Views.Player');

App.Views.Player.Layout = Backbone.View.extend({

    initialize: function(options) {
        this.app            = options.app;
        this.playerView     = new App.Views.Player.Player({ app: this.app });
        this.artistView     = new App.Views.Player.Artist({ app: this.app });
        this.playlistView   = new App.Views.Player.Playlist({ app: this.app });
    },

    render: function() {
        // this.$el.append(this.playerView.render().$el);
        // this.$el.append(this.artistView.render().$el);
        this.$el.append(this.playlistView.render().$el);
        return this;
    }

});