/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

// фильтрация cookies при вводе строки в поле "Поиск cookie"
// filterNameInput.addEventListener('keyup', () => filterCookies());
filterNameInput.addEventListener('keyup', () => showCookies());

// обработка нажатий по кнопке "добавить cookie"
addButton.addEventListener('click', () => {
    document.cookie = `${addNameInput.value}=${addValueInput.value}`;
    showCookies(`${addNameInput.value}=${addValueInput.value}`);
    filterCookies();
    // addNameInput.value = '';
    // addValueInput.value = '';
});

// обработка нажатий по кнопке "удалить"
document.body.addEventListener('click', (event) => {
    if (event.target.className === 'delete-button') {
        let cookieName = event.target.parentNode.parentNode.id;

        deleteCookie(cookieName.substring(6));
        let rowCookie = document.getElementById(cookieName);

        if (rowCookie) {
            listTable.removeChild(rowCookie);
        }
    }
});

function showCookies(cookies = document.cookie) {
    if (cookies.length !== 0 || cookies.indexOf('=') !== -1) {
        let objCookies = parseCookies(cookies);

        for (let name in objCookies) {
            let row = document.querySelector(`#cookie${name}`);

            if (isMatching(name, filterNameInput.value) || isMatching(objCookies[name], filterNameInput.value)) {
                let innerHTML =
                    `<td>${name}</td><td>${objCookies[name]}</td><td><button class=delete-button>удалить</button></td>`;

                if (row) {
                    row.innerHTML = innerHTML;
                } else {
                    row = document.createElement('tr');
                    row.id = `cookie${name}`;
                    row.innerHTML = innerHTML;
                    listTable.appendChild(row);
                }
            } else {
                if (row) {
                    listTable.removeChild(row);
                }
            }
        }
    }
}

function filterCookies() {
    let cookieRows = listTable.getElementsByTagName('tr');

    for (let row of cookieRows) {
        if (isMatching(row.id.substring(6), filterNameInput.value)) {
            row.style.display = '';
        } else {
            row.style = 'display: none';
        }

    }
}

function parseCookies(cookies) {
    let arrayOfCookies = cookies.split('; ');

    return arrayOfCookies.reduce((prev, current) => {
        let [cookieName, cookieValue] = current.split('=');

        prev[cookieName] = cookieValue;

        return prev;
    }, {})
}

function deleteCookie(name) {
    let expires = new Date(1);

    document.cookie = `${name}=; expires=${expires.toUTCString()}`
}

function isMatching(full, chunk) {
    let regex = new RegExp(chunk, 'i');

    return regex.test(full);
}

showCookies();