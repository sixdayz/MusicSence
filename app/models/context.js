
namespace('App.Models');

App.Models.Context = Backbone.Model.extend({

    defaults: function() {
        return {
            time:                   moment().format('YYYY-MM-DD HH:mm:ss'),
            location:               null,
            locale:                 navigator.language,
            device:                 'browser',
            ip:                     null
        };
    }

});