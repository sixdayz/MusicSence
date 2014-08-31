
namespace('App.Lib');

App.Lib.ApiClient = Backbone.Model.extend({

    initialize: function(options) {
        this.set('api_host', options.api_host);
    },

    /**
     * @param string httpMethod
     * @param string apiMethod
     * @param object params
     * @return jQuery.Deferred
     */
    send: function(httpMethod, apiMethod, params) {
        switch(httpMethod) {
            case App.Lib.ApiClient.HTTP_METHOD_GET:
            case App.Lib.ApiClient.HTTP_METHOD_POST:
                break;
            default:
                throw new Error('HTTP method ' + httpMethod + ' not allowed');
        }

        var url = this.get('api_host') + apiMethod;
        return $.ajax({
            async:  true,
            cache:  false,
            data:   params
        });
    },

    get: function(apiMethod, params) {
        return this.send(App.Lib.ApiClient.HTTP_METHOD_GET, apiMethod, params);
    },

    post: function(apiMethod, params) {
        return this.send(App.Lib.ApiClient.HTTP_METHOD_POST, apiMethod, params);
    }

});

App.Lib.ApiClient.HTTP_METHOD_GET   = 'get';
App.Lib.ApiClient.HTTP_METHOD_POST  = 'post';