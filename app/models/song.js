
namespace('App.Models');

App.Models.Song = Backbone.Model.extend({

    idAttribute: 'soundTrackId',
    defaults: function () {
        return {
            is_logged: false
        };
    }

});