const BASE_URL = "https://join-c39f7-default-rtdb.europe-west1.firebasedatabase.app/";

let activePicker = false;

let newTask = {
    "cat": "",
    "user": [],
    "type": "done",
    "descr": "",
    "date": "",
    "prio": "medium",
    "subtasks": [
        {
            "completed": false,
            "title": "Hdhfhfhh"
        }
    ],
    "title": ""
};
let usersArray = [];

function initAddTask() {
    checkLogin();
    includeHTML();
    checkLink();
    addTaskTemplate();
    getAssignedUsers();
    //createTask();
    //addSubtask();
}


function toggleDropdown() {
    let dropdownOptions = document.getElementById("dropdown-options");
    let dropdownArrow = document.getElementById("dropdown-arrow");
    dropdownOptions.classList.toggle("show");
    if (dropdownOptions.classList.contains("show")) {
        dropdownArrow.innerHTML = `<img src="../assets/icons/arrow-up-dropdown.svg">`;
    } else {
        dropdownArrow.innerHTML = `<img src="../assets/icons/arrow-dropdown.svg">`;
    }
}

function addTaskTemplate() {
    const container = document.getElementById('addtask-tem');
    const template = getaddtaks(); 
    container.innerHTML = template; 
}

function newLoadingAvatar() {
    let avatarContainer = document.getElementById("avatar-container");
    avatarContainer.innerHTML = "";
    for (let i = 0; i < newTask.user.length; i++) {
        let avatar = document.createElement("span");
        avatar.className = "avatar color";
        avatar.textContent = newTask.user[i];
    }
}

function showPicker(date) {
    const dateInput = document.getElementById('due-date');

    if(activePicker == false) {
        dateInput.showPicker();
        activePicker = true;
    } else {
        activePicker = false;
    }

}

async function getAssignedUsers() {
    try {
        const response = await fetch(BASE_URL + "users/.json");
        let user = await response.json();
        usersArray = Object.entries(user).map(([key, user]) => ({
            ...user,
        }));
        await addAssignedToTemplate(usersArray)
    } catch (error) {
        console.error('Fehler:', error);
    }
}

function addAssignedToTemplate(usersArray) {
    let dropdownOptions = document.getElementById("dropdown-options");
    dropdownOptions.innerHTML = "";
    for (let i = 0; i < usersArray.length; i++) {
        dropdownOptions.innerHTML += renderAssignedUser(usersArray[i]);    
    }
}

function toggleAvatar(avatarId, checkbox) {
    let user = usersArray.filter(u => u.id == avatarId);
    if (checkbox.checked) {
        newTask.user.push({
            bgcolor: user[0].color,
            name: user[0].name
        });
    } else {
        newTask.user = newTask.user.filter(u => u.name !== user[0].name);
    }
    renderAvatar();
}

// function addCheckboxListeners() {
//     const checkboxes = document.getElementsByName("assigned_to");
//     for (let i = 0; i < checkboxes.length; i++) {
//         checkboxes[i].onchange = function () {
//             toggleAvatar(this);
//         };
//     }
// }


async function createTask() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("due-date").value;
    const category = document.getElementById("category").value;
    const assignedTo = Array.from(document.querySelectorAll("input[name='assigned_to']:checked"))
        .map(checkbox => checkbox.value);
    const priority = getSelectedPriority();
    const subtasks = Array.from(document.querySelectorAll(".subtasks .input-text"))
        .map(input => input.value)
        .filter(subtask => subtask.trim() !== "");

    if (!title || !category) {
        //alert("Bitte füllen Sie alle erforderlichen Felder aus.");
        return;
    }

    const task = {};

    await postData("tasks/", task);
    alert("Aufgabe erfolgreich erstellt!");
    clearForm();
}


function getSelectedPriority() {
    const buttons = document.querySelectorAll(".priority button");
    for (let button of buttons) {
        if (button.classList.contains("selected")) {
            return button.classList[1];
        }
    }
    return null;
}


function selectPriority(priority) {
    const buttons = document.querySelectorAll(".priority button");
    buttons.forEach(button => button.classList.remove("selected"));
    document.querySelector(`.priority .${priority}`).classList.add("selected");
}


function addSubtask() {
    const subtaskInput = document.getElementById("new-subtask");
    const subtasksContainer = document.querySelector(".subtasks");
    if (subtaskInput.value.trim() !== "") {
        const newSubtask = document.createElement("div");
        newSubtask.classList.add("input-wrapper");
        newSubtask.innerHTML = `
            <input class="input-text" type="text" value="${subtaskInput.value}">
            <div class="button-container">
                <button class="icon-btn" onclick="deleteSubtask(this)">
                    <img src="../assets/icons/delete.svg">
                </button>
            </div>
        `;
        subtasksContainer.appendChild(newSubtask);
        subtaskInput.value = "";
    }
}


function deleteSubtask(button) {
    const subtask = button.closest(".input-wrapper");
    subtask.remove();
}


function clearForm() {
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("due-date").value = "";
    document.getElementById("category").value = "";
    document.querySelectorAll("input[name='assigned_to']").forEach(checkbox => (checkbox.checked = false));
    document.querySelectorAll(".priority button").forEach(button => button.classList.remove("selected"));
    document.querySelector(".subtasks").innerHTML = "";
}
