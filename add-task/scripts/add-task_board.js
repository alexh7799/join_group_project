let currentSubtaskId = [];


/**
 * toggled User Dropdown in add-task.html and popups in board.html
 */
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


/**
 * toggled Category Dropdown in add-task.html and popups in board.html
 */
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


/**
 * close all dropdown
 */
function closeDropdown() {
    let dropdownCatOptions = document.getElementById("dropdown-cat-options");
    let dropdownOptions = document.getElementById("dropdown-options");
    let dropdownArrow = document.querySelectorAll(".dropdown-arrow");
    dropdownOptions.classList.remove("show");
    dropdownCatOptions.classList.remove("show");
    dropdownArrow.forEach(arrow => {
        arrow.innerHTML = `<img src="../assets/icons/arrow-dropdown.svg">`;
    });
} 


/**
 * load the add-task.html template
 */
function addTaskTemplate() {
    const container = document.getElementById('addtask-tem');
    const template = getAddTask(taskType); 
    container.innerHTML = template; 
}


/**
 * active the new Subtask input field and focus on it
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
 * close the new Subtask input field and show the add button
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
 * focus the new Subtask input field and hide the add button
 */
function focusSubtask() {
    let closeAndCheck = document.getElementById('close-check');
    let newSubtaskdiv = document.getElementById('new-subtask');
    newSubtaskdiv.classList.add('d-none');
    closeAndCheck.classList.remove('d-none');
}


/**
 * hover the btn for the edited subtask
 * @param {*} subtaskId 
 */
function handleHover(subtaskId) {
    let subtaskBtnContainer = document.getElementById('subtask-btn-'+ subtaskId);
    subtaskBtnContainer.classList.remove('d-none');
}


/**
 * end hover the btn for the edited subtask
 * @param {*} subtaskId 
 */
function handleHoverEnd(subtaskId) {
    let subtaskBtnContainer = document.getElementById('subtask-btn-'+ subtaskId);
    subtaskBtnContainer.classList.add('d-none');
}


/**
 * show the date picker in add-task.html and board.html
 */
function showPicker() {
    const dateInput = document.getElementById('due-date');
    const today = new Date().toISOString().split('T')[0];
    if(activePicker == false) {
        dateInput.min = today;
        dateInput.showPicker();
        activePicker = true;
    } else {
        activePicker = false;
    }

}


/**
 * validate the name of the task
 * @param {*} name 
 * @returns 
 */
function validateName(name) {
    return name.trim().length >= 1;
}


/**
 * validate the date of the task
 * @param {*} date 
 * @returns 
 */
function validateDate(date) {
    const today = new Date().toISOString().split('T')[0];
    if (date < today) {
        return false;
    }
    return true;
}


/**
 * validate the category of the task
 * @param {*} cat 
 * @returns 
 */
function validateCat(cat) {
    if(cat == "") {
        return false;
    }
    return true;
}


/**
 * update the subtask display in add-task.html and board.html
 */
function updateSubtaskDisplay() {
    let messagesContainer = document.getElementById('messages-container');
    messagesContainer.innerHTML = "";
    for (let i = 0; i < newTask.subtasks.length; i++) {
        messagesContainer.innerHTML += renderSubtasks(i);
    }
}


/**
 * delete the subtask in add-task.html and board.html
 * @param {*} subtaskId 
 */
function delSubtask(subtaskId) {
    newTask.subtasks.splice(subtaskId, 1);
    updateSubtaskDisplay();
}


/**
 * edit the subtask in add-task.html and board.html
 * @param {*} subtaskId 
 */
function editSubtask(subtaskId) {
    const subtask = newTask.subtasks[subtaskId].title;
    let editInput = document.getElementById(`validation-messages-div-${subtaskId}`);
    editInput.innerHTML = renderEditSubtask(subtaskId);
    let editInputSubtask = document.getElementById(`edit-input-${subtaskId}`);
    editInputSubtask.value = subtask;
    editInputSubtask.focus();
    editInputSubtask.addEventListener('blur', function() {
        if (editInputSubtask.value.trim() === '') {
            delSubtask(subtaskId)
            currentSubtaskId = null;
        }
    });
}


/**
 * save the edited subtask in add-task.html
 * @param {*} subtaskId 
 */
function saveEdit(subtaskId) {
    let newValue = document.getElementById(`edit-input-${subtaskId}`).value;
    if (validateName(newValue)) {
        newTask.subtasks[subtaskId].title = newValue;
        updateSubtaskDisplay();
    }else {
        delSubtask(subtaskId);
    }
}


/**
 * save the new date in add-task.html
 * @param {*} dateInput 
 */
function handleDate(dateInput) {
    let selectedDate = dateInput.value;
    if (validateDate(selectedDate)) { 
        newTask.date = selectedDate;
    }
}


/**
 * validate the subtask in add-task.html
 * @param {*} title 
 * @param {*} date 
 * @param {*} isValid 
 * @returns 
 */
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


/**
 * toggle the avatar-checkbox in add-task.html and board.html
 * @param {*} avatarId 
 * @param {*} checkbox 
 */
function toggleAvatar(avatarId, checkbox) {
    let user = usersArray.filter(u => u.id == avatarId);
    if (checkbox.checked) {
        newTask.user.push({ bgcolor: user[0].color, name: user[0].name, id: user[0].id });
    } else {
        newTask.user = newTask.user.filter(u => u.name !== user[0].name);
    }
    renderAvatar();
}


/**
 * select the priority in add-task.html and board.html
 * @param {*} priority 
 */
function selectPriority(priority) {
    const buttons = document.querySelectorAll(".prio");
    buttons.forEach(button => button.classList.remove("selected"));
    document.querySelector(`.priority .${priority}`).classList.add("selected");
    let capitalizedPriority = priority.split(' ').map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(' ');
    newTask.prio = capitalizedPriority;
}


/**
 * search the users in add-task.html and board.html
 */
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


/**
 * render the user in add-task.html and board.html
 * @param {*} usersArray 
 */
function addAssignedToTemplate(usersArray) {
    let dropdownOptions = document.getElementById("dropdown-options");
    dropdownOptions.innerHTML = "";
    for (let i = 0; i < usersArray.length; i++) {
        dropdownOptions.innerHTML += renderAssignedUser(usersArray[i]);    
    }
}


/**
 * save the new task in add-task.html
 */
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


/**
 * clear the error messages in add-task.html and board.html
 */
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


/**
 * select the category in add-task.html and board.html
 * @param {*} cat 
 */
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


/**
 * the last check validation in add-task.html and board.html
 * @returns 
 */
function lastValidate() {
    let title = document.getElementById("title").value;
    let date = newTask.date;
    let isValid = true;

    clearErrorMessages();

    return subValidate(title, date, isValid)
}


/**
 * render the Avatar for max 6 users
 * @returns 
 */
function renderAvatar() {
    let userLength;
    let overflowValue;
    let avatarContainer = document.getElementById("avatar-container");
    avatarContainer.innerHTML = "";
    if(newTask.user.length > 6) {
        for (let i=0; i <  6 ; i++) {
            avatarContainer.innerHTML += rendererAvatar(newTask.user[i])
        }
        overflowValue = newTask.user.length - 6;
        avatarContainer.innerHTML +=  `<span class="avatar-overflow" style="background-color: #505050">${overflowValue}<img src="../assets/icons/add-white.svg"><span>`
    }else if (newTask.user.length > 0){
        userLength = newTask.user.length;
        for (let i=0; i < userLength; i++) {
            avatarContainer.innerHTML += rendererAvatar(newTask.user[i])
        }
    }else {
        avatarContainer.innerHTML = '';
        return;
    }
}