
namespace('App');

App.Application = Backbone.View.extend({

    initialize: function(config) {
        this.config     = new App.Models.Config(config);
        this.apiClient  = new App.Lib.ApiClient({ api_host: this.config.get('api_host') });
    },

    start: function() {

    }

});