// Задача 2
/**
 * Функция, проверяющая на синтаксическую верность последовательности скобок (сбалансированность и вложенности)
 * @param {string} string
 * @param {string} forTestBrackets набор скобок для проверки, по умолчанию '{(<['
 * @returns {number} 1 - если последовательность скобок не верна, 0 - если всё верно
 */
function checkSyntax (string, forTestBrackets = '{(<[') {
    // Весь набор скобок, которые может проверить функция
    const allBrackets = {
        '{' : '}',
        '(' : ')',
        '<' : '>',
        '[' : ']',
    };

    // Набор скобок для проверки
    let bracketMatchings = {};

    // Закрывающие скобки, соответствующие набору
    let BracketClosing = '';

    const forTestBracketsLength = forTestBrackets.length;

    // Собираем набор скобок для проверки, исходя из forTestBrackets (принимаемый набор)
    for (let bracketIndex = 0; bracketIndex < forTestBracketsLength; bracketIndex++ ) {

        // Текущая скобка из принимаемого набора
        const currentBracket = forTestBrackets[bracketIndex];

        // Если в наборе скобок, которые может проверить функция, есть текущая скобка из принимаемого набора
        if (allBrackets[currentBracket]) {
            // Добавляем соответствующую закрывающую скобку в BracketClosing, и пополняем набор скобок для проверки
            BracketClosing += bracketMatchings[currentBracket] = allBrackets[currentBracket];

            // Если в наборе скобок, которые может проверить функция, нет скобки из принимаемого набора
        } else {
            throw 'Введён некорректный набор скобок';
        }
    }

    const openBracketStack = [];
    const stringLength = string.length;

    // Для каждого символа принимаемой строки
    for (let charIndex = 0; charIndex < stringLength; charIndex++) {
        const charCurrent = string[charIndex];

        // Если текущий символ соответствуем открытой скобке
        if (bracketMatchings[charCurrent]) {
            // Добавляем в стэк
            openBracketStack.push(charCurrent);

            // Если текущий символ соответствует закрытой скобке
        } else if (BracketClosing.indexOf(charCurrent) >= 0) {
            // Если в стэке есть открытые скобки
            if (openBracketStack.length > 0) {
                // Если последняя открытая скобка в стэке не соответствует текущей закрытой
                if (bracketMatchings[openBracketStack.pop()] !== charCurrent) {
                    return 1;
                }

            // Если в стэке нет открытых скобок
            } else {
                return 1;
            }
        }
    }

    // Если в стэке ещё остались открытые скобки, то 1, в обратном случае 0
    return openBracketStack.length === 0 ? 0 : 1;
}

// Тесты для второй задачи
try {
    // Для набора скобок <,[,{,( - задан по умолчанию
    test(checkSyntax, ["---(++++)----"], 0);
    test(checkSyntax, [""], 0);
    test(checkSyntax, ["before ( middle []) after"], 0);
    test(checkSyntax, [") ("], 1);
    test(checkSyntax, ["} {"], 1);
    test(checkSyntax, ["<( >)"], 1);
    test(checkSyntax, ["( [ <> () ] <> )"], 0);
    test(checkSyntax, ["( [)"], 1);

    // Для набора скобок <,[,{
    test(checkSyntax, [") (", '<[{'], 0);
    test(checkSyntax, ["<( >)", '<[{'], 0);

    console.info("Congratulations! All tests for task 2 passed.");
} catch(e) {
    console.error(e);
}