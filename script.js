const taskInput = document.querySelector('input#txttask')
const addButton = document.querySelector('button#addbtn')
const taskList = document.querySelector('ul.task-list')

function addTask() {
    const taskText = taskInput.value.trim()

    if (!taskText) {
        alert("Por favor, digite uma tarefa!");
        return;
    }

    const taskItem = document.createElement('li')
    taskItem.innerHTML = `
        <div class="task">
            <input type="checkbox" class="task-checkbox">
            <span>${taskText}</span>
        </div>
        <span class="delete-task">&#215;</span>
    `;
    taskList.appendChild(taskItem)
    taskInput.value = "";
    updateTaskCount();
}

taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-task')) {
        e.target.parentElement.remove()
        updateTaskCount();
    }
})

function updateTaskCount() {
    const totalTasks = taskList.querySelectorAll('li').length;
    document.querySelector('.footer span').textContent = `${totalTasks} tasks`;
}

document.querySelector('.footer button').addEventListener('click', () => {
    taskList.innerHTML = '';
    updateTaskCount();
})

taskList.addEventListener('change', (e) => {
    if (e.target.classList.contains('task-checkbox')) {
        const taskText = e.target.nextElementSibling;
        if (e.target.checked) {
            taskText.style.textDecoration = 'line-through'; 
            taskText.style.color = '#8d8d8d';
        } else {
            taskText.style.textDecoration = 'none';
            taskText.style.color = '';
        }
    }
})