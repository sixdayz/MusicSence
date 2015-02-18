
/** @namespace App.Views.Player.Player */
namespace('App.Views.Player.Player');

App.Views.Player.Player.Layout = Backbone.View.extend({

    tagName: 'div',
    template: jst['app/templates/player/player/layout.hbs'],

    events: {
        'click [data-role=play-btn]': '_onPlayBtnClick',
        'click [data-role=skip-btn]': '_onSkipBtnClick'
    },

    initialize: function (options) {
        this.app            = options.app;
        this.soundManager   = this.app.soundManager;
        this.currentSound   = null;
        this.model          = new App.Models.Song();
        this.collection.on('reset', this._onCollectionReset, this);
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));

        this.$slider            = this.$('[data-role=slider]');
        this.$endTimeLabel      = this.$('[data-role=end-time-label]');
        this.$startTimeLabel    = this.$('[data-role=start-time-label]').html('0');
        this.$cover             = this.$('[data-role=cover]').attr('src', this.model.get('lastfm_small_album_image'));
        this.$playBtn           = this.$('[data-role=play-btn]');

        this.$slider.slider({ max : 100, min : 0, tooltip : 'hide' });
        this.$slider.on('slideStop', this._onSliderPositionChange.bind(this));

        this.delegateEvents();

        return this;
    },

    _onSliderPositionChange: function (event) {
        if (this.currentSound) {
            this.currentSound.setPosition(+event.value * 1000);
        }
    },

    _setPlayBtnState: function (state) {
        this.$playBtn
            .removeClass('fa-play')
            .removeClass('fa-pause')
            .addClass('fa-' + state);
    },

    _onPlayBtnClick: function () {
        if (this.currentSound) {
            if (this.currentSound.paused) {
                this.currentSound.resume();
            } else {
                this.currentSound.pause();
            }
        }
    },

    /**
     * Запускает воспроизведение переданного трека
     * @param song
     */
    play: function (song) {

        // Если что-то воспроизводится сейчас
        // остановим это и удалим
        if (this.currentSound) {
            this.currentSound.stop();
            this.currentSound.destruct();
            this.currentSound = null;
        }

        // Изменим содержимое текущей модели плеера
        this.model.clear();
        this.model.set(song.toJSON());

        // Создадим трек
        this.currentSound = this.soundManager.createSound({
            url: '/api/music/stream/' + song.get('sound_track_id'),
            autoPlay: true,
            autoLoad: true,
            onplay: this._onPlay.bind(this),
            onpause: this._onPause.bind(this),
            onresume: this._onResume.bind(this),
            whileplaying: this._onPlaying.bind(this),
            onfinish: this._onFinish.bind(this),
            ondataerror: function () {
                alert('Internet connection error :(');
            }
        });

        // Удалим трек из коллекции
        this.collection.remove(song);
    },

    _onSkipBtnClick: function () {
        if (this.collection.length > 0) {
            this.play(this.collection.at(0));
        }
    },

    _onPlaying: function () {

        // Изменим положение слайдера
        // без генерации события

        this.$slider.slider('setValue', Math.floor(+this.currentSound.position / 1000), false);

        // Установим текущее положение в минутах
        // для проигрываемого трека

        var trackPosition   = Math.floor(this.currentSound.position / 1000);
        var trackMinute     = Math.floor(trackPosition / 60);
        var trackSecond     = trackPosition - (trackMinute * 60);
        this.$startTimeLabel.html(_.string.sprintf('%s:%s', trackMinute, _.string.lpad(trackSecond, 2, '0')));
    },

    _onPlay: function () {

        // Перерисуем шаблон
        this.render();

        // Покажем длительность трека
        var trackDuration   = +this.model.get('duration');
        var trackMinutes    = Math.floor(trackDuration / 60);
        var trackSeconds    = trackDuration - (trackMinutes * 60);
        this.$endTimeLabel.html(_.string.sprintf('%s:%s', trackMinutes, _.string.lpad(trackSeconds, 2, '0')));

        // Изменим размер слайдера
        this.$slider.slider('setAttribute', 'max', trackDuration);
        this.$slider.slider('setValue', 0);

        // Изменим состояние кнопки
        this._setPlayBtnState('pause');
    },

    _onPause: function () {
        this._setPlayBtnState('play');
    },

    _onResume: function () {
        this._setPlayBtnState('pause');
    },

    _onFinish: function () {

        // Выгрузим трек
        this.currentSound.destruct();
        this.currentSound = null;

        // Проиграем следующий трек из плейлиста
        if (this.collection.length > 0) {
            this.play(this.collection.at(0));
        }
    },

    /**
     * Обрабатывает ситуацию, когда список воспроизведения
     * изменился. Учитывается при этом приигрывается ли какой-то
     * трек сейчас или нет
     * @private
     */
    _onCollectionReset: function () {
        if ( ! _.isNull(this.currentSound) && this.currentSound.playState === 1) {

            // Сейчас играется трек, значит просто ничего
            // не будем делать

        } else {
            // Сейчас ничего не играется, значит нужно запустить первый трек из списка
            if (this.collection.length === 0) {

                // Если список пуст, нужно очистить плеер
                this.model.clear();
                this.render();

            } else {
                this.play(this.collection.at(0));
            }
        }
    }
});