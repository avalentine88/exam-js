"use strict";
document.forms["add-task"].elements.title.addEventListener("input", function () {
    if (!this.validity.valid) {
        this.closest(".block").querySelector(".error").hidden = false;
        this.closest(".block").querySelector(".error").innerHTML = `Значение должно быть от ${this.minLength} до ${this.maxLength} символов`;
        return;
    }
    this.closest(".block").querySelector(".error").hidden = true;
});


document.forms["add-task"].elements.date.addEventListener("input", function () {

    if (this.validity.valueMissing) {
        this.closest(".block").querySelector(".error").innerHTML = "Необходимо ввести значение";
        return;
    }

    let currentDate = Date.parse(this.value);
    let todayDate = new Date();
    if (currentDate < todayDate.getTime()) {
        this.closest(".block").querySelector(".error").innerHTML = "Дата не может быть в прошлом";
        this.closest(".block").querySelector(".error").hidden = false;
    } else {
        this.closest(".block").querySelector(".error").hidden = true;
    }

});


function addTask(event) {
    event.preventDefault();

    let currentDate = Date.parse(this.value);
    let todayDate = new Date();

    if (this.title.value.length === 0 || currentDate < todayDate.getTime()) {
        this.title.closest(".block").querySelector(".error").innerHTML = "Дата не может быть в прошлом";
        this.date.closest(".block").querySelector(".error").innerHTML = `Значение должно быть от ${this.minLength} до ${this.maxLength} символов`;
        return
    }

	let data = [];

	if (localStorage.getItem("tasks") != null) {
		data.push(...JSON.parse(localStorage.getItem("tasks")))
	}

    let taskInfo = {
        title: this.title.value,
        description: this.elements.descrTask.value,
        date: this.elements.date.value
    }

	data.push(taskInfo)

    localStorage.setItem("tasks", JSON.stringify(data));
    document.querySelector(".success").innerHTML = "Задача успешно добавлена"
}

document.forms["add-task"].addEventListener("submit", addTask);

