
/** @namespace App.Views.Enter */
namespace('App.Views.Enter');

App.Views.Enter.Login = Backbone.View.extend({

    tagName: 'div',
    className: 'row',
    template: jst['app/templates/enter/login.hbs'],

    events: {
        'click [data-role=reg-btn]':        'showRegistrationView',
        'submit [data-role=login-form]':    'login'
    },

    bindings: {
        '[name=login]':     'login',
        '[name=password]':  'password'
    },

    initialize: function(options) {
        this.model      = new App.Models.Enter.Login();
        this.app        = options.app;
        this.layout     = options.layout;
    },

    render: function() {
        this.$el.html(this.template);

        this.$loginBtn = this.$('[data-role=complete-btn]');

        this.stickit();
        this.delegateEvents();

        return this;
    },

    showRegistrationView: function(event) {
        event.preventDefault();
        this.layout.showRegistrationView();
    },

    login: function(event) {
        event.preventDefault();
        this.$loginBtn.button('loading');

        this.app.userManager.authenticate(this.model.get('login'), this.model.get('password'))

            .done(function() {
                this.$el.hide();
                this.app.navigate('/player');
            }.bind(this))

            .fail(function() {
                console.log(arguments);
                alert('Invalid login or password');
            }.bind(this))

            .always(function() {
                this.$loginBtn.button('reset');
            }.bind(this));
    }

});