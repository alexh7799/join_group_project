const BASE_URL = "https://join-c39f7-default-rtdb.europe-west1.firebasedatabase.app/";

let activePicker = false;

let newTask = {
    "cat": "",
    "user": [],
    "type": "todo",
    "descr": "",
    "date": "",
    "prio": "Medium",
    "subtasks": [],
    "title": ""
};

let usersArray = [];

let categoryValue = "";

let taskType = sessionStorage.getItem('taskType');

/**
 * the init function for the add task page
 */
function initAddTask() {
    checkLogin();
    includeHTML();
    checkLink();
    generateInitials();
    addTaskTemplate();
    getAssignedUsers();
}