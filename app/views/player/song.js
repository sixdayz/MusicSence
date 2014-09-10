
namespace('App.Views.Player');

App.Views.Player.Song = Backbone.View.extend({

    tagName: 'div',
    className: 'row border',

    events: {
        'click [data-role=generate-by-song-btn]': 'onGenerate'
    },

    initialize: function(options) {
        this.template   = jst['app/templates/player/song.hbs'];
    },

    render: function() {
        this.$el.html(this.template( this.model.toJSON() ));
        this.delegateEvents();
        return this;
    },

    onGenerate: function(event) {
        event.preventDefault();
        this.trigger('generate', this.model);
    }
});