function renderTaskCard() {
    return `<div class="spliter-fields" id="inProgressTask">
                <div class="task">
                    <div class="userstory-task-header">
                        User Story
                    </div>
                    <div class="task-text-bold">
                        Kochwelt Page & Recipe Recommender
                    </div>
                    <div class="task-text">
                        Bulid start page with recipe recommendation bla bla bla bla
                    </div>
                    <div class="subtasks">
                        <progress class="progressbar" value="50" max="100"></progress>
                        <p style="font-size: 12px;">1/2 Subtasks</p>
                    </div>
                    <div class="task-footer">
                        <div class="avatar-div">
                            <span class="avatar" style="background-color: blue; margin-left: -18px;">SK</span>
                            <span class="avatar" style="background-color: red; margin-left: -18px;">LM</span>
                            <span class="avatar" style="background-color: orange; margin-left: -18px;">DK</span>
                            <span class="avatar" style="background-color: green; margin-left: -18px;">AM</span>
                        </div>
                        <div>
                            <img src="./img/medium.png" alt="">
                        </div>
                    </div>
                </div>
            </div>`
}

function renderNoTaskCard() {
    return `<div class="spliter-fields" id="toDoTask">
                <div class="no-task" id="noTask">
                    <p style="color: #a8a8a8;">No task To do</p>
                </div>
            </div>`
}