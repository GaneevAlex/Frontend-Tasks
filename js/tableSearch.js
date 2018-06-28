/**
 * Функция поиска по таблице
 * @param table
 * @param dataFromServer
 */
function tableSearch(table, dataFromServer) {
    const button = document.querySelector('.__searchButton');
    const searchInput = document.querySelector('.search');

    button.onclick = function() {
        // Если кнопка заблокирована, ничего не делаем
        if (isBlock(button)) {
            return;
        }

        const searchText = searchInput.value;

        // Если пустая поисковая строка
        if(!searchText) {
            // Возвращаем отображение всем строкам
            const hidedElements = table.querySelectorAll('.hide');
            showAllHidedElements(hidedElements);
            pageBuilder(table, dataFromServer);

            return;
        }

        // Блокируем кнопку на 1 секунду
        block(button);

        const tbodyAllRows = table.getElementsByClassName('allRows')[0];

        const allRows = [].slice.call(tbodyAllRows.rows);

        const regex = new RegExp(searchText, 'i');

        // Для каждой строки
        allRows.forEach((row) => {
            // Если строка не содержит искомую подстроку
            if (row.textContent.search(regex) === -1) {
                // Скрываем её
                hideElement(row);

                // Если содержит, показываем
            } else {
                showElement(row);
            }
        });

        pageBuilder(table, dataFromServer);
    }
}

/**
 * Скрывает элемент
 * @param element
 */
function hideElement(element) {
    element.classList.add('hide');
}

/**
 * Показывает элемент
 * @param element
 */
function showElement(element) {
    element.classList.remove('hide');
}

/**
 * Показывает все переданные элементы
 * @param elements
 */
function showAllHidedElements(elements) {
    elements.forEach((element) => showElement(element));
}