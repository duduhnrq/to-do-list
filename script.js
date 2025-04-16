const taskInput = document.querySelector('input#txttask')
const addButton = document.querySelector('button#addbtn')
const taskList = document.querySelector('ul.task-list')
const filterButtons = document.querySelectorAll('.filter-btn')

function addTask() {
    const taskText = taskInput.value.trim()

    if (!taskText) {
        alert("Por favor, digite uma tarefa!");
        return;
    }

    const taskItem = document.createElement('li')
    taskItem.innerHTML = `
        <div class="task-container">
            <div class="task">
                <input type="checkbox" class="task-checkbox">
                <span>${taskText}</span>
            </div>
            <span class="delete-task">&#215;</span>
        </div>
    `;
    taskList.appendChild(taskItem)
    taskInput.value = "";
    updateTaskCount();
    saveTasks()
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const allTasks = document.querySelectorAll('.task-container')
        const deleteTask = document.querySelector('.delete-task')
        const filter = button.dataset.filter;

        allTasks.forEach(task => {
            const checkbox = task.querySelector('.task-checkbox');
            const isCompleted = checkbox.checked;

            if (filter === 'all') {
                task.style.display = 'flex';
            } else if (filter === 'pending' && !isCompleted) {
                task.style.display = 'flex';
            } else if (filter === 'completed' && isCompleted) {
                task.style.display = 'flex';
            } else {
                task.style.display = 'none';
            }
        })
    })
})

taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-task')) {
        e.target.closest('li').remove();
        updateTaskCount();
        saveTasks();
    }
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
        saveTasks();
    }
})

function updateTaskCount() {
    const totalTasks = taskList.querySelectorAll('li').length;
    document.querySelector('.footer span').textContent = `${totalTasks} tasks`;
}

document.querySelector('.footer button').addEventListener('click', () => {
    taskList.innerHTML = '';
    updateTaskCount();
    saveTasks();
})

taskInput.addEventListener('keypress', (e) => { //
    if (e.key === 'Enter') {
        addTask()
    }
})

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task-list li').forEach(task => {
        tasks.push({
            text: task.querySelector('span').textContent,
            completed: task.querySelector('.task-checkbox').checked
        })
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(taskData => {
        const newTask = document.createElement('li');
        newTask.innerHTML = `
            <div class="task-container">
                    <div class="task">
                        <input type="checkbox" class="task-checkbox" ${taskData.completed ? 'checked' : ''}>
                        <span>${taskData.text}</span>
                    </div>
                <span class="delete-task">&#215;</span>
            </div>
        `;

        if (taskData.completed) {
            newTask.querySelector('span').style.textDecoration = 'line-through';
            newTask.querySelector('span').style.color = '#8d8d8d';
        }

        taskList.appendChild(newTask);
    })
    updateTaskCount();
}

document.addEventListener('DOMContentLoaded', loadTasks);