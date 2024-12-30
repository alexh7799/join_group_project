const BASE_URL = "https://join-c39f7-default-rtdb.europe-west1.firebasedatabase.app/";

let tasksArray = [];

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
    renderNoTask('todo-container')
  }

  if(progressTasks.length > 0) {
    renderTasks('progress-container', progressTasks);
  }else {
    renderNoTask('progress-container')
  }

  if(awaitingTasks.length > 0) {
    renderTasks('await-container', awaitingTasks);
  }else {
    renderNoTask('await-container')
  }

  if(doneTasks.length > 0) {
    renderTasks('done-container', doneTasks);
  }else {
    renderNoTask('done-container')
  }  
}

function renderTasks(containerId, tasks) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  tasks.forEach(task => {
      container.innerHTML += renderTaskCard(task);
  });
}

function renderNoTask(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  container.innerHTML += renderNoTaskCard();
}