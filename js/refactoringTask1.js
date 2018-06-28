// Рефакторинг задача 1
/**
 * Получает максимальный из индексов переданных символов в строке, исключая нулевой символ
 * @param {string} string
 * @param {string} firstChar
 * @param {string} secondChar
 * @returns {number} index || -1
 */
function getMaxIndexOfOneOfChar(string, firstChar, secondChar) {
    // Отсеиваем все строки с количеством символов меньше 2
    if (string.match(/^.?$/)) {
        return -1;
    }

    // Индекс последнего символа в строке
    var index = string.length - 1;

    // Пока не дошли до нулевого символа
    while (index > 0) {
        // Получаем текущий символ строки по индексу
        var currentChar = string[index];

        // Если совпадает с одним из принятых
        if (currentChar == firstChar || currentChar == secondChar) {
            // Возвращаем его индекс
            return index;
        }

        index--;
    }

    return -1;
}