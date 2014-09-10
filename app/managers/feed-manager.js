
namespace('App.Managers');

App.Managers.FeedManager = Backbone.Model.extend({

    initialize: function(options) {
        this.set('api_client', options.api_client);
        this.set('context_manager', options.context_manager);
    },

    generate: function(query, type) {
        var deferred = new $.Deferred();

        this.get('context_manager').createContext().done(function(context) {
            this.get('api_client').post('/musicfeed/generate', {
                q:          query,
                type:       type,
                context:    JSON.stringify(context.toJSON())
            }).done(function(response) {

                if (response.error) {
                    deferred.reject(response.error);
                } else {
                    deferred.resolve(response.result);
                }

            });
        }.bind(this));

        return deferred.promise();
    },

    getSongs: function(feedId, limit) {
        var deferred = new $.Deferred();

        this.get('api_client')
            .post('/musicfeed/' + feedId + '/songs', { limit: limit })
            .done(function(response) {
                var songs = new App.Collections.Songs(response.items);
                deferred.resolve(songs);
            });

        return deferred;
    },

    like: function() {

    },

    dislike: function() {

    },

    skip: function() {

    },

    played: function() {

    }

});