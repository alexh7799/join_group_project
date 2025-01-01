let categoryValue = '';
let activePicker = false;


function editTask(firebaseId) {
    showEditTask(firebaseId, 'editTask');
    loadTaskInEditCard(editedTask)
}


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


function handleEditDate(dateInput) {
    let selectedDate = dateInput.value;
    const formattedDate = selectedDate;
    editedTask[0].date = formattedDate;
}


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


function showError(fieldId, message) {
    const errorInput = document.getElementById(fieldId)
    const errorDiv = document.getElementById('error-div-' + fieldId);
    if (errorDiv !== null) {
        errorDiv.classList.remove('d-none');
        errorDiv.textContent = message;
        errorInput.classList.add('error')
    }
}


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


function assignedToTemplate(usersArray, selectedUser) {
    let dropdownOptions = document.getElementById("dropdown-options");
    dropdownOptions.innerHTML = "";
    for (let i = 0; i < usersArray.length; i++) {
        dropdownOptions.innerHTML += renderEditAssignedUser(usersArray[i], selectedUser);
    }
}


function updateSubtask() {
    let messagesContainer = document.getElementById('messages-container');
    messagesContainer.innerHTML = "";
    if (!editedTask[0].subtasks || editedTask[0].subtasks.length === 0) return '';
    for (let i = 0; i < editedTask[0].subtasks.length; i++) {
        messagesContainer.innerHTML += renderEditSubtasks(i, editedTask[0]);
    }
}


function editEditSubtask(subtaskId) {
    const subtask = editedTask[0].subtasks[subtaskId].title;
    let editInput = document.getElementById(`validation-messages-div-${subtaskId}`);

    editInput.innerHTML = renderEditSubtask(subtaskId);
    let editInputSubtask = document.getElementById(`edit-input-${subtaskId}`);
    editInputSubtask.value = subtask;
    editInputSubtask.focus();
}


function delEditSubtask(subtaskId) {
    editedTask[0].subtasks.splice(subtaskId, 1);
    updateSubtask();
}


async function saveEdit(subtaskId) {
    let newValue = document.getElementById(`edit-input-${subtaskId}`).value;
    if (validateName(newValue)) {
        editedTask[0].subtasks[subtaskId].title = newValue;
        await loadTaskInEditCard()
    }
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


async function clickUpdateTask() {
    editedTask[0].title = document.getElementById('title').value;
    editedTask[0].descr = document.getElementById('description').value;
    await updateTask(editedTask[0]);
    await closeEditOverlay();
}


function selectEditPriority(priority) {
    const buttons = document.querySelectorAll(".prio");
    buttons.forEach(button => button.classList.remove("selected"));
    document.querySelector(`.priority .${priority}`).classList.add("selected");
    let capitalizedPriority = priority.split(' ').map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(' ');
    editedTask[0].prio = capitalizedPriority;
}


function toggleEditAvatar(avatarId, checkbox) {
    let user = usersArray.filter(u => u.id == avatarId);
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