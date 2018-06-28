/**
 * Сортирует данные по активному столбцу
 * @param table
 */
function tableSorting(table) {
    const th = table.getElementsByTagName('th');
    const thCount = th.length;
    let lastClickElement = null;

    for (let thIndex = 0; thIndex < thCount; thIndex++) {
        th[thIndex].onclick = function() {

            // Если элемент заблокирован, то ничего не делаем
            if (isBlock(this)) {
                return;
            }

            // Блокируем, во избежании бесконечных нажатий
            block(this, 500);

            // Проверяем была ли уже сортировка по возрастанию
            const isAscending = this.classList.contains('ascending');
            const typeSorting = this.getAttribute('data-type');
            let sortFunction = null;

            // Для числовых данных
            if (typeSorting === 'Number') {
                sortFunction = isAscending ? descendingNumber : ascendingNumber;

                // Для строчных
            } else {
                sortFunction = isAscending ? descending : ascending;
            }


            // Добавляем/убираем флаг о сортировке по возрастанию
            if (isAscending) {
                this.classList.remove('ascending');

            } else {
                this.classList.add('ascending');
            }


            if (lastClickElement !== this) {
                this.classList.add('active');
                lastClickElement ? lastClickElement.classList.remove('active') : null;
            }

            const tbodyShowed = table.getElementsByClassName('showedRows')[0];

            const showedRows = [].slice.call(tbodyShowed.rows);

            const cellIndex = this.cellIndex;

            const sortData = sorting(showedRows, cellIndex, sortFunction);

            updateTableData(sortData, tbodyShowed);

            lastClickElement = this;
        }
    }
}

/**
 * Обновляет отображаемые данные
 * @param data
 * @param body
 * @returns {*}
 */
function updateTableData(data, body) {
    const dataCount = data.length;

    for (let i = 0; i < dataCount; i++) {
        body.appendChild(data[i]);
    }

    return body;
}

/**
 * @param rows
 * @param colNum
 * @param callback
 * @returns {*}
 */
function sorting(rows, colNum, callback) {
    rows.sort((a, b) => {
        return callback(a.cells[colNum].innerHTML, b.cells[colNum].innerHTML);
    });

    return rows;
}

/**
 * Функция для сортировки строк по возрастанию
 * @param a
 * @param b
 * @returns {number}
 */
function ascending(a, b) {
    const aLowCase = a.toLowerCase();
    const bLowCase = b.toLowerCase();

    if (aLowCase > bLowCase) {
        return 1;

    } else if (aLowCase < bLowCase) {
        return -1;

    } else return 0;
}

/**
 * Функция для сортировки строк по убыванию
 * @param a
 * @param b
 * @returns {number}
 */
function descending(a, b) {
    const aLowCase = a.toLowerCase();
    const bLowCase = b.toLowerCase();

    if (aLowCase < bLowCase) {
        return 1;

    } else if (aLowCase > bLowCase) {
        return -1;

    } else return 0;
}

/**
 * Функция сортировки чисел по возрастанию
 * @param a
 * @param b
 * @returns {number}
 */
function ascendingNumber(a, b) {
    return a - b;
}

/**
 * Функция сортировки чисел по убыванию
 * @param a
 * @param b
 * @returns {number}
 */
function descendingNumber(a, b) {
    return b - a;
}