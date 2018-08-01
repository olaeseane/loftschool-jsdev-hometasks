/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let newArray = [];

    for (let i = 0; i < array.length; i++) {
        newArray.push(fn(array[i], i, array))
    }

    return newArray;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    let value, startIndex;

    if (initial !== undefined) {
        startIndex = 0;
        value = initial;
    } else {
        startIndex = 1;
        value = array[0];
    }

    for (let i = startIndex; i < array.length; i++) {
        value = fn(value, array[i], i, array);
    }

    return value;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    let array = [];

    for (let prop in obj) {
        array.push(prop.toUpperCase())
    }

    return array;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from = 0, to = array.length) {
    let newArray = [];

    if (from < 0) {
        from = array.length + from;
    }
    if (to < 0) {
        to = array.length + to;
    }
    if (to >= array.length) {
        to = array.length;
    }
    if (from < 0) {
        from = 0;
    }

    for (let i = from; i < to; i++) {
        newArray.push(array[i]);
    }

    return newArray;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    let proxy;
    
    return proxy = new Proxy(obj, {
        set(target, prop, value) {
            target[prop] = value ** 2;

            return true;
        }
    });
}

/*
let obj = {};

obj = createProxy(obj);
obj.a = 2;
obj.b = 5;
console.log(obj);
*/

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};