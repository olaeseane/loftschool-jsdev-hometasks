/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
    return new Promise(function (resolve) {
        setTimeout(() => {
            resolve();
        }, seconds * 1000)
    })
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns() {
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

    // second option to get array of town objects by fetch()
    //         return fetch(urlCities)
    //             .then((promiseResponse) => promiseResponse.text())
}

export {
    delayPromise,
    loadAndSortTowns
};
