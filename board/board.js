const BASE_URL = "https://join-c39f7-default-rtdb.europe-west1.firebasedatabase.app/";

let tasksArray = [];
let editedTask = [];

async function initBoard() {
  checkLogin();
  includeHTML();
  checkLink();
  generateInitials();
  await loadingTasks()
}

async function loadingTasks() {
  try {
      let response = await fetch(BASE_URL + "tasks/" + ".json");
      let tasks = await response.json();
      tasksArray = Object.entries(tasks).map(([key, tasks]) => ({
          ...tasks,
          firebaseId: key  // Add Firebase key to user object
      }));
      await decideCardType() 
  } catch (error) {
      console.error('Fehler:', error);
  }
}

function decideCardType() {
  let todoTasks = tasksArray.filter(task => task.type === 'todo');
  let progressTasks = tasksArray.filter(task => task.type === 'progress');
  let awaitingTasks = tasksArray.filter(task => task.type === 'awaiting');
  let doneTasks = tasksArray.filter(task => task.type === 'done');

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

function renderTasks(containerId, tasks) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  tasks.forEach(task => {
    if (task.subtasks != undefined) {
      let subtask = subtaskCal(task.subtasks);
      container.innerHTML += renderTaskCard(task, subtask);
    } else {
      container.innerHTML += renderTaskCard(task, 0);
    }
  });
}

function renderNoTask(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  container.innerHTML += renderNoTaskCard();
}

function textTrimmer(text, textLength) {
  return text.length > textLength ? text.substring(0, textLength) + "..." : text;
}

function subtaskCal(task) {
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

function closeEditOverlay() {
  let overlayDiv = document.getElementById('overlay-edit-task')
  overlayDiv.classList.remove('overlay-edit');
  document.body.style.overflowY = "auto";
}

function closePopOverlay() {
  let overlayDiv = document.getElementById('addtask-tem')
  overlayDiv.classList.remove('overlay-edit');
  document.body.style.overflowY = "auto";
}

async function toggleSubtask(firebaseId, completed, id) {
  try {
    task[0].subtasks[id].completed = !completed;
    await updateTask(task[0]);
    await showEditTask(task[0].firebaseId, 'bigCard');
  } catch (error) {
   console.error('Fehler: ', error)
 }
}

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

async function deleteTask(id) {
  let url = BASE_URL + "tasks/" + id + "/" + ".json";
  let response = await fetch(url, {
      method: "DELETE"
  });
  let data = await response.json();
  await loadingTasks();
  await closeEditOverlay();
}


function filterTasks() {
  let searchTerm = document.getElementById("find-task-input").value;

  
  if (searchTerm === '') {
      loadingTasks(); // Alle Tasks neu laden
      return;
  }

  const filteredTasks = tasksArray.filter(task => 
      task.title.toLowerCase().includes(searchTerm) || 
      task.descr.toLowerCase().includes(searchTerm)
  );

  renderFilteredTasks(filteredTasks);
}

function renderFilteredTasks(filteredTasks) {
  const todoContainer = document.getElementById('todo-container');
  const progressContainer = document.getElementById('progress-container');
  const awaitContainer = document.getElementById('await-container');
  const doneContainer = document.getElementById('done-container');

  // Container leeren
  [todoContainer, progressContainer, awaitContainer, doneContainer]
      .forEach(container => container.innerHTML = '');

  // Gefilterte Tasks nach Status sortieren und rendern
  filteredTasks.forEach(task => {
      const container = document.getElementById(`${task.type}-container`);
      if (container) {
          container.innerHTML += renderTaskCard(task);
      }
  });
}

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
        document.body.style.overflowY = "hidden";
      }
      return true;
  } catch (error) {
      return false;
  }
}

