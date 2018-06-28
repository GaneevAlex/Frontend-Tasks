/**
 * Создает строки из принимаемых данных
 * @param table
 * @param dataFromServer
 */
function createTableData (table, dataFromServer) {
    const tbodyAllRows = table.getElementsByClassName('allRows')[0];

    // Очищаем таблицу, на случай если в ней были какие-то данные
    table.removeChild(tbodyAllRows);
    tbodyAllRows.innerHTML = '';

    // Создаем строки
    dataFromServer.forEach((user) => {
        const newRow = document.createElement('tr');

        newRow.innerHTML = `
                <td>${user.id}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
        `;

        tbodyAllRows.appendChild(newRow);
    });

    table.appendChild(tbodyAllRows);
}

/**
 * Собирает страницу
 * @param table
 * @param dataFromServer
 */
function pageBuilder(table, dataFromServer) {
    const tbodyAllRows = table.getElementsByClassName('allRows')[0];
    const allRows = [].slice.call(tbodyAllRows.rows);

    // Обновляем номера страниц для каждой строки
    updatePageNumbers(allRows);

    // Создаем нумерацию страниц
    tablePagination(table, dataFromServer);

    // Навешиваем события кликов на видимые строки
    tableRowOnClick(table, dataFromServer);
}

/**
 * Обновляет постраничную нумерацию строк
 * @param allRows
 */
function updatePageNumbers(allRows) {
    const maxRowsOnPage = 50;
    let pageNumber = 1;
    let showRowCount = 0;
    const rowsCount = allRows.length;

    // Для всех строк
    allRows.forEach((row, i) => {
        // Если строка не скрыта
        if (!row.classList.contains('hide')) {
            // Устанавливаем ей номер страницы на которой она отображается
            row.setAttribute('page-number', pageNumber);
            showRowCount++;

            // Если строка скрыта
        } else {
            // Обнуляем ей страницу
            row.setAttribute('page-number', 0);
        }

        // При достижении макксимально возможного количества отображаемых строк на странице
        if (showRowCount >= maxRowsOnPage && i < rowsCount - 1) {
            pageNumber++;
            showRowCount = 0;
        }
    });

    // Обновляем нумерацию
    updateUserPagination(pageNumber);
}