
namespace('App.Views.Enter');

App.Views.Enter.Layout = Backbone.View.extend({

    tagName: 'div',
    className: 'center',

    events: {
        'click [data-role=reg-btn]':    'showRegistrationView',
        'click [data-role=login-btn]':  'showLoginView'
    },

    initialize: function(options) {
        this.app        = options.app;
        this.template   = jst['app/templates/enter/layout.hbs'];
        this.loginView  = new App.Views.Enter.Login({ layout: this, app: this.app });
        this.regView    = new App.Views.Enter.Registration({ layout: this, app: this.app });
    },

    render: function() {
        this.$el.html(this.template);

        this.$loading   = this.$('[data-role=loading]');
        this.$enterBtns = this.$('[data-role=enter-btns]').hide();
        this.$loginView = this.loginView.render().$el.hide();
        this.$regView   = this.regView.render().$el.hide();

        this.app.getContent().after(this.$loginView);
        this.app.getContent().after(this.$regView);

        this.delegateEvents();
        return this;
    },

    showEnterControls: function() {
        this.$loading.hide();
        this.$enterBtns.show();
        this.delegateEvents();
    },

    showRegistrationView: function(event) {
        event.preventDefault();
        this.$loginView.hide();
        this.$regView.fadeIn();
    },

    showLoginView: function(event) {
        event.preventDefault();
        this.$regView.hide();
        this.$loginView.fadeIn();
    }

});