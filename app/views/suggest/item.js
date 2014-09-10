
namespace('App.Views.Suggest');

App.Views.Suggest.Item = Backbone.View.extend({

    tagName: 'div',
    className: 'artist_row',

    events: {
        'click': 'selectSuggest'
    },

    initialize: function(options) {
        this.template = jst['app/templates/suggest/item.hbs'];
    },

    render: function() {
        this.$el.html(this.template( this.model.toJSON() ));
        return this;
    },

    selectSuggest: function() {
        // При выборе элемента списка сгенерируем глобальное событие
        App.Dispatcher.trigger(
            App.Events.Suggest.select,
            this.model
        );
    }
});