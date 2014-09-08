
namespace('App.Views');

App.Views.Enter = Backbone.View.extend({

    tagName: 'div',
    className: 'center',

    initialize: function() {
        this.template = jst['app/templates/enter.hbs'];
    },

    render: function() {
        this.$el.html(this.template);
        this.$loading   = this.$('[data-role=loading]');
        this.$enterBtns = this.$('[data-role=enter-btns]').hide();
        return this;
    },

    showEnterControls: function() {
        this.$loading.hide();
        this.$enterBtns.show();
    }

});