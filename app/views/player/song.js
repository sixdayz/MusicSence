
namespace('App.Views.Player');

App.Views.Player.Song = Backbone.View.extend({

    tagName: 'div',
    className: 'row border',

    initialize: function(options) {
        this.template   = jst['app/templates/player/song.hbs'];
    },

    render: function() {
        this.$el.html(this.template);
        this.delegateEvents();
        return this;
    }
});