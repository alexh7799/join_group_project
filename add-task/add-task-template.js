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
                        <div class="dropdown-item">
                            <span class="avatar color">SM</span>
                            <p>Sofia Müller</p>
                            <input class="icon" type="checkbox" id="sofia" name="assigned_to" value="sofia">
                        </div>
                        <div class="dropdown-item">
                            <span class="avatar color">AM</span>
                            <p>Anton Mayer</p>
                            <input class="icon" type="checkbox" id="anton" name="assigned_to" value="anton">
                        </div>
                    </div>
                </div>
                <div id="id="avatar-container"">
                    <span class="avatar color">AM</span>
                    <span class="avatar color">BM</span>
                    <span class="avatar color">CM</span>
                    <span class="avatar color">DM</span>
                </div>
            </div>

            <div class="divider_mid"></div>

            <div class="form-right">
                <p>Date</p>
                <input class="input-text" type="date" id="due-date" name="due_date">

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
                <button class="btn-clear btn-cre-cle">Clear ✕</button>
                <button class="btn-create btn-cre-cle">Create Task ✔</button>
            </div>
        </div>
    </main>`;
}




