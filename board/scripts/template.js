/**
 * renderer card in the board
 * @param {*} task 
 * @param {*} subtask 
 * @returns 
 */
function renderTaskCard(task, subtask) {
    let descr = textTrimmer(task.descr, 35);
    let taskCategory = task.cat.replace(/\s/g, '').toLowerCase();
    let prio = task.prio.toLowerCase();
    let card = `<div class="spliter-fields" id="task${task.firebaseId}" onclick="showEditTask('${task.firebaseId}', 'bigCard')" draggable="true" ondragstart="handleDrag('${task.firebaseId}')" ondragend="handleDragEnd(event, '${task.firebaseId}')">
                <div class="task">
                    <div class="task-header">
                        <div class="d-flex-sb-c">
                            <div class="${taskCategory}-task-header">
                                ${task.cat}
                            </div>`
    card += renderArrow(task) + `</div>
                        <div>
                        </div>
                    </div>
                    <div class="task-text-bold">
                        ${task.title}
                    </div>
                    <div class="task-text">
                        <p>${descr}<p>
                    </div>`
    if (subtask == 0) {
        card += `<div class="subtasks-container"></div>`
    } else {
        card += `<div class="subtasks-container">
                    <progress class="progressbar" value="${subtask.min}" max="${subtask.max}"></progress>
                    <p style="font-size: 12px;">${subtask.min}/${subtask.max} Subtasks</p>
                </div>`
    }
    card += `<div class="task-footer"><div class="avatar-div" id="avatar-container${task.firebaseId}">
                </div>
                        <div>
                            <img src="../assets/icons/${prio}.svg" alt="">
                        </div>
                    </div>
                </div>
            </div>`
    return card;
}


/**
 * renderer for the no card in the board
 * @returns 
 */
function renderNoTaskCard() {
    return `<div class="split-spliter-fields" id="task">
                <div class="no-task" id="noTask">
                    <p style="color: #a8a8a8;">No task To do</p>
                </div>
            </div>`
}


/**
 * render the Not Find Banner
 * @returns 
 */
function renderNotFindTask() {
    return `<div class="split-spliter-fields">
                <div class="not-task-find">
                    <p style="color: #a8a8a8;">No task find!</p>
                </div>
            </div>`
}



/**
 * render arrow in the card
 * @param {*} task 
 * @returns 
 */
function renderArrow(task) {
    if(task.type == 'todo') {
        return `<div class="move-btn">
            <img src="../assets/icons/arrow-dropdown.svg" onclick="event.stopPropagation(); fetchNewType(event, 'progress', '${task.firebaseId}')">
        </div>`
    } else if(task.type == 'progress') {
        return `<div class="d-flex-c-c gap-5 move-btn">
            <img src="../assets/icons/arrow-up-dropdown.svg" onclick="event.stopPropagation(); fetchNewType(event, 'todo', '${task.firebaseId}')">
            <img src="../assets/icons/arrow-dropdown.svg" onclick="event.stopPropagation(); fetchNewType(event, 'awaiting', '${task.firebaseId}')">
        </div>`
    } else if(task.type == 'awaiting') {
        return `<div class="d-flex-c-c gap-5 move-btn">
            <img src="../assets/icons/arrow-up-dropdown.svg" onclick="event.stopPropagation(); fetchNewType(event, 'progress', '${task.firebaseId}')">
            <img src="../assets/icons/arrow-dropdown.svg" onclick="event.stopPropagation(); fetchNewType(event, 'done', '${task.firebaseId}')">
        </div>`
    } else if(task.type == 'done') {
        return `<div class="move-btn">
            <img src="../assets/icons/arrow-up-dropdown.svg" onclick="event.stopPropagation(); fetchNewType(event, 'awaiting', '${task.firebaseId}')">
        </div>`
    }
}


/**
 * renderer user avatar in the card
 * @param {*} tasks 
 * @returns 
 */
function rendererEditAvatar(tasks) {
    let initials = tasks.name.split(' ').map(name => name.charAt(0).toUpperCase()).join('');
    return `<span class="avatar" style="background-color: ${tasks.bgcolor}; margin-left: -18px;">${initials}</span>`;
}


/**
 * rederer big card in the board
 * @param {*} task 
 * @returns 
 */
function renderCardOverlay(task) {
    let prio = task[0].prio.toLowerCase();
    let taskCategory = task[0].cat.replace(/\s/g, '').toLowerCase();
    let bigCard = `<div class="edit-card" onclick="event.stopPropagation()">
                    <div class="edit-header d-flex-sb-c">
                        <div class="${taskCategory}-header">
                            ${task[0].cat}
                        </div>
                        <div class="btn d-flex-c-c" onclick="event.stopPropagation(); closeEditOverlay()">
                            <img src="../assets/icons/close.svg" alt="close">
                        </div>
                    </div>
                    <div class="edit-body">
                        <div class="task-text-bold-edit">
                                ${task[0].title}
                        </div>
                        <div class="task-text">
                            <p>${task[0].descr}<p>
                        </div>
                        <div class="d-flex-start-c mh-2">
                            <p class="w-100">Due date:</p>
                            <p>${task[0].date}</p>
                        </div>
                        <div class="d-flex-start-c mh-2">
                            <p class="w-100">Priority:</p>
                            <div class="d-flex-sb-c">
                                <p>${task[0].prio}</p>
                                <img src="../assets/icons/${prio}.svg" alt="">
                            </div>
                        </div>
                        <div>
                            <p>Assigned To:</p>
                            <div class="mh-5">`
    bigCard += renderAvatarBigCard(task[0].user);
    bigCard += `</div>
                    </div>
                    <div >`
    bigCard += renderSubtaskBigCard(task[0], task[0].subtasks);
    bigCard += `
                    </div></div>
                <div class="d-flex-end-c mt-5">
                    <div class="d-flex-c-c btn-div gap-2" id="subtask-btn${task[0].firebaseId}">
                        <img onclick="editTask('${task[0].firebaseId}')" class="sub-btn" src="../assets/icons/edit.svg" alt="edit"/>
                        <div class="divider-sub-input"></div>
                        <img onclick="deleteTask('${task[0].firebaseId}')" class="sub-btn" src="../assets/icons/delete.svg" alt="delete"/>
                    </div>
                </div>

            </div>`
    return bigCard;
}


/**
 * renderer for the avatar in the big card
 * @param {*} taskAvatars 
 * @returns 
 */
function renderAvatarBigCard(taskAvatars) {
    if (!taskAvatars || taskAvatars.length === 0) return '';
    let avatar = "";
    for (let i = 0; i < taskAvatars.length; i++) {
        let initials = taskAvatars[i].name.split(' ').map(name => name.charAt(0).toUpperCase()).join('');
        let capitalizedName = taskAvatars[i].name.split(' ').map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(' ');
        avatar += `<div class="d-flex-start-c gap-20 mh-15">
                    <span class="avatar-card ml-20" style="background-color: ${taskAvatars[i].bgcolor};">${initials}</span>
                    <p class="ml-20">${capitalizedName}</p>
                </div>`
    }
    return avatar;
    
}


/**
 * renderer for the subtask in the big card
 * @param {*} task 
 * @param {*} subtasks 
 * @returns 
 */
function renderSubtaskBigCard(task, subtasks) {
    if (!subtasks || subtasks.length === 0) return '';
    let subtask = "";
    
    subtask += `<p>Subtasks</p><div class="mh-5">`;
    for (let i = 0; i < subtasks.length; i++) {
        if (subtasks[i].completed == true) {
            subtask += `<div class="d-flex-start-c subtask-card">
                    <img class="btn" src="../assets/icons/checkbox-checked.svg" alt="" onclick="toggleSubtask('${task.firebaseId}',${subtasks[i].completed}, ${i})">
                    <p>${subtasks[i].title}</p>
                </div>`
        } else {
            subtask += `<div class="d-flex-start-c subtask-card">
                    <img class="btn" src="../assets/icons/checkbox-disabled.svg" alt="" onclick="toggleSubtask('${task.firebaseId}',${subtasks[i].completed}, ${i})">
                    <p>${subtasks[i].title}</p>
                </div>`
        }
    }
    subtask += `</div>`;
    return subtask;
}


/**
 * renderer for the add task overlay
 * @returns 
 */
function renderEditOverlay() {
    return `<div class="main-content" onclick="event.stopPropagation(); closeDropdown();">
        <div class="d-flex-end-c btn" onclick="closeEditOverlay()">
            <img src="../assets/icons/close.svg" alt="close">
        </div>
        <section class="task-form">
            <div class="form-left">
                <p>Title</p>
                <div>
                    <input class="input-text" type="text" id="title" name="title" placeholder="Enter a title">
                    <div class="error-message" id="error-div-title"> </div>
                </div>

                <p>Description</p>
                <textarea id="description" name="description" placeholder="Enter a Description"></textarea>

                <p>Assigned to</p>
                <div class="dropdown" id="assigned-to">
                    <div class="dropdown-header" onclick="event.stopPropagation(); toggleDropdown()">
                        <span id="dropdown-selected">Select contacts to assign</span>
                        <span class="dropdown-arrow" id="dropdown-arrow">
                            <img src="../assets/icons/arrow-dropdown.svg">
                        </span>
                    </div>
                    <div class="dropdown-options" id="dropdown-options" onclick="event.stopPropagation();">
                    </div>
                </div>
                <div id="avatar-container" style="margin-left: 14px;" class="d-flex-start-c">
                    
                </div>
            </div>

            <div class="divider_mid"></div>

            <div class="form-right">
                <p>Date</p>
                <div>
                    <div class="input-date-container">
                        <input class="input-text" type="date" id="due-date" name="due_date" onchange="handleEditDate(this)">
                        <div class="calendar-icon" onclick="showPicker()"></div>
                    </div>
                    <div class="error-message" id="error-div-due-date"> </div>
                </div>
                <p>Prio</p>
                <div class="priority">
                    <button type="button" class="prio urgent" id="urgent" onclick="selectEditPriority('urgent')">
                        <p>Urgent</p>
                        <img id="urgent-img" src="../assets/icons/urgent.svg">
                    </button>
                    <button type="button" class="prio medium selected" id="medium" onclick="selectEditPriority('medium')">
                        <p>Medium</p>
                        <img id="medium-img" src="../assets/icons/medium.svg">
                    </button>
                    <button type="button" class="prio low" id="low" onclick="selectEditPriority('low')">
                        <p>Low</p>
                        <img id="low-img" src="../assets/icons/low.svg">
                    </button>
                </div>

                <p>Category</p>
                <div>
                    <div class="dropdown" id="category">
                        <div class="dropdown-header" onclick="event.stopPropagation(); toggleCategoryDropdown();">
                            <span id="dropdown-cat-selected">Select task category</span>
                            <span class="dropdown-arrow-cat" id="dropdown-cat-arrow">
                                <img src="../assets/icons/arrow-dropdown.svg">
                            </span>
                        </div>
                        <div class="dropdown-options" id="dropdown-cat-options" onclick="event.stopPropagation();">
                            <div class="dropdown-item btn" onclick="selectEditCategory('Technical Task')">
                                <p>Technical Task</p>
                            </div>
                            <div class="dropdown-item btn" onclick="selectEditCategory('User Story')">
                                <p>User Story</p>
                            </div>
                        </div>
                    </div>
                    <div class="error-message" id="error-div-category"> </div>
                </div>

                <p>Subtasks</p>
                <div class="subtasks">
                    <div class="subtask-input-container">
                        <input id="subtask-input" maxlength="100" class="input-text" placeholder="Add new subtask" onfocus="focusSubtask()"/>
                        <div id="new-subtask" onclick="newSubtask(this)">
                            <img src="../assets/icons/add.svg" alt="plus_icon"/>
                        </div>                        
                        <div id="close-check" class="btn-div-sub d-none">
                            <img onclick="closeSubtask()" class="sub-btn" src="../assets/icons/close.svg" alt="close"/>
                            <div class="divider-input"></div>
                            <img onclick="addEditSubtask()" class="sub-btn" src="../assets/icons/check.svg" alt="check"/>
                        </div>
                    </div>
                    <div id="messages-container" class="messages-container">
                    
                    </div>
                </div>
            </div>
        </section>
        <div class="form-actions">
            <div class="required-message">
                <p><span class="required">*</span>This field is required</p>
            </div>
            <div>
                <button class="btn-create btn-cre-cle" onclick="clickUpdateTask()">OK ✔</button>
            </div>
        </div>
    </div>`
}


/**
 * renderer user-dropdown for the add-task overlay
 * @param {*} assigned 
 * @param {*} selectedUser 
 * @returns 
 */
function renderEditAssignedUser(assigned, selectedUser) {
    let initials = assigned.name.split(' ').map(name => name.charAt(0).toUpperCase()).join('');
    let capitalizedUserName = assigned.name.split(' ').map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(' ');
    if (!selectedUser) {
        return `                        
            <div class="dropdown-item">
                <span class="avatar color" style="background-color: ${assigned.color}">${initials}</span>
                <p>${capitalizedUserName}</p>
                <input class="icon btn" type="checkbox" id="${assigned.id}" name="assigned_to" onclick="toggleEditAvatar(${assigned.id}, this)">
            </div>
        `;
    } else {
        let isChecked = selectedUser.some(user => user.id === assigned.id);
        return `                        
            <div class="dropdown-item">
                <span class="avatar color" style="background-color: ${assigned.color}">${initials}</span>
                <p>${capitalizedUserName}</p>
                <input class="icon btn" type="checkbox" id="${assigned.id}" name="assigned_to" ${isChecked ? 'checked' : ''} onclick="toggleEditAvatar(${assigned.id}, this)">
            </div>
        `;
    }
}


/**
 * renderer the assigned user in the add-task overlay  
 * @param {*} taskuser 
 */
async function rendererTaskAvatar(taskuser) {
    let initials = taskuser.name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
    return `<span class="avatar-edit-card" style="background-color:${taskuser.bgcolor}">
                ${initials}
            </span>`;
    
}


/**
 * render Task user
 * @returns 
 */
async function renderTaskAvatar(task) {
    let avatarContainer = document.getElementById("avatar-container");
    avatarContainer.innerHTML = "";
    if (!task.user || task.user.length == 0) return
    if(task.user.length > 6) {
        for (let i=0; i <  6 ; i++) {
            avatarContainer.innerHTML += await rendererTaskAvatar(task.user[i])
        }
        let overflowValue = task.user.length - 6;
        avatarContainer.innerHTML +=  `<span class="avatar-overflow" style="background-color: #505050">${overflowValue}<img src="../assets/icons/add-white.svg"><span>`
    }else if (task.user.length > 0){
        let userLength = task.user.length;
        for (let i=0; i < userLength; i++) {
            avatarContainer.innerHTML += await rendererTaskAvatar(task.user[i])
        }
    }
}


/**
 * renderer the subtask in the add-task overlay
 * @param {*} id 
 * @param {*} task 
 * @returns 
 */
function renderEditSubtasks(id, task) {
    return `<div class="validation" id="validation-messages-div-${id}" >
                        <div class="d-flex-sb-c validation-messages" onmouseover="handleHover(${id}, this)" onmouseout="handleHoverEnd(${id}, this)">
                            <p class="validation-msg">• ${task.subtasks[id].title}</p>
                            <div class="btn-div-sub gap-2 d-none" id="subtask-btn-${id}">
                                <img onclick="editEditSubtask(${id})" class="sub-btn" src="../assets/icons/edit.svg" alt="edit"/>
                                <div class="divider-sub-input"></div>
                                <img onclick="delEditSubtask(${id})" class="sub-btn" src="../assets/icons/delete.svg" alt="delete"/>
                            </div>
                        </div>
                    </div>`
}


/**
 * renderer the edit subtask in the add-task overlay
 * @param {*} id 
 * @returns 
 */
function renderEditTaskSubtask(id) {
    return `<input id="edit-input-${id}" maxlength="100" class="edit-input" placeholder="Add new subtask"/>                      
            <div id="" class="btn-div-sub gap-2 ">
                <img onclick="delEditSubtask(${id})" class="sub-btn" src="../assets/icons/delete.svg" alt="delete"/>
                <div class="divider-input"></div>
                <img onclick="saveEditTask(${id})" class="sub-btn" src="../assets/icons/check.svg" alt="check"/>
            </div>`
}