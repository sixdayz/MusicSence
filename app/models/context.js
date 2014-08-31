
namespace('App.Models');

App.Models.Context = Backbone.Model.extend({

    defaults: function() {
        return {
            time:                   null,
            location:               null,
            speed:                  null,
            audio_output:           null,
            internet_connection:    null,
            locale:                 null,
            avg_step_count:         null,
            device:                 null,
            ip:                     null
        };
    }

});