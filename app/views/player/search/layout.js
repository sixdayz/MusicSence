
/** @namespace App.Views.Player.Search */
namespace('App.Views.Player.Search');

App.Views.Player.Search.Layout = Backbone.View.extend({

    tagName: 'div',
    className: 'row',
    template: jst['app/templates/player/search/layout.hbs'],

    events: {
        'click [data-role="generate-btn"]': '_generateFeed'
    },

    initialize: function (options) {
        this.app            = options.app;
        this.feedManager    = this.app.feedManager;
    },

    render: function() {
        this.$el.html(this.template);

        this.$progress      = this.$('[data-role=progressbar]');
        this.$searchName    = this.$('[data-role=search-name]');
        this.$searchType    = this.$('[data-role=search-type]');

        this._initPieProgress();
        this._initSuggest();
        this.delegateEvents();

        return this;
    },

    _initSuggest: function () {

        var tracks = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            limit: 10,
            remote: {
                url: '/api/musicfeed/suggest',
                filter: function (response) {
                    return $.map(response.items, function (item) {
                        return {
                            type: item.type,
                            name: item.name
                        };
                    });
                },
                replace: function(url, query) {
                    return url + "#" + query;
                },
                ajax: {
                    type: 'POST',
                    beforeSend: function(jqXhr, settings) {
                        settings.data = $.param({ q: this.$searchName.val() });
                    }.bind(this)
                }
            }
        });

        tracks.initialize();

        this.$searchName.typeahead({
                highlight: true,
                minLength: 3
            }, {
                name: 'tracks',
                displayKey: 'name',
                source: tracks.ttAdapter()
            })
            .on('typeahead:selected', function (event, selected) {
                this.$searchType.val(selected.type);
            }.bind(this))
        ;
    },

    _initPieProgress: function () {
        this.$progress.asPieProgress({
            namespace: 'pie_progress',
            min: 0,
            max: 100,
            goal: 50,
            step: 1,
            speed: 10,  // speed of 1/100
            delay: 300,
            barcolor: '#fa8c75',
            barsize: '3',
            trackcolor: '#f2f2f2',
            fillcolor: 'none',

            label: function(n) {
                return this.getPercentage(n);
            }
//	    onStart: function(){},
//	    onStop: function(){},
//	    onUpdate: function(){},
//	    onReset: function(){}

        });

        this.$('#button_start').on('click', function(){
            this.$progress.asPieProgress('start');
        }.bind(this));
    },

    _generateFeed: function () {
        this.feedManager.generate(this.$searchName.val(), null).done(function (feedId) {
            this.feedManager.getSongs(feedId).done(function (songs) {

                // Сообщим о найденных треках
                this.trigger('generate', songs);

            }.bind(this));
        }.bind(this));
    }
});