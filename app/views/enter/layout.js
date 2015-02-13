
/** @namespace App.Views.Enter */
namespace('App.Views.Enter');

App.Views.Enter.Layout = Backbone.View.extend({

    tagName: 'section',
    className: 'login',
    template: jst['app/templates/enter/layout.hbs'],

    initialize: function(options) {
        this.app        = options.app;
        this.loginView  = new App.Views.Enter.Login({ layout: this, app: this.app });
        this.regView    = new App.Views.Enter.Registration({ layout: this, app: this.app });
    },

    render: function() {
        this.$el.html(this.template);

        this.$forms     = this.$('[data-role=forms]');
        this.$loginView = this.loginView.render().$el.hide();
        this.$regView   = this.regView.render().$el.hide();

        this.$forms.append(this.$loginView);
        this.$forms.append(this.$regView);

        this.delegateEvents();
        return this;
    },

    showRegistrationView: function() {
        this.$loginView.hide();
        this.$regView.fadeIn();
    },

    showLoginView: function() {
        this.$regView.hide();
        this.$loginView.fadeIn();
    }

});