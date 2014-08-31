
namespace('App.Lib');

App.Lib.ApiClient = function(options) {

    var private = $.extend({
        api_host: null
    }, options);

    return {

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

            var url = private.api_host + apiMethod;
            return $.ajax({
                url:    url,
                type:   httpMethod,
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

    };
};

App.Lib.ApiClient.HTTP_METHOD_GET   = 'get';
App.Lib.ApiClient.HTTP_METHOD_POST  = 'post';