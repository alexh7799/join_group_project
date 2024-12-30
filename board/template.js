function renderTaskCard(task, subtask) {
    let descr = textTrimmer(task.descr, 35);
    let taskCategory = task.cat.replace(/\s/g, '').toLowerCase();
    let prio = task.prio.toLowerCase();
    let card = `<div class="spliter-fields" id="task${task.firebaseId}" onclick="showEditTask('${task.firebaseId}')">
                <div class="task">
                    <div class="${taskCategory}-task-header">
                        ${task.cat}
                    </div>
                    <div class="task-text-bold">
                        ${task.title}
                    </div>
                    <div class="task-text">
                        ${descr}
                    </div>`
    if(subtask == 0){
        card +=`<div class="subtasks"></div>`
    }else {
        card += `<div class="subtasks">
                    <progress class="progressbar" value="${subtask.min}" max="${subtask.max}"></progress>
                    <p style="font-size: 12px;">${subtask.min}/${subtask.max} Subtasks</p>
                </div>`
    }
    card += `<div class="task-footer"><div class="avatar-div">`
    card += renderAvatar(task.user) +`</div>
                        <div>
                            <img src="./img/${prio}.png" alt="">
                        </div>
                    </div>
                </div>
            </div>`
    return card;
}

function renderNoTaskCard() {
    return `<div class="spliter-fields" id="toDoTask">
                <div class="no-task" id="noTask">
                    <p style="color: #a8a8a8;">No task To do</p>
                </div>
            </div>`
}

function renderAvatar(task) {
    let avatar;
    if(task != undefined) {
        for (let i = 0; i < task.length; i++) {
            let initials = task[i].name.split(' ').map(name => name.charAt(0).toUpperCase()).join('');
            avatar = `<span class="avatar" style="background-color: ${task[i].bgcolor}; margin-left: -18px;">${initials}</span>`
        }
        return avatar;
    }else {
        return
    }
    
}