/**
 * Функция для объявления и создания пространства имен
 * @param namespace
 */
var namespace = function(namespace) {

    namespace = namespace.trim();
    if (0 === namespace.length) {
        // Если передали пустое пространство - ничего не делаем
        return;
    }

    var parts   = namespace.split('.');
    var part    = (window[parts[0]] = window[parts[0]] || {});

    if (parts.length > 1) {
        for (var i = 1, length = parts.length; i < length; i++) {
            part = (part[parts[i]] = part[parts[i]] || {});
        }
    }
};