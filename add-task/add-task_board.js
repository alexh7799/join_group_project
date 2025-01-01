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

function toggleCategoryDropdown() {
    let dropdownOptions = document.getElementById("dropdown-cat-options");
    let dropdownArrow = document.getElementById("dropdown-cat-arrow");
    dropdownOptions.classList.toggle("show");
    if (dropdownOptions.classList.contains("show")) {
        dropdownArrow.innerHTML = `<img src="../assets/icons/arrow-up-dropdown.svg">`;
    } else {
        dropdownArrow.innerHTML = `<img src="../assets/icons/arrow-dropdown.svg">`;
    }
}

function addTaskTemplate() {
    const container = document.getElementById('addtask-tem');
    const template = getAddTask(taskType); 
    container.innerHTML = template; 
}

function newSubtask(newSubtaskdiv) {
    const input = document.getElementById('subtask-input');
    input.focus();

    let closeAndCheck = document.getElementById('close-check');
    newSubtaskdiv.classList.add('d-none');
    closeAndCheck.classList.remove('d-none');
}

function closeSubtask() {
    let closeAndCheck = document.getElementById('close-check');
    let newSubtaskdiv = document.getElementById('new-subtask');
    const input = document.getElementById('subtask-input');
    newSubtaskdiv.classList.remove('d-none');
    closeAndCheck.classList.add('d-none');
    input.value = "";
}


function focusSubtask() {
    let closeAndCheck = document.getElementById('close-check');
    let newSubtaskdiv = document.getElementById('new-subtask');
    newSubtaskdiv.classList.add('d-none');
    closeAndCheck.classList.remove('d-none');
}

function handleHover(subtaskId) {
    let subtaskBtnContainer = document.getElementById('subtask-btn-'+ subtaskId);
    subtaskBtnContainer.classList.remove('d-none');
}

function handleHoverEnd(subtaskId) {
    let subtaskBtnContainer = document.getElementById('subtask-btn-'+ subtaskId);
    subtaskBtnContainer.classList.add('d-none');
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


function showPicker() {
    const dateInput = document.getElementById('due-date');

    if(activePicker == false) {
        dateInput.showPicker();
        activePicker = true;
    } else {
        activePicker = false;
    }

}

function validateName(name) {
    return name.trim().length >= 2;
}

function validateDate(date) {
    const today = new Date().toISOString().split('T')[0];
    if (date < today) {
        return false;
    }
    return true;
}

function validateCat(cat) {
    if(cat == "") {
        return false;
    }
    return true;
}

function updateSubtaskDisplay() {
    let messagesContainer = document.getElementById('messages-container');
    messagesContainer.innerHTML = "";
    for (let i = 0; i < newTask.subtasks.length; i++) {
        messagesContainer.innerHTML += renderSubtasks(i);
    }
}

function delSubtask(subtaskId) {
    newTask.subtasks.splice(subtaskId, 1);
    updateSubtaskDisplay();
}

function editSubtask(subtaskId) {
    const subtask = newTask.subtasks[subtaskId].title;
    let editInput = document.getElementById(`validation-messages-div-${subtaskId}`);
    
    editInput.innerHTML = renderEditSubtask(subtaskId);
    let editInputSubtask = document.getElementById(`edit-input-${subtaskId}`);
    editInputSubtask.value = subtask;
    editInputSubtask.focus();
}

function saveEdit(subtaskId) {
    let newValue = document.getElementById(`edit-input-${subtaskId}`).value;
    if (validateName(newValue)) {
        newTask.subtasks[subtaskId].title = newValue;
        updateSubtaskDisplay();
    }
}

function handleDate(dateInput) {
    let selectedDate = dateInput.value;
    if (validateDate(selectedDate)) {
        const formattedDate = selectedDate;
        newTask.date = formattedDate;
    }
}

function subValidate(title, date, isValid) {
    if (!validateName(title)) {
        showError('title', 'This field is required');
        isValid = false;
    }else {
        newTask.title = title;
    }

    if (!validateDate(date)) {
        showError('due-date', 'This field is required');
        isValid = false;
    }

    if (!validateCat(categoryValue)) {
        showError('category', 'Please select a category for your task');
        isValid = false;
    }else {
        newTask.cat = categoryValue;
    }

    return isValid;
}

function toggleAvatar(avatarId, checkbox) {
    let user = usersArray.filter(u => u.id == avatarId);
    if (checkbox.checked) {
        newTask.user.push({
            bgcolor: user[0].color,
            name: user[0].name,
            id: user[0].id
        });
    } else {
        newTask.user = newTask.user.filter(u => u.name !== user[0].name);
    }
    renderAvatar();
}

function selectPriority(priority) {
    const buttons = document.querySelectorAll(".prio");
    buttons.forEach(button => button.classList.remove("selected"));
    document.querySelector(`.priority .${priority}`).classList.add("selected");
    let capitalizedPriority = priority.split(' ').map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(' ');
    newTask.prio = capitalizedPriority;
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


function addSubtask() {
    let subtaskInput = document.getElementById('subtask-input').value;
    let isValidSubtask = true;

    if (!validateName(subtaskInput)) {
        isValidSubtask = false;
    }

    if (isValidSubtask) {
        if (!newTask.subtasks) {
            newTask.subtasks = [];
        }
        newTask.subtasks.push({
            "completed": false,
            "title": subtaskInput
        });
        closeSubtask();
        updateSubtaskDisplay();
    }
}

function clearErrorMessages() {
    const errorDiv = document.querySelectorAll('.error-message');
    const errorInput = document.querySelectorAll('.error');
    errorDiv.forEach(error => {
        error.classList.add('d-none');    
    });
    errorInput.forEach(error => {
        error.classList.remove('error');    
    });
}

function selectCategory(cat) {
    let selectCategoryText = document.getElementById('dropdown-cat-selected')
    if (cat == 'Technical Task') {
        categoryValue = 'Technical Task';
        selectCategoryText.innerText = 'Technical Task';
    } else if (cat == 'User Story') {
        categoryValue = 'User Story';
        selectCategoryText.innerText = 'User Story';
    }
    toggleCategoryDropdown()
}

function lastValidate() {
    let title = document.getElementById("title").value;
    let date = newTask.date;
    let isValid = true;

    clearErrorMessages();

    return subValidate(title, date, isValid)
}


function showError(fieldId, message) {
    const errorInput = document.getElementById(fieldId)
    const errorDiv = document.getElementById('error-div-' + fieldId);
    if (errorDiv !== null) {
        errorDiv.classList.remove('d-none');
        errorDiv.textContent = message;
        errorInput.classList.add('error')
    }
}



async function createTask(type) {
    newTask.descr = document.getElementById('description').value;
    newTask.type = type;
    try {
        if(lastValidate()){
            await postData("tasks/", newTask);
            await clearForm();
            await showBoardTasks();
            await setTimeout(()=>{
                window.location.href = "../board/board.html"
            }, 500)
        }
    } catch (error) {
        console.error('Fehler', error)
    }
}


function clearForm() {
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("due-date").value = "";
    document.getElementById("category").value = "";
    document.querySelectorAll(".priority button").forEach(button => button.classList.remove("selected"));
    document.getElementById('medium').classList.add('selected');
    document.querySelector("#messages-container").innerHTML = "";

    newTask = {
        "cat": "",
        "user": [],
        "type": "todo",
        "descr": "",
        "date": "",
        "prio": "Medium",
        "subtasks": [],
        "title": ""
    };

    renderAvatar();
}

function showBoardTasks() {
    let overlayDiv = document.getElementById('overlay-to-board')
    overlayDiv.classList.add('overlay-board')
}

async function postData(path = "", data = "") { // Anlegen von Daten 
    let response = await fetch(BASE_URL + path + ".json", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    responseToJson = await response.json();
    return responseToJson;
}