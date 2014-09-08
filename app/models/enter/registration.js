
namespace('App.Models.Enter');

App.Models.Enter.Registration = Backbone.Model.extend({

    defaults: {
        login: null,
        email: null,
        password: null
    }

});