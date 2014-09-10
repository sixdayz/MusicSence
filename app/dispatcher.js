
namespace('App');

// Глобальный объект - диспатчер событий
// Необходимо для обмена событиями между модулями
// приложения

App.Dispatcher = _.clone(Backbone.Events);

// Далее перечислим все доступные
// коды глобальных событий,
// чтобы использовать константы вместо строк
// в модулях приложения

App.Events = {
    authenticate:   'login', // Успешный вход
    authorize:      'authorize', // Успешная авторизация (вход уже был)
    registration:   'registration', // Успешная регистрация
    Suggest: {
        select: 'suggest:select' // Выбран элемент suggest
    }
};