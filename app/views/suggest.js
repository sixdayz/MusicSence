
namespace('App.Views');

App.Views.Suggest = Backbone.View.extend({

    tagName: 'div',
    id: 'search',

    events: {
        'click [data-role=open-btn]':   'openInput',
        'click [data-role=close-btn]': 'closeInput'
    },

    initialize: function(options) {
        this.template   = jst['app/templates/suggest.hbs'];

        App.Dispatcher.on(App.Events.authenticate, this.show, this);
        App.Dispatcher.on(App.Events.authorize, this.show, this);
        App.Dispatcher.on(App.Events.registration, this.show, this);
    },

    render: function() {
        this.$el.html(this.template);

        this.$openBtn       = this.$('[data-role=open-btn]');
        this.$closeBtn      = this.$('[data-role=close-btn]').hide();
        this.$searchInput   = this.$('[name=search]');

        this.delegateEvents();
        return this;
    },

    show: function() {
        this.$el.show();
    },

    openInput: function(event) {
        event.preventDefault();
        this.$openBtn.hide();
        this.$closeBtn.show();
        this.$searchInput.animate({ 'width': 285, 'marginLeft': 25 });
    },

    closeInput: function(event) {
        event.preventDefault();
        this.$openBtn.show();
        this.$closeBtn.hide();
        this.$searchInput.animate({ 'width': 15, 'marginLeft': 275 });
    }

});