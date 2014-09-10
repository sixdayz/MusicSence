
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

        App.Dispatcher.on(App.Events.Suggest.select, this.onSuggestSelect, this);
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
                this.app.playlistSongs.reset(songsCollection.toJSON());

                this.$songsContainer.empty();
                this.app.playlistSongs.slice(0, 10).forEach(function(songModel) {

                    var songView = new App.Views.Player.Song({ model: songModel });
                    this.$songsContainer.append(songView.render().$el);

                    // Подпишемся на событие необходимости генерации
                    // нового списка на основе данного трека
                    songView.on('generate', this.generateFeedBySong, this);

                }.bind(this));
            }.bind(this))

            .always(function() {
                this.$generateBtn.button('reset');
            }.bind(this));
    },

    generateFeedBySong: function(songModel) {
        this.generateFeed(
            songModel.get('songArtist'),
            App.Enums.MediaType.ARTIST
        );
    },

    onSuggestSelect: function(suggestItem) {
        this.generateFeed(
            suggestItem.get('name'),
            suggestItem.get('type').toLowerCase()
        );
    }
});