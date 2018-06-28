// Практическая задача 1
/**
 * Функция для парсинга URL строки в объект с распарсенными данными
 * @param {string} url
 * @param {string} testFlag для тестирования функции
 * @returns {HTMLAnchorElement}
 */
function parseUrl(url, testFlag) {
    const newLink = document.createElement('a');
    newLink.setAttribute('href', url);

    switch (testFlag) {
        case 'href': return newLink.href;
        case 'hash': return newLink.hash;
        case 'port': return newLink.port;
        case 'host': return newLink.host;
        case 'protocol': return newLink.protocol;
        case 'hostname': return newLink.hostname;
        case 'pathname': return newLink.pathname;
        case 'origin': return newLink.origin;
        default: return newLink
    }
}

// Тесты для функции парсинга
try {
    test(parseUrl, ['http://tutu.ru:8080/do/any.php?a=1&b[]=a&b[]=b#foo', 'href'], "http://tutu.ru:8080/do/any.php?a=1&b[]=a&b[]=b#foo");
    test(parseUrl, ['http://tutu.ru:8080/do/any.php?a=1&b[]=a&b[]=b#foo', 'hash'], "#foo");
    test(parseUrl, ['http://tutu.ru:8080/do/any.php?a=1&b[]=a&b[]=b#foo', 'port'], "8080");
    test(parseUrl, ['http://tutu.ru:8080/do/any.php?a=1&b[]=a&b[]=b#foo', 'host'], "tutu.ru:8080");
    test(parseUrl, ['http://tutu.ru:8080/do/any.php?a=1&b[]=a&b[]=b#foo', 'protocol'], "http:");
    test(parseUrl, ['http://tutu.ru:8080/do/any.php?a=1&b[]=a&b[]=b#foo', 'hostname'], "tutu.ru");
    test(parseUrl, ['http://tutu.ru:8080/do/any.php?a=1&b[]=a&b[]=b#foo', 'pathname'], "/do/any.php");
    test(parseUrl, ['http://tutu.ru:8080/do/any.php?a=1&b[]=a&b[]=b#foo', 'origin'], "http://tutu.ru:8080");

    console.info("Congratulations! All tests for parseUrl function passed.");
} catch(e) {
    console.error(e);
}