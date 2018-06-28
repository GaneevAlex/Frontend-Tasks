// Алгоритм задача 1
/**
 * @class Pancaketest
 */
class Pancake {
    /**
     * @constructor
     */
    constructor() {
        // Текущее количество пожаренных сторон
        this._friedSides = 0;

        // Общее количество сторон для жарки
        this._pancakeSides = 2;
    }

    get friedSides() {
        return this._friedSides;
    }

    get pancakeSides() {
        return this._pancakeSides;
    }

    /**
     * Жарим одну сторону
     */
    fry () {
        this._friedSides++;
    }

    /**
     * Проверка прожарен ли блин
     * @returns {boolean}
     */
    isFried () {
        return this._friedSides >= this._pancakeSides;
    }

    /**
     * Получает оставшиеся стороны для прожарки
     * @returns {number}
     */
    getRemaineSidesForFry () {
        return this.pancakeSides - this.friedSides;
    }
}

/**
 * Функция готовки
 * @param {number} pancakeForFryCount, по умолчанию 3
 * @param {number} griddles, по умолчанию 2
 * @returns {number} Время готовки
 */
function cooking (pancakeForFryCount = 3, griddles = 2) {
    // Проверка на валидность принятых данных
    if (typeof (pancakeForFryCount) !== 'number' || pancakeForFryCount <= 0) {
        throw "Не правильно задано количество блинов для готовки";

    } else if (typeof (griddles) !== 'number' || griddles <= 0) {
        throw "Не правильно задано количество сковородок для готовки";
    }

    const timeForFryOneSide = 1;
    let griddleUsed = griddles;
    let averageTime = timeForFryOneSide/griddles;
    let cookingTime = 0;

    const currentPancakes = getPancakes(pancakeForFryCount);
    const pancakeSides = currentPancakes[0].pancakeSides;

    /*
        Если количество блинов больше количества сковородок,
        и количество сковородок является степенью от числа сторон блинов для жарки
     */
    if (pancakeForFryCount > griddleUsed && isPowerOfNumber(griddleUsed, pancakeSides)) {
        // Время готовки расчитывается по простой формуле
        cookingTime = (pancakeForFryCount * pancakeSides) / griddleUsed;

        return Math.round(cookingTime);
    }

    // Пока есть блины
    while (currentPancakes.length) {
        const pancakeLeft = currentPancakes.length;

        // Если количество отставшихся блинов меньше чем количество сковородок
        if (pancakeLeft < griddleUsed) {
            // Количество используемых сковородок равно количеству оставшихся блинов
            griddleUsed = pancakeLeft;
            averageTime = timeForFryOneSide/griddleUsed;
        }

        // Если остался только один блин
        if (pancakeLeft === 1) {
            let pancake = currentPancakes.pop();
            const leftSides = pancake.getRemaineSidesForFry();

            // Прибавляем время жарки на все оставшиеся стороны
            for (let i = 0; i < leftSides; i++) {
                pancake.fry();
                cookingTime += timeForFryOneSide;
            }

            // Если блинов больше
        } else {
            // Для каждой сковороды
            for (let griddleIndex = 1; griddleIndex <= griddleUsed; griddleIndex++) {
                // Проверяем есть ли ещё блины
                if (currentPancakes.length) {
                    // Берём последний
                    let pancake = currentPancakes.pop();

                    // Жарим
                    pancake.fry();

                    // Добавляем время жарки блина
                    cookingTime += averageTime;

                    // Если блин не готов, складываем в начало массива
                    if (!pancake.isFried()) {
                        currentPancakes.unshift(pancake);
                    }

                    // Если блины кончились, выходим из цикла
                } else {
                    break;
                }
            }
        }
    }

    return Math.round(cookingTime);
}

/**
 * Получает необходимое количество блинов для жарки
 * @param {number} count
 * @returns {Array}
 */
function getPancakes(count) {
    const pancakes = [];

    for (let pancakeIndex = 0; pancakeIndex < count; pancakeIndex++) {
        pancakes[pancakeIndex] = new Pancake();
    }

    return pancakes;
}

/**
 * Проверяет является ли число степенью другого числа
 * @param {number} number
 * @param {number} pow
 * @returns {boolean}
 */
function isPowerOfNumber(number, pow) {
    const log = Math.log(number) / Math.log(pow);

    return (log ^ 0) == log.toFixed(2);
}

// Тесты для алгоритма
try {
    test(cooking, [3, 2], 3);
    test(cooking, [5, 4], 3);
    test(cooking, [10, 30], 2);
    test(cooking, [5, 1], 10);
    test(cooking, [10, 2], 10);
    test(cooking, [10, 3], 7);

    console.info("Congratulations! All tests for algorithm passed.");
} catch(e) {
    console.error(e);
}