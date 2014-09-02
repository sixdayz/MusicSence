
namespace('App.Models');

App.Models.Context = Backbone.Model.extend({

    defaults: function() {
        return {
            time:                   moment().format('YYYY-MM-DD HH:mm:ss'),
            location:               null,
            speed:                  null,
            audio_output:           null,
            internet_connection:    null,
            locale:                 navigator.language,
            avg_step_count:         null,
            device:                 null,
            ip:                     null
        };
    }

});