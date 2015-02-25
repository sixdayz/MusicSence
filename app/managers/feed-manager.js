
/** @namespace App.Managers */
namespace('App.Managers');

App.Managers.FeedManager = Backbone.Model.extend({

    initialize: function(options) {
        this.set('api_client', options.api_client);
        this.set('context_manager', options.context_manager);
        this.ajaxOperation = null;
        this.lastFeedId = null;
    },

    getLastFeedId: function () {
        return this.lastFeedId;
    },

    /**
     * @param query
     * @param type string artist|album|title|genre
     * @param lastFeedId
     * @returns {*}
     */
    generate: function(query, type, lastFeedId) {
        var deferred = new $.Deferred();

        // Отменим выполнение предыдущих запросов
        this.abort();

        // Подготовим параметры запроса

        type        = (null === type) ? type : type.toLowerCase();
        var params  = { type: 'default', last_feed: lastFeedId };

        switch (type) {

            case 'artist':
            case 'album':
            case 'genre':
                params.type = type;
                params[type] = query;
                break;

            case 'track':
                params.type = type;
                params.title = query;
                break;

            default:
                break;
        }

        // Выполним сам запрос

        this.get('context_manager').createContext().done(function(context) {
            params.context = JSON.stringify(context.toJSON());

            this.ajaxOperation = this.get('api_client')
                .post('/musicfeed/generate', params)

                .done(function(response) {

                    if (response.error) {
                        deferred.reject(response.error);
                    } else {
                        this.lastFeedId = response.result;
                        deferred.resolve(response.result);
                    }

                }.bind(this))

                .always(function () {
                    this.ajaxOperation = null;
                }.bind(this))
            ;
        }.bind(this));

        return deferred.promise();
    },

    getSongs: function(feedId, limit) {
        var deferred = new $.Deferred();

        // Отменим выполнение предыдущих запросов
        this.abort();

        // Запустим получение списка треков
        this.ajaxOperation = this.get('api_client')
            .post('/musicfeed/' + feedId + '/songs', { limit: 1 })
            .done(function(response) {

                // Повторный вызов но уже для получения полного списка
                this.ajaxOperation = this.get('api_client')
                    .post('/musicfeed/' + feedId + '/songs', { limit: response.totalCount })
                    .done(function(response) {

                        var songs = new App.Collections.Songs(response.items);
                        deferred.resolve(songs);

                    }.bind(this))
                    .always(function () {
                        this.ajaxOperation = null;
                    }.bind(this))
                ;

            }.bind(this))
            .always(function () {
                this.ajaxOperation = null;
            }.bind(this))
        ;

        return deferred.promise();
    },

    /**
     * Прекращение выполнения любой асинхронной
     * операции feedManager, выполняющейся в текущий
     * момент и поддерживающей отмену
     */
    abort: function () {
        if (this.ajaxOperation) {
            this.ajaxOperation.abort();
        }
    },

    like: function(songId, position, feedId) {
        this.get('context_manager').createContext().done(function(context) {
            this.get('api_client')
                .post('/musicfeed/like', {
                    song_id:    songId,
                    feed_id:    feedId,
                    context:    JSON.stringify(context.toJSON()),
                    position:   position
                })
            ;
        }.bind(this));
    },

    dislike: function(songId, position, feedId) {
        this.get('context_manager').createContext().done(function(context) {
            this.get('api_client')
                .post('/musicfeed/dislike', {
                    song_id:    songId,
                    feed_id:    feedId,
                    context:    JSON.stringify(context.toJSON()),
                    position:   position
                })
            ;
        }.bind(this));
    },

    skip: function(songId, position, feedId) {
        this.get('context_manager').createContext().done(function(context) {
            this.get('api_client')
                .post('/musicfeed/skip', {
                    song_id:    songId,
                    feed_id:    feedId,
                    context:    JSON.stringify(context.toJSON()),
                    position:   position
                })
            ;
        }.bind(this));
    },

    played: function(songId, position, feedId) {
        this.get('context_manager').createContext().done(function(context) {
            this.get('api_client')
                .post('/musicfeed/played', {
                    song_id:    songId,
                    feed_id:    feedId,
                    context:    JSON.stringify(context.toJSON()),
                    position:   position
                })
            ;
        }.bind(this));
    }

});