let draggedTaskId;


/**
 * event handler for drag and drop
 * @param {*} event 
 */
function allowDrop(event) {
    event.preventDefault();
}


/**
 * drag event handler
 * @param {*} taskId 
 */
function handleDrag(taskId) {
    const element = document.getElementById(`task${taskId}`);
    element.classList.add('dragging');
    draggedTaskId = taskId;
}


/**
 * drag end event handler
 * @param {*} event 
 * @param {*} taskId 
 */
function handleDragEnd(event, taskId) {
    const element = document.getElementById(`task${taskId}`);
    element.classList.remove('dragging');
}


/**
 * drag leave event handler
 * @param {*} id 
 */
function handleDragLeave(id) {
    document.getElementById(id).classList.remove('drag-over');
}

/**
 * adds an border to the selected/aktive div.
 *
 * @param {number} id
 */
function handleDragOver(id) {
    document.getElementById(id).classList.add("drag-over");
}
  

/**
 * event handler for the drop action
 * @param {*} event 
 * @param {*} newType 
 */
async function handleDrop(event, newType) {
    const taskId = draggedTaskId;
    fetchNewType(event, newType, taskId)
}



/**
 * fetch function for the type
 * @param {*} event 
 * @param {*} newType 
 * @param {*} taskId 
 */
async function fetchNewType(event, newType, taskId) {
    event.preventDefault();
    
    try {
        await fetch(BASE_URL + "tasks/" + taskId + ".json", {
            method: 'PATCH',
            body: JSON.stringify({ type: newType })
        });

        await loadingTasks();
    } catch (error) {
        console.error('Error updating task:', error);
    }
}