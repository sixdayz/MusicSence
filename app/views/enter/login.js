
namespace('App.Views.Enter');

App.Views.Enter.Login = Backbone.View.extend({

    tagName: 'div',
    className: 'modal_login',

    events: {
        'click [data-role=reg-btn]':    'showRegistrationView',
        'click [data-role=cancel-btn]': 'hide'
    },

    initialize: function(options) {
        this.layout     = options.layout;
        this.template   = jst['app/templates/enter/login.hbs'];
    },

    render: function() {
        this.$el.html(this.template);
        this.delegateEvents();
        return this;
    },

    showRegistrationView: function(event) {
        event.preventDefault();
        this.layout.showRegistrationView(event);
    },

    hide: function(event) {
        event.preventDefault();
        this.$el.fadeOut();
    }

});