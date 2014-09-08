
namespace('App.Views.Enter');

App.Views.Enter.Registration = Backbone.View.extend({

    tagName: 'div',
    className: 'modal_reg',

    initialize: function() {
        this.template = jst['app/templates/enter/registration.hbs'];
    },

    render: function() {
        this.$el.html(this.template);
        return this;
    }

});