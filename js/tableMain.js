/**
 * Получает ссылку на данные
 * @returns {string|string}
 */
function getUrlData() {
    let url = '';

    if (confirm('Хотите загрузить большой объем данных?')) {
        url = 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastNa\n' +
            'me={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&descripti\n' +
            'on={lorem|32}';

    } else {
        url = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastNam\n' +
            'e}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|3\n' +
            '2}';
    }

    return url;
}

/**
 * Получает данные по ссылке
 * @param url
 * @param loadingScreen
 * @returns {any}
 */
function getDataFromServer(url, loadingScreen) {
    // Создаём новый объект XMLHttpRequest
    const xhr = new XMLHttpRequest();

    // Конфигурируем его: GET-запрос на URL
    xhr.open('GET', url, false);

    xhr.onload = function () {
      console.log(this);
    };

    // Отсылаем запрос
    xhr.send();

    // Если код ответа сервера не 200, то это ошибка
    if (xhr.status != 200) {
        // Обрабатываем ошибку ошибку
        loadingScreen.innerText = xhr.status + ': ' + xhr.statusText;

    } else {
        loadingScreen.setAttribute('style', 'display: none');
        // Возвращаем полученный результат в формате JSON
        return JSON.parse(xhr.responseText);
    }
}

/**
 * Блокирует элемент на указанное время (1 секунда по умолчанию)
 * @param element
 * @param time
 */
function block(element, time = 1000) {
    element.classList.add('disable');
    setTimeout(() => element.classList.remove('disable'), time);
}

/**
 * Проверяет заблочен ли элемент
 * @param element
 * @returns {boolean}
 */
function isBlock(element) {
    return element.classList.contains('disable');
}

window.onload = () => {
    const table = document.getElementById('tableData');
    const url = getUrlData();
    const loadingScreen = document.getElementById('loadingScreen');

    // Экран загрузки данных
    loadingScreen.setAttribute('style', 'display: block');

    setTimeout(() => {
        const dataFromServer = getDataFromServer(url, loadingScreen);
        createTableData(table, dataFromServer);
        pageBuilder(table, dataFromServer);
        tableSorting(table);
        tableSearch(table, dataFromServer);
    }, 1000);
};