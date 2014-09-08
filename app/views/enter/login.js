
namespace('App.Views.Enter');

App.Views.Enter.Login = Backbone.View.extend({

    tagName: 'div',
    className: 'modal_login',

    initialize: function() {
        this.template = jst['app/templates/enter/login.hbs'];
    },

    render: function() {
        this.$el.html(this.template);
        return this;
    }

});