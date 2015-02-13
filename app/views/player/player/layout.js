
/** @namespace App.Views.Player.Player */
namespace('App.Views.Player.Player');

App.Views.Player.Player.Layout = Backbone.View.extend({

    tagName: 'div',
    template: jst['app/templates/player/player/layout.hbs'],

    render: function() {
        this.$el.html(this.template);

        this.$slider = this.$('[data-role=slider]');

        this._initSlider();
        this.delegateEvents();

        return this;
    },

    _initSlider: function () {
        this.$slider.slider({
            max : 100,
            min : 1,
            tooltip : 'hide'
        });
    }
});