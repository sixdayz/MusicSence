
namespace('App.Managers');

App.Managers.SuggestManager = Backbone.Model.extend({

    initialize: function(options) {
        this.set('api_client', options.api_client);
    },

    search: function(query, type) {
        return this.get('api_client').post('/musicfeed/suggest', {
            q:      query,
            type:   type
        });
    }

});

App.Managers.SuggestType = {
    ARTIST: 'artist',
    ALBUM:  'album',
    GENRE:  'genre'
};