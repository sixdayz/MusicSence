
namespace('App');

App.Application = Backbone.View.extend({

    initialize: function(config) {
        this.config = new App.Models.Config(config);
    },

    start: function() {

    }

});