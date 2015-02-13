
/** @namespace App.Managers */
namespace('App.Managers');

App.Managers.FavoritesManager = Backbone.Model.extend({

    initialize: function(options) {
        this.set('api_client', options.api_client);
    },

    getList: function () {
        var deferred = new $.Deferred();

        this.get('api_client')
            .post('/musicfeed/favorites')
            .done(function(response) {

                if (response.error) {
                    deferred.reject(response.error);
                } else {
                    var songs = new App.Collections.Songs(response.songs);
                    deferred.resolve(songs);
                }
            }
        );

        return deferred.promise();
    },

    add: function (song) {

    },

    remove: function (song) {

    }

    //generate: function(query, type, lastFeedId) {
    //    var deferred = new $.Deferred();
    //
    //    this.get('context_manager').createContext().done(function(context) {
    //        this.get('api_client').post('/musicfeed/generate', {
    //            q:          query,
    //            type:       type,
    //            context:    JSON.stringify(context.toJSON()),
    //            last_feed:  lastFeedId
    //        }).done(function(response) {
    //
    //            if (response.error) {
    //                deferred.reject(response.error);
    //            } else {
    //                deferred.resolve(response.result);
    //            }
    //
    //        });
    //    }.bind(this));
    //
    //    return deferred.promise();
    //},
    //
    //getSongs: function(feedId, limit) {
    //    var deferred = new $.Deferred();
    //
    //    this.get('api_client')
    //        .post('/musicfeed/' + feedId + '/songs', { limit: limit })
    //        .done(function(response) {
    //            var songs = new App.Collections.Songs(response.items);
    //            deferred.resolve(songs);
    //        });
    //
    //    return deferred;
    //}

});