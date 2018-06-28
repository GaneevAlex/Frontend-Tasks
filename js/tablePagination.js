/**
 * Инициализирует навигационную нумерацию
 * @param table
 * @param dataFromServer
 */
function tablePagination(table, dataFromServer) {
    const paginationElement = document.getElementById('pagination');
    const pages = paginationElement.getElementsByTagName('li');
    const pagesCount = pages.length;

    // Показываем первую страницу
    showRows(table, 1);

    // Навешиваем на каждый номер обработчик
    for (let i = 0; i < pagesCount; i++) {
        pages[i].onclick = function () {
            const page = this.textContent;

            showRows(table, page);

            // Обновляем клики по строкам
            tableRowOnClick(table, dataFromServer);
        }
    }
}

/**
 * Показывает строки таблицы, в зависимости от страницы
 * @param table
 * @param pageNumber
 */
function showRows(table, pageNumber) {
    const tbodyShowed = table.getElementsByClassName('showedRows')[0];
    tbodyShowed.innerHTML = '';

    const tbodyAllRows = table.getElementsByClassName('allRows')[0];
    const allRows = [].slice.call(tbodyAllRows.rows);

    allRows.forEach((row) => {
        if (row.getAttribute('page-number') == pageNumber) {
            tbodyShowed.appendChild(row.cloneNode(true));
        }
    });
}

/**
 * Обновляем нумерацию страниц навигации
 * @param pageCount
 */
function updateUserPagination(pageCount) {
    let pagePanel = '<ul>';

    for (let i = 1; i <= pageCount; i++) {
        pagePanel += `<li>${i}</li>`;
    }

    pagePanel += '</ul>';

    const paginationElement = document.getElementById('pagination');
    paginationElement.innerHTML = pagePanel;
}