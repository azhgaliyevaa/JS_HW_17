// Для выполнения заданий можно использовать сервис тестовых API https://jsonplaceholder.typicode.com/
// 1. При загрузке страницы создавать задачу методом POST. Title - ваше имя.
// Возвращаемое после запроса JSON содержимое записать в тег div.

let xmlHttp = new XMLHttpRequest();
xmlHttp.onload = function(){
    const div = document.createElement("div");
    div.innerText = xmlHttp.responseText;
    document.body.appendChild(div);
};

xmlHttp.open("POST", "http://apichallenges.herokuapp.com/todos");
xmlHttp.setRequestHeader("Content-Type", "application/json");
xmlHttp.setRequestHeader("Accept", "application/json");
xmlHttp.send('{"title": "Ayazhan"}');



// 2. Добавить кнопку "Обновить", при нажатии на которую отправляется запрос PUT на урл "https://todoappexamplejs.herokuapp.com/items/${id}, который пришел в ответе на POST запрос}".
// Тело запроса - JSON, в котором title - текущее время.
// После обновления текст кнопки нужно проставить в "Обновлено".

const refreshBtn = document.getElementById("button-refresh");
const currentTime = new Date().toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true });     /*.slice(0, -3);*/

refreshBtn.addEventListener("click", (event) => {
    const objTask = JSON.parse(xmlHttp.response);

    xmlHttp.open("PUT", `http://apichallenges.herokuapp.com/todos/${objTask.id}`);
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.setRequestHeader("Accept", "application/json");
    xmlHttp.send(`{"title": "Updated at ${currentTime}"}`);

    event.target.innerText = "Обновлено";
    const updated = document.createElement("p");
    updated.innerText = xmlHttp.responseText;
    document.body.appendChild(updated);
});


// // 3. Добавить кнопку "Удалить", при нажатии на которую отправляется запрос DELETE на урл из предыдущей подзадачи, но уже без тела запроса.
// // После удаления текст кнопки нужно проставить в "Удалено"

const deleteBtn = document.getElementById("button-delete");

deleteBtn.addEventListener("click", (event) => {
    const objTask = JSON.parse(xmlHttp.response);

    xmlHttp.open("DELETE", `http://apichallenges.herokuapp.com/todos/${objTask.id}`);
    xmlHttp.send();

    event.target.innerText = "Deleted";
    const paragr = document.createElement("p");
    paragr.innerText = `${objTask.id} has been deleted`;
    document.body.appendChild(paragr);
    setTimeout(() => {location.reload()}, 5000);

});

