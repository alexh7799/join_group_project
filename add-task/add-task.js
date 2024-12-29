const BASE_URL = "https://join-c39f7-default-rtdb.europe-west1.firebasedatabase.app/";

function initAddTask() {
    includeHTML();
    addtasktemplate();
    toggleAvatar();
    createTask();
    addSubtask();
}


function toggleDropdown() {
    let dropdownOptions = document.getElementById("dropdown-options");
    let dropdownArrow = document.getElementById("dropdown-arrow");
    dropdownOptions.classList.toggle("show");
    if (dropdownOptions.classList.contains("show")) {
        dropdownArrow.innerHTML = `<img src="img/assets/icons/arrow-up-dropdown.svg">`;
    } else {
        dropdownArrow.innerHTML = `<img src="img/assets/icons/arrow-dropdown.svg">`;
    }
}

function addtasktemplate() {
    const container = document.getElementById('addtask-tem');
    const template = getaddtaks(); 
    container.innerHTML = template; 
}


function toggleDropdown() {
    let dropdownOptions = document.getElementById("dropdown-options");
    let dropdownArrow = document.getElementById("dropdown-arrow");
    dropdownOptions.classList.toggle("show");
    if (dropdownOptions.classList.contains("show")) {
        dropdownArrow.innerHTML = `<img src="img/assets/icons/arrow-up-dropdown.svg">`;
    } else {
        dropdownArrow.innerHTML = `<img src="img/assets/icons/arrow-dropdown.svg">`;
    }
}




function toggleAvatar(checkbox) {
    if (!checkbox || !checkbox.value) {
        console.error("Checkbox ist nicht definiert oder hat keinen Wert:", checkbox);
        return;
    }

    const avatarContainer = document.getElementById("avatar-container");
    const value = checkbox.value.toUpperCase();

    if (checkbox.checked) {
        let avatarExists = false;
        const avatars = avatarContainer.getElementsByTagName("span");
        for (let i = 0; i < avatars.length; i++) {
            if (avatars[i].getAttribute("data-value") === value) {
                avatarExists = true;
                break;
            }
        }

        if (!avatarExists) {
            const avatar = document.createElement("span");
            avatar.className = "avatar color";
            avatar.setAttribute("data-value", value);
            avatar.textContent = value;
            avatarContainer.appendChild(avatar);
        }
    } else {
        const avatars = avatarContainer.getElementsByTagName("span");
        for (let i = 0; i < avatars.length; i++) {
            if (avatars[i].getAttribute("data-value") === value) {
                avatarContainer.removeChild(avatars[i]);
                break;
            }
        }
    }
}

function addCheckboxListeners() {
    const checkboxes = document.getElementsByName("assigned_to");
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].onchange = function () {
            toggleAvatar(this);
        };
    }
}


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
        alert("Bitte füllen Sie alle erforderlichen Felder aus.");
        return;
    }

    const task = {
        title,
        description,
        dueDate,
        category,
        assignedTo,
        priority,
        subtasks
    };

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
                    <img src="img/assets/icons/delete.svg">
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
