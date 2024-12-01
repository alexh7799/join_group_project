const BASE_URL =
    "https://join-c39f7-default-rtdb.europe-west1.firebasedatabase.app/";

function initSummary() {
    sessionStorage.setItem("userName", "Alex");
    loadingNumbers();
    generateGreets();
}

function generateGreets() {
    let greetingTime = getGreeting();
    let userName = sessionStorage.getItem("userName");
    let content = document.getElementById("greeting");
    content.innerHTML =
        userName === "Guest"
            ? `<p>Good ${greetingTime}!</p>`
            : `<p>Good ${greetingTime},</p>
        <p class="name-summary">${userName}</p>`;
}

function getGreeting() {
    let now = new Date();
    let hours = now.getHours();
    if (hours >= 5 && hours < 12) return "morning";
    if (hours >= 12 && hours < 18) return "afternoon";
    if (hours >= 18 && hours < 24) return "evening";
    return "night";
}

function goToBoard() {
    window.location.href = "board.html";
}

async function loadingNumbers() {
    let response = await fetch(BASE_URL + ".json");
    let tasks = await response.json();
    let toDoNum = document.getElementById("toDoNum");
    toDoNum.innerText = tasks.toDos.length;
    let doneNum = document.getElementById("doneNum");
    doneNum.innerText = tasks.done.length;
    let allTasks = document.getElementById("allTasks");
    allTasks.innerText =
        tasks.toDos.length +
        tasks.done.length +
        tasks.progress.length +
        tasks.awaiting.length;
    let progressNum = document.getElementById("progressNum");
    progressNum.innerText = tasks.progress.length;
    let awaitNum = document.getElementById("awaitNum");
    awaitNum.innerText = tasks.awaiting.length;
    loadUrgentTasks(tasks);
}

function loadUrgentTasks(tasks) {
    let urgentNum = document.getElementById("urgentNum");
    let urgentDate = document.getElementById("urgentDate");
    const urgentTasks = [];
    for (const key in tasks) {
        if (key !== "done" && Array.isArray(tasks[key]) && tasks) {
            tasks[key].forEach((task) => {
                if (task.prio === "urgent") {
                    urgentTasks.push(task);
                }
            });
        }
    }
    urgentTasks.sort((a, b) => {
        const dateA = new Date(a.date.split("/").reverse().join("-"));
        const dateB = new Date(b.date.split("/").reverse().join("-"));
        return dateA - dateB;
    });
    urgentNum.innerText = urgentTasks.length;
    if (urgentTasks.length === 0) {
        urgentDate.innerText = "";
    } else {
        urgentDate.innerText = urgentTasks[0].date;
    }
}
