document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');

    function addTask() {
        const taskText = taskInput.value;

        if (taskText.trim() !== '') {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${taskText}</span>
                <button class="editTask">Edit</button>
                <button class="deleteTask">Delete</button>
            `;
            taskList.appendChild(listItem);
            taskInput.value = '';

            const deleteButton = listItem.querySelector('.deleteTask');
            deleteButton.addEventListener('click', function() {
                listItem.remove();
                updateLocalStorage(); // Update local storage after deletion
            });

            const editButton = listItem.querySelector('.editTask');
            editButton.addEventListener('click', function() {
                const taskTextElement = listItem.querySelector('span');
                const updatedText = prompt('Edit task:', taskTextElement.textContent);

                if (updatedText !== null && updatedText.trim() !== '') {
                    taskTextElement.textContent = updatedText;
                    updateLocalStorage(); // Update local storage after editing
                }
            });

            updateLocalStorage(); // Update local storage after addition
        }
    }

    function updateLocalStorage() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(function(item) {
            tasks.push(item.querySelector('span').textContent);
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(function(taskText) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${taskText}</span>
                <button class="editTask">Edit</button>
                <button class="deleteTask">Delete</button>
            `;
            taskList.appendChild(listItem);
        });
    }

    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    loadTasks(); // Load tasks from local storage on page load
});
