/**
 * Globale Variable the url from database
 */
const BASE_URL ="https://join-c39f7-default-rtdb.europe-west1.firebasedatabase.app/tasks";

/**
 * Init function for summary
 */
function initSummary() {
    loadingNumbers();
    generateGreets();
    includeHTML();
    checkLink();
    generateInitials();
}


/**
 * generate the greets
 */
function generateGreets() {
    let greetingTime = getGreeting();
    let userName = sessionStorage.getItem("username");
    if (userName == null) {
        window.location.href = "../login/login.html"
    }else {
    let content = document.getElementById("greeting");
    content.innerHTML =
        userName === "Guest"
            ? `<p>Good ${greetingTime}!</p>`
            : `<p>Good ${greetingTime},</p>
        <p class="name-summary">${userName}</p>`;
    }
}


/**
 * return the timevalue
 * @returns {string}
 */
function getGreeting() {
    let now = new Date();
    let hours = now.getHours();
    if (hours >= 5 && hours < 12) return "morning";
    if (hours >= 12 && hours < 18) return "afternoon";
    if (hours >= 18 && hours < 24) return "evening";
    return "night";
}

/**
 * check login status
 * @param {*} sessionUser 
 * @returns 
 */
function checkPager(sessionUser) {
    if (!sessionUser) {
        window.location.href = "../login/login.html";
        return;
    }
}


/**
 * go to board
 */
function goToBoard() {
    window.location.href = "../board/board.html";
}


/**
 * loading the numbers for der summary page of the database
 */
async function loadingNumbers() {
    try {
        let response = await fetch(BASE_URL + ".json");
        let tasks = await response.json();
        if (tasks == null) tasks = {};
        let groupedTasks = {todo: 0, progress: 0, awaiting: 0, done: 0};
        Object.values(tasks).forEach(task => {
            if (task.type) {
                groupedTasks[task.type] = (groupedTasks[task.type] || 0) + 1;
            }
        });
        await writeNumber(groupedTasks)
        loadUrgentTasks(tasks);
    } catch (error) {
        console.error("Error loading numbers:", error);
    }
}


/**
 * write the numbers in summary
 * @param {*} groupedTasks 
 */
function writeNumber(groupedTasks) {
    document.getElementById("toDoNum").innerText = groupedTasks.todo || 0;
        document.getElementById("progressNum").innerText = groupedTasks.progress || 0;
        document.getElementById("awaitNum").innerText = groupedTasks.awaiting || 0;
        document.getElementById("doneNum").innerText = groupedTasks.done || 0;
        const totalTasks = Object.values(groupedTasks).reduce((a, b) => a + b, 0);
        document.getElementById("allTasks").innerText = totalTasks;
}


/**
 * loading the urgent number and date
 * @param {json} tasks 
 */
async function loadUrgentTasks(tasks) {   
    let urgentNum = document.getElementById("urgentNum");
    let urgentDate = document.getElementById("urgentDate");
    let urgentTasks = [];
    await sortUrgentTask(tasks, urgentNum, urgentTasks);
    if (urgentTasks.length === 0) {
        urgentDate.innerText = "";
    } else {
        urgentDate.innerText = urgentTasks[0].date;
    }
}


/**
 * sort the urgent Task
 * @param {*} tasks 
 * @param {*} urgentNum 
 * @param {*} urgentTasks 
 */
function sortUrgentTask(tasks, urgentNum, urgentTasks) {
    for (const key in tasks) {
        if (key !== "done" && tasks) {
            if (tasks[key].prio === "Urgent") {
                urgentTasks.push(tasks[key]);
            }
        }
    }
    urgentTasks.sort((a, b) => {
        const dateA = new Date(a.date.split("/").reverse().join("-"));
        const dateB = new Date(b.date.split("/").reverse().join("-"));
        return dateA - dateB;
    });
    urgentNum.innerText = urgentTasks.length;
}