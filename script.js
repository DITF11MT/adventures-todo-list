// Get references to HTML elements
const addTaskForm = document.getElementById('add-task-form');
const taskList = document.getElementById('task-list'); // Updated to get task list container

// Function to create a new task item
function createTaskItem(taskTitle, dueDate, isChecked) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isChecked;

    const label = document.createElement('label');
    label.textContent = taskTitle;

    const dueDateSpan = document.createElement('span');
    dueDateSpan.textContent = `Due: ${dueDate}`;

    taskItem.appendChild(checkbox);
    taskItem.appendChild(label);
    taskItem.appendChild(dueDateSpan);

    return taskItem;
}

// Function to add a new task
function addTask(event) {
    event.preventDefault();
    
    const taskTitleInput = document.getElementById('task-title');
    const dueDateInput = document.getElementById('due-date');

    if (taskTitleInput.value.trim() === '') {
        alert('Please enter a task title.');
        return;
    }

    const taskItem = createTaskItem(taskTitleInput.value, dueDateInput.value, false);
    taskList.appendChild(taskItem);

    taskTitleInput.value = '';
    dueDateInput.value = '';
}

// Attach event listener to the add task form
addTaskForm.addEventListener('submit', addTask);

// Function to handle checkbox change (marking a task as completed)
function handleCheckboxChange(event) {
    const checkbox = event.target;
    const taskItem = checkbox.closest('.task');

    if (checkbox.checked) {
        taskItem.classList.add('completed');
    } else {
        taskItem.classList.remove('completed');
    }
}

// Attach event listener to all task checkboxes
taskList.addEventListener('change', (event) => {
    if (event.target.matches('input[type="checkbox"]')) {
        handleCheckboxChange(event);
    }
});


// Array of todos
const todos = [
    { title: 'Go hiking in the mountains', dueDate: '2023-09-20', isChecked: true },
    { title: 'Explore a new city', dueDate: '2023-09-25', isChecked: true },
    { title: 'Visit a historical site', dueDate: '2023-10-10', isChecked: false },
    // Add more todos to the array
];

// Function to create a todo item
function createTodoItem(todo) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.isChecked;

    const label = document.createElement('label');
    label.textContent = todo.title;

    const dueDateSpan = document.createElement('span');
    dueDateSpan.textContent = `Due: ${todo.dueDate}`;

    taskItem.appendChild(checkbox);
    taskItem.appendChild(label);
    taskItem.appendChild(dueDateSpan);

    return taskItem;
}

// Function to render todos from the array
function renderTodos() {
    for (const todo of todos) {
        const taskItem = createTodoItem(todo);
        taskList.appendChild(taskItem);
    }
}

// Render todos when the page loads
window.addEventListener('load', () => {
    renderTodos();
});

// Attach event listener to the add task form
addTaskForm.addEventListener('submit', addTask);

// Function to handle checkbox change (marking a task as completed)
function handleCheckboxChange(event) {
    const checkbox = event.target;
    const taskItem = checkbox.closest('.task');

    if (checkbox.checked) {
        taskItem.classList.add('completed');
    } else {
        taskItem.classList.remove('completed');
    }
}

// Attach event listener to all task checkboxes
taskList.addEventListener('change', (event) => {
    if (event.target.matches('input[type="checkbox"]')) {
        handleCheckboxChange(event);
    }
});
