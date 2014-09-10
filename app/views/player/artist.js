
namespace('App.Views.Player');

App.Views.Player.Artist = Backbone.View.extend({

    tagName: 'div',
    className: 'artist',

    initialize: function(options) {
        this.template   = jst['app/templates/player/artist.hbs'];
    },

    render: function() {
        this.$el.html(this.template({
            title: '',
            artist: ''
        }));

        this.delegateEvents();
        return this;
    }
});