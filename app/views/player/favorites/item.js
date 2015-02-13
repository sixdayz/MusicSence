
/** @namespace App.Views.Player.Favorites */
namespace('App.Views.Player.Favorites');

App.Views.Player.Favorites.Item = Backbone.View.extend({

    tagName: 'div',
    className: 'col-sm-6',
    template: jst['app/templates/player/favorites/item.hbs'],

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        this.delegateEvents();
        return this;
    }
});