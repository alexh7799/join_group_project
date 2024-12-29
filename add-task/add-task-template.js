function getaddtaks() {
    return `
    <main class="main-content">
        <div class="main-title">
            <h1>Add Task</h1>
        </div>
        <section class="task-form">
            <div class="form-left">
                <p>Title<span class="required">*</span></p>
                <input class="input-text" type="text" id="title" name="title" placeholder="Enter a title">

                <p>Description</p>
                <textarea id="description" name="description" placeholder="Enter a Description"></textarea>

                <p>Assigned to</p>
                <div class="dropdown" id="assigned-to">
                    <div class="dropdown-header" onclick="toggleDropdown()">
                        <span id="dropdown-selected">Select contacts to assign</span>
                        <span class="dropdown-arrow" id="dropdown-arrow">
                            <img src="../assets/icons/arrow-dropdown.svg">
                        </span>
                    </div>
                    <div class="dropdown-options" id="dropdown-options">
                    </div>
                </div>
                <div id="avatar-container">
                    
                </div>
            </div>

            <div class="divider_mid"></div>

            <div class="form-right">
                <p>Date</p>
                <div class="input-date-container">
                    <input class="input-text" type="date" id="due-date" name="due_date">
                    <div class="calendar-icon" onclick="showPicker(this)"></div>
                </div>
                <p>Prio</p>
                <div class="priority">
                    <button type="button" class="prio urgent">
                        <p>Urgent</p>
                        <img src="../assets/icons/urgent.svg">
                    </button>
                    <button type="button" class="prio medium">
                        <p>Medium</p>
                        <img src="../assets/icons/medium.svg">
                    </button>
                    <button type="button" class="prio low">
                        <p>Low</p>
                        <img src="../assets/icons/low.svg">
                    </button>
                </div>

                <p>Category<span class="required">*</span></p>
                <select id="category" name="category">
                    <option value="">Select task category</option>
                    <option value="technical">Technical Task</option>
                    <option value="user-story">User Story</option>
                </select>

                <p>Subtasks</p>
                <div class="subtasks">
                    <div class="validation-messages">
                        <p class="validation-msg" ondblclick="editSubtask(this)">• Subtasks example</p>
                        <p class="validation-msg" ondblclick="editSubtask(this)">• Subtasks example</p>
                        <p class="validation-msg" ondblclick="editSubtask(this)">• Subtasks example</p>
                    </div>
                </div>
            </div>
        </section>
        <div class="form-actions">
            <div class="required-message">
                <p><span class="required">*</span>This field is required</p>
            </div>
            <div>
                <button class="btn-clear btn-cre-cle" onclick="clearForm()">Clear ✕</button>
                <button class="btn-create btn-cre-cle" onclick="createTask()">Create Task ✔</button>
            </div>
        </div>
    </main>`;
}


function renderAssignedUser(assigned) {
    let initials = assigned.name.split(' ').map(name => name.charAt(0).toUpperCase()).join('');
    let capitalizedUserName = assigned.name.split(' ').map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(' ');
    return `                        
        <div class="dropdown-item">
            <span class="avatar color" style="background-color: ${assigned.color}">${initials}</span>
            <p>${capitalizedUserName}</p>
            <input class="icon" type="checkbox" id="${assigned.id}" name="assigned_to" value="0" onclick="toggleAvatar(${assigned.id}, this)">
        </div>
    `;
}

function renderAvatar() {
    let avatarContainer = document.getElementById("avatar-container");
    avatarContainer.innerHTML = "";
    
    newTask.user.forEach(user => {
        let initials = user.name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
        avatarContainer.innerHTML += `
            <span class="avatar" style="background-color:${user.bgcolor}">
                ${initials}
            </span>`;
    });
}