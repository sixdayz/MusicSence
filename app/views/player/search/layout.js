
/** @namespace App.Views.Player.Search */
namespace('App.Views.Player.Search');

App.Views.Player.Search.Layout = Backbone.View.extend({

    tagName: 'div',
    className: 'row',
    template: jst['app/templates/player/search/layout.hbs'],

    events: {
        'click [data-role="generate-btn"]': '_generateFeed',
        'click [data-role="search-btn"]': '_generateFeed'
    },

    initialize: function (options) {
        this.app                = options.app;
        this.feedManager        = this.app.feedManager;
        this.isGenerating       = false;
        this.currentPercentage  = 0;
        this.pieTimeout         = null;
    },

    render: function() {
        this.$el.html(this.template);

        this.$progress      = this.$('[data-role=progressbar]');
        this.$searchName    = this.$('[data-role=search-name]');
        this.$searchType    = this.$('[data-role=search-type]');
        this.$generateBtn   = this.$('[data-role=generate-btn]');

        this._initPieProgress();
        this._initSuggest();
        this.delegateEvents();

        this.generateFeed(null, null);
        return this;
    },

    generateFeed: function (name, type) {
        this.$searchName.val(name);
        this.$searchType.val(type);
        this._generateFeed();
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
                this._generateFeed();
            }.bind(this))
        ;
    },

    _initPieProgress: function () {
        this.$progress.asPieProgress({
            namespace: 'pie_progress',
            min: 0,
            max: 100,
            goal: 100,
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
        });
    },

    _generateFeed: function () {

        this._resetPieProgress();
        this.isGenerating       = true;
        this._startPieProgress(70, 100);

        this.$generateBtn.button('loading');

        this.feedManager
            .generate(this.$searchName.val(), this.$searchType.val(), this.feedManager.getLastFeedId())
            .done(function (feedId) {
                this.feedManager.getSongs(feedId).done(function (songs) {
                    this.isGenerating = false;

                    // Сообщим о найденных треках
                    this.trigger('generate', songs);
                    this.$generateBtn.button('reset');

                }.bind(this));
            }.bind(this))
        ;
    },

    _startPieProgress: function (timeout, percentLeft) {

        // Подвинем прогресс
        this.currentPercentage++;
        this.$progress.asPieProgress('go', this.currentPercentage);

        if (this.currentPercentage < 100 && this.isGenerating) {

            // Если прошли очередную половину остатка процентов
            // то уменьшим скорость прогрессбара.
            // Он будет замедляться по мере приближения к 100%,
            // т. к. он не привязан жестко к реальному процессу
            // генерации
            if ((100 - this.currentPercentage) < (percentLeft / 2)) {
                percentLeft = parseInt(percentLeft / 2);
                timeout     = timeout * 2;
            }

            // Если еще не закончили, запланируем следующий сдвиг
            this.pieTimeout = setTimeout(function () {
                this._startPieProgress(timeout, percentLeft);
            }.bind(this), timeout);

        } else {

            // Закончилась генерация
            this._resetPieProgress();

        }
    },

    _resetPieProgress: function () {
        clearTimeout(this.pieTimeout);
        this.pieTimeout         = null;
        this.currentPercentage  = 0;
        this.$progress.asPieProgress('reset');
    }
});