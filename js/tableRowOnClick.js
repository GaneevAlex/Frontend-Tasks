/**
 * Навешивает обработчик клика на строки
 * @param table
 * @param dataFromServer
 */
function tableRowOnClick(table, dataFromServer) {
    const tbodyShowed = table.getElementsByClassName('showedRows')[0];
    const rowsShowed = [].slice.call(tbodyShowed.rows);

    const additionalInformation = document.getElementById('additionalInformation');

    // Для каждой строки
    rowsShowed.forEach((row) => {
        row.onclick = function () {
            // Получаем данные строки
            const userData = dataFromServer.find((user) => isUserData(user, this));

            // Заполняем шаблон полученными данными и показываем снизу таблицы
            additionalInformation.innerHTML = fillTemplateAdditionalInformation(userData);
            additionalInformation.setAttribute('style', 'display: block');
        }
    })
}

/**
 * Проверяет принадлежность данных строке
 * @param user
 * @param row
 * @returns {boolean}
 */
function isUserData(user, row) {
    if (user.id == row.cells[0].textContent && user.phone == row.cells[4].textContent && user.firstName == row.cells[1].textContent) {
        return true;
    }
}

/**
 * Заполняет шаблон дополнительной информации
 * @param userData
 * @returns {string}
 */
function fillTemplateAdditionalInformation(userData) {
    return `<div class="fullName">
            <b>Выбран пользователь:</b> ${userData.firstName} ${userData.lastName}
            </div>
            <div class="description">
                <b>Описание:</b> ${userData.description}
            </div>
            <div class="address">
                <b>Адрес проживания:</b> ${userData.adress.streetAddress}
            </div>
            <div class="city">
                <b>Город:</b> ${userData.adress.city}
            </div>
            <div class="state">
                <b>Провинция/штат:</b> ${userData.adress.state}
            </div>
            <div class="index">
                <b>Индекс:</b> ${userData.adress.zip}
            </div>`
}