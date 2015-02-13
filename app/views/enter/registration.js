
/** @namespace App.Views.Enter */
namespace('App.Views.Enter');

App.Views.Enter.Registration = Backbone.View.extend({

    tagName: 'div',
    className: 'row',
    template: jst['app/templates/enter/registration.hbs'],

    events: {
        'click [data-role=login-btn]': 'showLoginView'
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

        this.$regBtn    = this.$('[data-role=complete-btn]');
        this.$form      = this.$('[data-role=registration-form]');

        this._initBootstrapValidator();
        this.stickit();
        this.delegateEvents();
        return this;
    },

    _initBootstrapValidator: function () {
        this.$form.bootstrapValidator({
            submitButtons: '[data-role="complete-btn"]',
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'fa fa-check',
                invalid: 'fa fa-times',
                validating: 'fa fa-spinner fa-spin'
            },
            fields: {
                login: {
                    validators: {
                        notEmpty: {
                            message: 'The login is required and can\'t be empty'
                        }
                    }
                },
                email: {
                    validators: {
                        notEmpty: {
                            message: 'The email address is required and can\'t be empty'
                        },
                        emailAddress: {
                            message: 'The input is not a valid email address'
                        }
                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: 'The password is required and can\'t be empty'
                        }
                    }
                }
            }
        }).on('success.form.bv', function(event) {
            event.preventDefault();
            this.registration();
        }.bind(this));
    },

    showLoginView: function(event) {
        event.preventDefault();
        this.layout.showLoginView();
    },

    registration: function() {
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
            }.bind(this))
        ;
    }

});