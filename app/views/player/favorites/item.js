
/** @namespace App.Views.Player.Favorites */
namespace('App.Views.Player.Favorites');

App.Views.Player.Favorites.Item = Backbone.View.extend({

    tagName: 'div',
    className: 'col-sm-6',
    template: jst['app/templates/player/favorites/item.hbs'],

    events: {
        'click': '_onClick',
        'click [data-role=remove-btn]': '_onRemoveBtnClick'
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        this.delegateEvents();
        return this;
    },

    _onClick: function () {
        this.trigger('select', this.model);
    },

    _onRemoveBtnClick: function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.trigger('click:remove', this.model);
    }
});