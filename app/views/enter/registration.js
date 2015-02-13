
/** @namespace App.Views.Enter */
namespace('App.Views.Enter');

App.Views.Enter.Registration = Backbone.View.extend({

    tagName: 'div',
    className: 'row',
    template: jst['app/templates/enter/registration.hbs'],

    events: {
        'click [data-role=login-btn]':          'showLoginView',
        'submit [data-role=registration-form]': 'registration'
    },

    bindings: {
        '[name=login]':     'login',
        '[name=email]':     'email',
        '[name=password]':  'password'
    },

    initialize: function(options) {
        this.model      = new App.Models.Enter.Registration();
        this.app        = options.app;
        this.layout     = options.layout;
    },

    render: function() {
        this.$el.html(this.template);

        this.$regBtn = this.$('[data-role=complete-btn]');

        this.stickit();
        this.delegateEvents();
        return this;
    },

    showLoginView: function(event) {
        event.preventDefault();
        this.layout.showLoginView();
    },

    registration: function(event) {
        event.preventDefault();
        this.$regBtn.button('loading');

        this.app.userManager.register(
            this.model.get('login'),
            this.model.get('email'),
            this.model.get('password')
        )

        .done(function() {
            this.$el.hide();
            this.app.navigate('player');
        }.bind(this))

        .fail(function(errorText) {
            alert(errorText);
        }.bind(this))

        .always(function() {
            this.$regBtn.button('reset');
        }.bind(this));
    }

});