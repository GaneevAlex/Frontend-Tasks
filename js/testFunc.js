/**
 * Простая функция тестирования
 * @param {Function} call
 * @param {Array} args
 * @param {number || string} correctAns
 * @param {Object} n Контекст
 */
function test(call, args, correctAns, n) {
        let r = (call.apply(n, args) === correctAns);
        console.assert(r, `Correct answer: ${correctAns}`);
        if (!r) throw "Test failed!";
    }