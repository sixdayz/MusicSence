
/** @namespace App.Views.Player.Playlist */
namespace('App.Views.Player.Playlist');

App.Views.Player.Playlist.Item = Backbone.View.extend({

    tagName: 'li',
    className: 'media',
    template: jst['app/templates/player/playlist/item.hbs'],

    events: {
        'click [data-role=btn]': '_onClick'
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        this.delegateEvents();
        return this;
    },

    _onClick: function () {
        this.trigger('select', this.model);
    }
});