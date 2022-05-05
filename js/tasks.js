const c = document.querySelector(".task");

document.querySelector(".task").remove();

JSON.parse(localStorage.getItem("tasks")).forEach((item, index) => {
    let card = c.cloneNode(true);
    card.setAttribute('index', index);
    card.querySelector('.task__title').innerHTML = `<span class="data">${item.title}</span>`;
    card.querySelector('.task__text').innerHTML = item.description;
    let d = new Date(item.date);
    card.querySelector('.task__date').innerHTML = `Выполнить к: <span class="data">${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}</span>`;
    document.querySelector(".info").append(card)
})


document.querySelectorAll(".task").forEach(item => {
    item.addEventListener('click', function () {
        this.classList.toggle("choose")
    })
})

document.querySelector('.button').addEventListener('click', e => {
    document.querySelectorAll('.choose').forEach(item => {
        let index = item.getAttribute("index");
        let arr = JSON.parse(localStorage.getItem("tasks"))
        arr.splice(index, 1)
        localStorage.setItem('tasks', JSON.stringify(arr))
        item.remove();
    })
})