/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
    let urlTowns = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();

        xhr.open('GET', urlTowns, true);
        xhr.responseType = 'json';
        xhr.send();
        xhr.addEventListener('load', () => {
            if (xhr.status >= 400) {
                reject(xhr.statusText);
            } else {
                let towns = xhr.response.slice();

                towns.sort((town1, town2) => {
                    return town1.name.localeCompare(town2.name);
                });
                resolve(towns);
            }
        })
    });
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    let regex = new RegExp(chunk, 'i');

    return regex.test(full);
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

/* Кнопка и обработчик для действия повторить загрузку городов при ошибке */
const btnLoadTowns = document.createElement('button');

btnLoadTowns.innerText = 'Повторить';
btnLoadTowns.addEventListener('click', () => doLoadTowns());

/* служебный объект для быстрого поиска (ключ = название города) */
let objTowns = {};

function doLoadTowns() {
    loadTowns()
        .then((towns) => {
            for (let i = 0; i < towns.length; i++) {
                objTowns[towns[i].name] = false;
            }
            filterBlock.style.display = 'inline';
            loadingBlock.style.display = 'none';
        })
        .catch(() => {
            filterBlock.style.display = 'none';
            loadingBlock.style.display = 'inline';
            loadingBlock.innerHTML = 'Не удалось загрузить города&nbsp;&nbsp;&nbsp;';
            loadingBlock.style.color = 'red';
            loadingBlock.appendChild(btnLoadTowns);
        });

}

filterInput.addEventListener('keyup', function () {
    filterResult.innerHTML = '';
    if (filterInput.value !== '') {
        for (let town in objTowns) {
            if (isMatching(town, filterInput.value)) {
                objTowns[town] = true;
            } else {
                objTowns[town] = false;
            }
        }
        for (let town in objTowns) {
            if (objTowns[town]) {
                filterResult.innerHTML = `${filterResult.innerHTML}<li style="list-style: none">${town}</li>`;
            }
        }
    }
});

doLoadTowns();

export {
    loadTowns,
    isMatching
};
