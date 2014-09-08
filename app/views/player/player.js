
namespace('App.Views.Player');

App.Views.Player.Player = Backbone.View.extend({

    tagName: 'div',
    className: 'player',

    initialize: function(options) {
        this.template   = jst['app/templates/player/player.hbs'];
    },

    render: function() {
        this.$el.html(this.template);
        this.delegateEvents();
        return this;
    }
});