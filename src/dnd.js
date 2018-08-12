/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
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

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    function randomInt(min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1);

        rand = Math.round(rand);

        return rand;
    }

    let elementDiv = document.createElement('div');

    elementDiv.className = 'draggable-div';
    elementDiv.style.backgroundColor = `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
    elementDiv.style.color = `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
    elementDiv.style.width = `${randomInt(0, window.screen.width / 2)}px`;
    elementDiv.style.height = `${randomInt(0, window.screen.height / 2)}px`;
    elementDiv.style.top =
        `${randomInt(0, document.documentElement.clientHeight - parseInt(elementDiv.style.height))}px`;
    elementDiv.style.left =
        `${randomInt(0, document.documentElement.clientWidth - parseInt(elementDiv.style.width))}px`;
    elementDiv.style.position = 'absolute';
    elementDiv.style.cursor = 'move';

    return elementDiv;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
    target.addEventListener('mousedown', function (event) {
        if (event.which !== 1) {
            return;
        }

        let shiftX = event.pageX - (target.getBoundingClientRect().left + pageXOffset);
        let shiftY = event.pageY - (target.getBoundingClientRect().top + pageYOffset);

        function moveAt(event) {
            target.style.left = event.pageX - shiftX + 'px';
            target.style.top = event.pageY - shiftY + 'px';
        }

        target.style.position = 'absolute';
        document.addEventListener('mousemove', moveAt);
        target.addEventListener('mouseup', function () {
            document.removeEventListener('mousemove', moveAt);
        })
    })
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
