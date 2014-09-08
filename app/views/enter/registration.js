
namespace('App.Views.Enter');

App.Views.Enter.Registration = Backbone.View.extend({

    tagName: 'div',
    className: 'modal_reg',

    events: {
        'click [data-role=login-btn]':  'showLoginView',
        'click [data-role=cancel-btn]': 'hide'
    },

    initialize: function(options) {
        this.layout     = options.layout;
        this.template   = jst['app/templates/enter/registration.hbs'];
    },

    render: function() {
        this.$el.html(this.template);
        this.delegateEvents();
        return this;
    },

    showLoginView: function(event) {
        event.preventDefault();
        this.layout.showLoginView(event);
    },

    hide: function(event) {
        event.preventDefault();
        this.$el.fadeOut();
    }

});