let draggedTaskId;

function allowDrop(event) {
    event.preventDefault();
}

function handleDrag(taskId) {
    const element = document.getElementById(`task${taskId}`);
    element.classList.add('dragging');
    draggedTaskId = taskId;
}

function handleDragEnd(event, taskId) {
    const element = document.getElementById(`task${taskId}`);
    element.classList.remove('dragging');
}

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
  

async function handleDrop(event, newType) {
    event.preventDefault();
    const taskId = draggedTaskId;
    
    try {
        // Update Firebase
        await fetch(`${BASE_URL}tasks/${taskId}.json`, {
            method: 'PATCH',
            body: JSON.stringify({ type: newType })
        });
        
        // Update UI
        await loadingTasks();
    } catch (error) {
        console.error('Error updating task:', error);
    }
}