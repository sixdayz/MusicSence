
namespace('App.Views.Suggest');

App.Views.Suggest.Control = Backbone.View.extend({

    tagName: 'div',
    id: 'search',

    events: {
        'click [data-role=open-btn]':   'openInput',
        'click [data-role=close-btn]':  'closeInput',
        'keyup [name=search]':          'loadSuggest'
    },

    bindings: {
        '[name=search]': 'query'
    },

    initialize: function(options) {
        this.model          = new App.Models.SuggestControl();
        this.app            = options.app;
        this.template       = jst['app/templates/suggest/control.hbs'];

        App.Dispatcher.on(App.Events.authenticate, this.show, this);
        App.Dispatcher.on(App.Events.authorize, this.show, this);
        App.Dispatcher.on(App.Events.registration, this.show, this);
        App.Dispatcher.on(App.Events.Suggest.select, this.onSelect, this);
    },

    render: function() {
        this.$el.html(this.template);

        this.$openBtn           = this.$('[data-role=open-btn]');
        this.$closeBtn          = this.$('[data-role=close-btn]').hide();
        this.$searchInput       = this.$('[name=search]');
        this.$itemsContainer    = this.$('[data-role=items-container]');

        this.stickit();
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
        this.$itemsContainer.hide();
        this.$searchInput.val('');
        this.$searchInput.animate({ 'width': 15, 'marginLeft': 275 });
    },

    loadSuggest: _.debounce(function() {
        var queryString = this.model.get('query');
        if (queryString.length > 2) {

            this.app.suggestManager.search(queryString)
                .done(function(itemsCollection) {

                    this.$itemsContainer.empty();
                    this.$itemsContainer.show();

                    // Заполним выпадающий список
                    itemsCollection.slice(0, 10).forEach(function(model) {

                        var itemView = new App.Views.Suggest.Item({ model: model });
                        this.$itemsContainer.append(itemView.render().$el);

                    }.bind(this));
                }.bind(this));

        } else {
            this.$itemsContainer.hide();
        }
    }, 300),

    onSelect: function(selectedItem) {
        // При выборе элемента из выпавшего списка
        // вставим его название в поле вводу текста
        this.$searchInput.val(selectedItem.get('name'));
        this.$itemsContainer.hide();
    }

});