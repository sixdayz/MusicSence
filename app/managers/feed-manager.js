
/** @namespace App.Managers */
namespace('App.Managers');

App.Managers.FeedManager = Backbone.Model.extend({

    initialize: function(options) {
        this.set('api_client', options.api_client);
        this.set('context_manager', options.context_manager);
    },

    /**
     * @param query
     * @param type string artist|album|title|genre
     * @param lastFeedId
     * @returns {*}
     */
    generate: function(query, type, lastFeedId) {
        var deferred = new $.Deferred();

        // Подготовим параметры запроса

        console.log(type);
        type        = (null === type) ? type : type.toLowerCase();
        var params  = { type: 'default', last_feed: lastFeedId };

        switch (type) {

            case 'artist':
            case 'album':
            case 'genre':
                params.type = type;
                params[type] = query;
                break;

            case 'track':
                params.type = type;
                params.title = query;
                break;

            default:
                break;
        }

        // Выполним сам запрос

        this.get('context_manager').createContext().done(function(context) {
            params.context = JSON.stringify(context.toJSON());

            this.get('api_client')
                .post('/musicfeed/generate', params)
                .done(function(response) {

                    if (response.error) {
                        deferred.reject(response.error);
                    } else {
                        deferred.resolve(response.result);
                    }

                })
            ;
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

        return deferred.promise();
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