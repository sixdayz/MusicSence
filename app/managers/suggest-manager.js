
namespace('App.Managers');

App.Managers.SuggestManager = Backbone.Model.extend({

    initialize: function(options) {
        this.set('api_client', options.api_client);
    },

    search: function(query) {
        var deferred = new $.Deferred();

        this.get('api_client')
            .post('/musicfeed/suggest', { q: query })
            .done(function(response) {
                var items = new App.Collections.SuggestItems(response.items);
                deferred.resolve(items);
            });

        return deferred;
    }

});