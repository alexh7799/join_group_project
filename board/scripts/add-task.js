let categoryValue = '';
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


/**
 * edit task start function
 * @param {*} firebaseId 
 */
function editTask(firebaseId) {
    showEditTask(firebaseId, 'editTask');
    loadTaskInEditCard(editedTask)
}


/**
 * load the edit task in the edit card
 */
async function loadTaskInEditCard() {
    let prio = editedTask[0].prio.split(' ').map(name => name.toLowerCase()).join('');
    document.getElementById("title").value = editedTask[0].title;
    document.getElementById("description").value = editedTask[0].descr;
    document.getElementById("due-date").value = editedTask[0].date;
    document.getElementById("category").value = editedTask[0].cat;
    document.getElementById('dropdown-cat-selected').innerText = editedTask[0].cat
    document.querySelectorAll(".priority button").forEach(button => button.classList.remove("selected"));
    document.getElementById(prio).classList.add('selected');
    await renderTaskAvatar(editedTask[0])
    await assignedUsers(editedTask[0].user)
    await updateSubtask()
}


/**
 * load the new date in the edited task
 * @param {*} dateInput 
 */
function handleEditDate(dateInput) {
    let selectedDate = dateInput.value;
    editedTask[0].date = selectedDate;
}


/**
 * select the category for the edited task
 * @param {*} cat 
 */
async function selectEditCategory(cat) {
    let selectCategoryText = document.getElementById('dropdown-cat-selected')
    if (cat == 'Technical Task') {
        categoryValue = 'Technical Task';
        selectCategoryText.innerText = 'Technical Task';
    } else if (cat == 'User Story') {
        categoryValue = 'User Story';
        selectCategoryText.innerText = 'User Story';
    }
    editedTask[0].cat = categoryValue;
    await toggleCategoryDropdown()
}


/**
 * show the error message
 * @param {*} fieldId 
 * @param {*} message 
 */
function showError(fieldId, message) {
    const errorInput = document.getElementById(fieldId)
    const errorDiv = document.getElementById('error-div-' + fieldId);
    if (errorDiv !== null) {
        errorDiv.classList.remove('d-none');
        errorDiv.textContent = message;
        errorInput.classList.add('error')
    }
}


/**
 * fetch the users from the database
 * @param {*} selectedUser 
 */
async function assignedUsers(selectedUser) {
    try {
        const response = await fetch(BASE_URL + "users/.json");
        let user = await response.json();
        usersArray = Object.entries(user).map(([key, user]) => ({
            ...user,
        }));
        await assignedToTemplate(usersArray, selectedUser)
    } catch (error) {
        console.error('Fehler:', error);
    }
}


/**
 * load the assigned user in the edit card
 * @param {*} usersArray 
 * @param {*} selectedUser 
 */
function assignedToTemplate(usersArray, selectedUser) {
    let dropdownOptions = document.getElementById("dropdown-options");
    dropdownOptions.innerHTML = "";
    for (let i = 0; i < usersArray.length; i++) {
        dropdownOptions.innerHTML += renderEditAssignedUser(usersArray[i], selectedUser);
    }
}


/**
 * update function for the subtasks
 * @returns 
 */
function updateSubtask() {
    let messagesContainer = document.getElementById('messages-container');
    messagesContainer.innerHTML = "";
    if (!editedTask[0].subtasks || editedTask[0].subtasks.length === 0) return '';
    for (let i = 0; i < editedTask[0].subtasks.length; i++) {
        messagesContainer.innerHTML += renderEditSubtasks(i, editedTask[0]);
    }
}


/**
 * edit the subtask
 * @param {*} subtaskId 
 */
function editEditSubtask(subtaskId) {
    const subtask = editedTask[0].subtasks[subtaskId].title;
    let editInput = document.getElementById(`validation-messages-div-${subtaskId}`);
    currentSubtaskId = subtaskId;
    editInput.innerHTML = renderEditTaskSubtask(subtaskId);
    let editInputSubtask = document.getElementById(`edit-input-${subtaskId}`);
    editInputSubtask.value = subtask;
    editInputSubtask.focus();
    editInputSubtask.addEventListener('blur', function() {
        if (editInputSubtask.value.trim() === '') {
            delEditSubtask(subtaskId)
            currentSubtaskId = null;
        }
    });
}


/**
 * delete the subtask
 * @param {*} subtaskId 
 */
function delEditSubtask(subtaskId) {
    editedTask[0].subtasks.splice(subtaskId, 1);
    updateSubtask();
}


/**
 * save the edit subtask
 * @param {*} subtaskId 
 */
async function saveEditTask(subtaskId) {
    let newValue = document.getElementById(`edit-input-${subtaskId}`).value;
    if (validateName(newValue)) {
        editedTask[0].subtasks[subtaskId].title = newValue;
        await loadTaskInEditCard()
    }
}


/**
 * show the edit subtask in edit task
 * @param {*} newSubtaskdiv 
 */
function newSubtask(newSubtaskdiv) {
    const input = document.getElementById('subtask-input');
    input.focus();

    let closeAndCheck = document.getElementById('close-check');
    newSubtaskdiv.classList.add('d-none');
    closeAndCheck.classList.remove('d-none');
}


/**
 * render the edit Task User
 * @returns 
 */
function renderEditAvatar(task) {
    let avatarContainer = document.getElementById("avatar-container"+ task.firebaseId);
    avatarContainer.innerHTML = "";
    if (!task.user || task.user.length == 0) return
    if(task.user.length > 6) {
        for (let i=0; i <  6 ; i++) {
            avatarContainer.innerHTML += rendererEditAvatar(task.user[i])
        }
        let overflowValue = task.user.length - 6;
        avatarContainer.innerHTML +=  `<span class="avatar-overflow" style="background-color: #505050">${overflowValue}<img src="../assets/icons/add-white.svg"><span>`
    }else if (task.user.length > 0){
        let userLength = task.user.length;
        for (let i=0; i < userLength; i++) {
            avatarContainer.innerHTML += rendererEditAvatar(task.user[i])
        }
    }
}


/**
 * close the subtask
 */
function closeSubtask() {
    let closeAndCheck = document.getElementById('close-check');
    let newSubtaskdiv = document.getElementById('new-subtask');
    const input = document.getElementById('subtask-input');
    newSubtaskdiv.classList.remove('d-none');
    closeAndCheck.classList.add('d-none');
    input.value = "";
}


/**
 * add the subtask in the edit task
 */
function addEditSubtask() {
    let subtaskInput = document.getElementById('subtask-input').value;
    let isValidSubtask = true;

    if (!validateName(subtaskInput)) {
        isValidSubtask = false;
    }

    if (isValidSubtask) {
        if (!editedTask[0].subtasks) {
            editedTask[0].subtasks = [];
        }
        editedTask[0].subtasks.push({
            "completed": false,
            "title": subtaskInput
        });
        closeSubtask();
        updateSubtask();
    }
}


/**
 * clickbtn function for the edit task
 */
async function clickUpdateTask() {
    editedTask[0].title = document.getElementById('title').value;
    editedTask[0].descr = document.getElementById('description').value;
    await updateTask(editedTask[0]);
    await showEditTask(editedTask[0].firebaseId, 'bigCard')
}


/**
 * select the priority for the edited task
 * @param {*} priority 
 */
function selectEditPriority(priority) {
    const buttons = document.querySelectorAll(".prio");
    buttons.forEach(button => button.classList.remove("selected"));
    document.querySelector(`.priority .${priority}`).classList.add("selected");
    let capitalizedPriority = priority.split(' ').map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(' ');
    editedTask[0].prio = capitalizedPriority;
}


/**
 * toggler for the users in the edit task
 * @param {*} avatarId 
 * @param {*} checkbox 
 */
function toggleEditAvatar(avatarId, checkbox) {
    let user = usersArray.filter(u => u.id == avatarId);
    if(!editedTask[0].user) editedTask[0].user = []
    if (checkbox.checked) {
        editedTask[0].user.push({
            bgcolor: user[0].color,
            name: user[0].name,
            id: user[0].id
        });
    } else {
        editedTask[0].user = editedTask[0].user.filter(u => u.name !== user[0].name);
    }
    renderTaskAvatar(editedTask[0]);
}