
namespace('App.Managers');

App.Managers.FeedManager = Backbone.Model.extend({

    initialize: function(options) {
        this.set('api_client', options.api_client);
    },

    generate: function(query, type, context) {

    },

    getSongs: function(feedId, limit, context) {

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