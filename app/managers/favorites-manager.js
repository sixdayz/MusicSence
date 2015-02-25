
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
        var deferred = new $.Deferred();

        this.get('api_client')
            .post('/musicfeed/favorites/add', { song_id: song.get('song_id') })
            .done(function(response) {

                switch (response.error) {

                    case 'limit-exceeded':
                        deferred.reject('Free slots for favorites is ended');
                        break;

                    case 'already-favorite':
                        deferred.reject('Selected track already in favorites');
                        break;

                    case 'song-not-found':
                        deferred.reject('Invalid song id');
                        break;

                    case 'empty-song-id':
                        deferred.reject('Song id ir required');
                        break;

                    default:
                        deferred.reject(response.error);
                        break;
                }
                if (response.error) {

                } else {
                    deferred.resolve();
                }
            }
        );

        return deferred.promise();
    },

    remove: function (song) {
        var deferred = new $.Deferred();

        this.get('api_client')
            .post('/musicfeed/favorites/remove', { song_id: song.get('song_id') })
            .done(function(response) {

                if (response.error) {
                    deferred.reject(response.error);
                } else {
                    deferred.resolve();
                }
            }
        );

        return deferred.promise();
    }

});