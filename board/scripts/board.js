const BASE_URL = "https://join-c39f7-default-rtdb.europe-west1.firebasedatabase.app/";

let tasksArray = [];
let editedTask = [];


/**
 * initialize the board
 */
async function initBoard() {
  checkLogin();
  includeHTML();
  checkLink();
  generateInitials();
  await loadingTasks()
}


/**
 * load the tasks from the database
 */
async function loadingTasks() {
  try {
      let response = await fetch(BASE_URL + "tasks/" + ".json");
      let tasks = await response.json();
      if (tasks == null) tasks = {};
      tasksArray = Object.entries(tasks).map(([key, tasks]) => ({
          ...tasks,
          firebaseId: key
      }));
      await decideCardType() 
  } catch (error) {
      console.error('Fehler:', error);
  }
}


/**
 * check login status
 * @param {*} sessionUser 
 * @returns 
 */
function checkPager(sessionUser) {
  if (!sessionUser) {
      window.location.href = "../login/login.html";
      return;
  }
}


/**
 * render the task card in the decided container
 */
function decideCardType() {
  let todoTasks = tasksArray.filter(task => task.type === 'todo');
  let progressTasks = tasksArray.filter(task => task.type === 'progress');
  let awaitingTasks = tasksArray.filter(task => task.type === 'awaiting');
  let doneTasks = tasksArray.filter(task => task.type === 'done');

  loadRenderCard(todoTasks, progressTasks, awaitingTasks, doneTasks);
}


/**
 * load the Cards in the task-containers
 * @param {*} todoTasks 
 * @param {*} progressTasks 
 * @param {*} awaitingTasks 
 * @param {*} doneTasks 
 */
function loadRenderCard(todoTasks, progressTasks, awaitingTasks, doneTasks) {
  if(todoTasks.length > 0) {
    renderTasks('todo-container', todoTasks);
  }else {
    renderNoTask('todo-container');
  }

  if(progressTasks.length > 0) {
    renderTasks('progress-container', progressTasks);
  }else {
    renderNoTask('progress-container');
  }

  if(awaitingTasks.length > 0) {
    renderTasks('await-container', awaitingTasks);
  }else {
    renderNoTask('await-container');
  }

  if(doneTasks.length > 0) {
    renderTasks('done-container', doneTasks);
  }else {
    renderNoTask('done-container');
  }  
}


/**
 * render the task card
 * @param {*} containerId 
 * @param {*} tasks 
 */
function renderTasks(containerId, tasks) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  tasks.forEach(task => {
    if (task.subtasks != undefined) {
      let subtask = subtaskCal(task.subtasks);
      container.innerHTML += renderTaskCard(task, subtask);
      renderEditAvatar(task);
    } else {
      container.innerHTML += renderTaskCard(task, 0);
      renderEditAvatar(task);
    }
  });
}


/**
 * render the no task card
 * @param {*} containerId 
 */
function renderNoTask(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  container.innerHTML += renderNoTaskCard();
}


/**
 * trimmt the text
 * @param {*} text 
 * @param {*} textLength 
 * @returns 
 */
function textTrimmer(text, textLength) {
  return text.length > textLength ? text.substring(0, textLength) + "..." : text;
}


/**
 * renderValues for the prossesbar
 * @param {*} task 
 * @returns 
 */
function subtaskCal(task) {
  if(task == undefined) return 0;
  let min = 0
  for (let i = 0; i < task.length; i++) {
    if(task[i].completed) {
      min ++;
    }
  }
  return {
    "min": min,
    "max": task.length
  }
}


/**
 * show the edit task or the big card
 * @param {*} taskId 
 * @param {*} showType 
 */
function showEditTask(taskId, showType) {
  let overlayDiv = document.getElementById('overlay-edit-task');
  overlayDiv.classList.add('overlay-edit');
  task = tasksArray.filter(task => task.firebaseId === taskId);
  if(showType == 'bigCard') {
    overlayDiv.innerHTML = renderCardOverlay(task);
  } else if(showType == 'editTask') {
    editedTask = task;
    overlayDiv.innerHTML = renderEditOverlay();
  }
  document.body.style.overflowY = "hidden";
}


/**
 * close the edit overlay
 */
function closeEditOverlay() {
  let overlayDiv = document.getElementById('overlay-edit-task')
  overlayDiv.classList.remove('overlay-edit');
  document.body.style.overflowY = "auto";
}


/**
 * close the pop overlay
 */
function closePopOverlay() {
  let overlayDiv = document.getElementById('addtask-tem')
  overlayDiv.classList.remove('overlay-edit');
  document.body.style.overflowY = "auto";
}


/**
 * toggle the checkboxen the subtask
 * @param {*} firebaseId 
 * @param {*} completed 
 * @param {*} id 
 */
async function toggleSubtask(firebaseId, completed, id) {
  try {
    task[0].subtasks[id].completed = !completed;
    await updateTask(task[0]);
    await showEditTask(task[0].firebaseId, 'bigCard');
  } catch (error) {
   console.error('Fehler: ', error)
 }
}


/**
 * update the task
 *
 * @param {*} editCard 
 */
async function updateTask(editCard) {
  try {
    const updatedData = {
      "cat": editCard.cat,
      "user": editCard.user,
      "type": editCard.type,
      "descr": editCard.descr,
      "date": editCard.date,
      "prio": editCard.prio,
      "subtasks": editCard.subtasks,
      "title": editCard.title
    };
    let response = await fetch(BASE_URL + "tasks/" + editCard.firebaseId + ".json", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData)
    });
    await loadingTasks();
  } catch (error) {
      console.error('Fehler:', error);
  }
}


/**
 * delete the task
 * @param {*} id 
 */
async function deleteTask(id) {
  let url = BASE_URL + "tasks/" + id + "/" + ".json";
  let response = await fetch(url, {
      method: "DELETE"
  });
  let data = await response.json();
  await loadingTasks();
  await closeEditOverlay();
}


/**
 * filter function for the search Input
 * @returns 
 */
function filterTasks(searchInput) {
  let searchTerm = searchInput.value;
  if (searchTerm == '') {
    closeFilteredTasks()
    loadingTasks();
    return;
  }
  const filteredTasks = tasksArray.filter(task => { 
    if((task.title.toLowerCase().includes(searchTerm.toLowerCase())) || (task.descr.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return task;
    }
  });
  if(filteredTasks == 0) {
    loadFilteredTasks();
  } else {
    closeFilteredTasks();
    renderFilteredTasks(filteredTasks);
  }
}


/**
 * render the filtered tasks
 * @param {*} filteredTasks 
 */
function renderFilteredTasks(filteredTasks) {
  const todoContainer = document.getElementById('todo-container');
  const progressContainer = document.getElementById('progress-container');
  const awaitContainer = document.getElementById('await-container');
  const doneContainer = document.getElementById('done-container');

  [todoContainer, progressContainer, awaitContainer, doneContainer].forEach(container => container.innerHTML = '');

  filteredTasks.forEach(task => {
      if (task.type === 'awaiting') {
        const container = document.getElementById(`await-container`);
        let subtask = subtaskCal(task.subtasks);
        container.innerHTML += renderTaskCard(task, subtask);
      } else {
        const container = document.getElementById(`${task.type}-container`);
        let subtask = subtaskCal(task.subtasks);
        container.innerHTML += renderTaskCard(task, subtask);
      }
  });
}


/**
 * load the filter banner
 */
function loadFilteredTasks() {
  let taskContainer = document.getElementById('container-tasker')
  let overlayNotTaskFind = document.getElementById('overlay-not-task-find')
  overlayNotTaskFind.classList.remove('d-none')
  overlayNotTaskFind.innerHTML = renderNotFindTask();
  taskContainer.classList.add('d-none')
}


/**
 * close the filter banner
 */
function closeFilteredTasks() {
  let taskContainer = document.getElementById('container-tasker')
  let overlayNotTaskFind = document.getElementById('overlay-not-task-find')
  overlayNotTaskFind.classList.add('d-none')
  overlayNotTaskFind.innerHTML = renderNotFindTask();
  taskContainer.classList.remove('d-none')
}


/**
 * show the overlay for new Task
 * @param {*} type 
 * @returns 
 */
async function showAddTaskDetails(type) {
  try {
      if (window.innerWidth <= 826) {
        sessionStorage.setItem('taskType', type);
        window.location.href = "../add-task/add-task.html";
      }else {
        sessionStorage.setItem('taskType', type);
        let template = await getAddTask(type); 
        document.getElementById('addtask-tem').innerHTML = template;
        document.getElementById('addtask-tem').classList.add('overlay-edit');
        document.getElementById('popup-btn').classList.remove('d-none');
        await getAssignedUsers();
        document.body.style.overflowY = "hidden";
      }
      return true;
  } catch (error) {
      return false;
  }
}