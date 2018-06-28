// Рефакторинг задача 2
/**
 * Рисует звёзды рейтинга, исходя из полученного значения
 * @param {number} vote [0, voteMax]
 * @returns {string}
 */
function drawRating(vote) {
    const voteMax = 100;

    // Если полученное значение выходит за пределы диапазона, или передано не число
    if (vote < 0 || vote > voteMax || typeof(vote)!== 'number') {
        throw `Передано не верное значение, для правильной работы необходимо число от 0 до ${voteMax}`;
    }

    const ratingStars = ['★☆☆☆☆', '★★☆☆☆', '★★★☆☆', '★★★★☆', '★★★★★'];
    const increaseRatingInterval = voteMax / ratingStars.length;

    // Возвращаем элемент массива с индексом, попадающим в диапазон с заданным интервалом
    return ratingStars[((vote - 1)/increaseRatingInterval) ^ 0];
}

// Проверка работы результата
console.log(drawRating(0) ); // ★☆☆☆☆
console.log(drawRating(1) ); // ★☆☆☆☆
console.log(drawRating(50)); // ★★★☆☆
console.log(drawRating(99)); // ★★★★★