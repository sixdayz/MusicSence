
/** @namespace App.Views.Enter */
namespace('App.Views.Enter');

App.Views.Enter.Login = Backbone.View.extend({

    tagName: 'div',
    className: 'row',
    template: jst['app/templates/enter/login.hbs'],

    events: {
        'click [data-role=reg-btn]': 'showRegistrationView'
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

        this.$loginBtn  = this.$('[data-role=complete-btn]');
        this.$form      = this.$('[data-role=login-form]');

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
                            message: 'The login or email address is required and can\'t be empty'
                        }/*,
                        emailAddress: {
                            message: 'The input is not a valid email address'
                        }*/
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
            this.login();
        }.bind(this));
    },

    showRegistrationView: function(event) {
        event.preventDefault();
        this.layout.showRegistrationView();
    },

    login: function() {
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
            }.bind(this))
        ;
    }

});