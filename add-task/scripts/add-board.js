/**
 * show the error in add-task.html and board.html
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
 * create the new task in add-task.html and board.html
 * @param {*} type 
 */
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


/**
 * clear the form in add-task.html and board.html
 */
function clearForm() {
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("due-date").value = "";
    document.getElementById("category").value = "";
    document.querySelectorAll(".priority button").forEach(button => button.classList.remove("selected"));
    document.getElementById('medium').classList.add('selected');
    document.querySelector("#messages-container").innerHTML = "";

    newTask = {"cat": "","user": [],"type": "todo","descr": "","date": "","prio": "Medium","subtasks": [],"title": ""};

    renderAvatar();
}


/**
 * show the info box in add-task.html and board.html
 */
function showBoardTasks() {
    let overlayDiv = document.getElementById('overlay-to-board')
    overlayDiv.classList.add('overlay-board')
}


/**
 * post function for the new task in add-task.html and board.html
 * @param {*} path 
 * @param {*} data 
 * @returns 
 */
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