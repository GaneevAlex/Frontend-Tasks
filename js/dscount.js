// Задача 1
/**
 * Функция, подсчитывающая количество идущих подряд символов s1, s2 в строке str, без учёта региста
 * @param {string} str
 * @param {string} s1
 * @param {string} s2
 * @returns {number}
 */
function dscount(str, s1, s2) {
    // Если данные имеют не строковый тип
    if (typeof (str) !== 'string' || typeof (s1) !== 'string' || typeof (s2) !== 'string') {
        throw "Необходимо ввести строковые данные";

        // Если символы для подсчёта имеют длину больше одного
    } else if (s1.length > 1 || s2.length > 1) {
        throw "Некорректный символ для подсчёта";
    }

    // Количество совпадений
    let match = 0;

    // Приводим всё к нижнему регистру
    const string = str.toLowerCase();
    const symSum = (s1 + s2).toLowerCase();

    // Количество символов в строке
    const stringLength = string.length;

    // Для символов в строке, от первого до предпоследнего
    for (let i = 0; i < stringLength - 1; i++) {
        // Если текущий плюс следующий символы строки совпадают с искомыми
        if ((string[i] + string[i + 1]) === symSum) {
            // Инкрементируем количество совпадений
            match++;
        }
    }

    return match;
}

// Тесты для первой задачи
try {
    test(dscount, ['ab___ab__', 'a', 'b'], 2);
    test(dscount, ['___cd____', 'c', 'd'], 1);
    test(dscount, ['de_______', 'd', 'e'], 1);
    test(dscount, ['12_12__12', '1', '2'], 3);
    test(dscount, ['_ba______', 'a', 'b'], 0);
    test(dscount, ['_a__b____', 'a', 'b'], 0);
    test(dscount, ['-ab-аb-ab', 'a', 'b'], 2);
    test(dscount, ['aAa', 'a', 'a'], 2);

    console.info("Congratulations! All tests for task 1 passed.");
} catch(e) {
    console.error(e);
}