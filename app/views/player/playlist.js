
namespace('App.Views.Player');

App.Views.Player.Playlist = Backbone.View.extend({

    tagName: 'div',
    className: 'playlist',

    events: {
        'click [data-role=generate-btn]': 'onGenerate'
    },

    initialize: function(options) {
        this.app        = options.app;
        this.template   = jst['app/templates/player/playlist.hbs'];
    },

    render: function() {
        this.$el.html(this.template);

        this.$generateBtn       = this.$('[data-role=generate-btn]');
        this.$songsContainer    = this.$('[data-role=songs-container]');

        this.delegateEvents();
        return this;
    },

    onGenerate: function(event) {
        event.preventDefault();
        this.generateFeed(null, null);
    },

    generateFeed: function(query, type) {
        this.$generateBtn.button('loading');
        this.app.feedManager.generate(query, type)

            .done(function(feedId) {
                this.loadSongs(feedId);
            }.bind(this))

            .always(function() {
                this.$generateBtn.button('reset');
            }.bind(this));
    },

    loadSongs: function(feedId) {
        this.$generateBtn.button('loading');
        this.app.feedManager.getSongs(feedId, 1000)

            .done(function(songsCollection) {
                this.$songsContainer.empty();
                songsCollection.slice(0, 10).forEach(function(songModel) {

                    var songView = new App.Views.Player.Song({ model: songModel });
                    this.$songsContainer.append(songView.render().$el);

                }.bind(this));
            }.bind(this))

            .always(function() {
                this.$generateBtn.button('reset');
            }.bind(this));
    }
});