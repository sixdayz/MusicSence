
/** @namespace App.Views.Player.Favorites */
namespace('App.Views.Player.Favorites');

App.Views.Player.Favorites.Layout = Backbone.View.extend({

    tagName: 'div',
    className: 'row',
    template: jst['app/templates/player/favorites/layout.hbs'],

    render: function() {
        this.$el.html(this.template);
        this.delegateEvents();
        return this;
    }
});