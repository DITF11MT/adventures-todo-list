const addTaskForm = document.getElementById('add-task-form');
const taskList = document.getElementById('task-list'); // Updated to get task list container

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBCRiqMFangyXVtmrqZhQmbPQoMRPtaJQQ",
    authDomain: "adventures-todo-list.firebaseapp.com",
    databaseURL: "https://adventures-todo-list-default-rtdb.firebaseio.com",
    projectId: "adventures-todo-list",
    storageBucket: "adventures-todo-list.appspot.com",
    messagingSenderId: "795870805575",
    appId: "1:795870805575:web:eddd0c7cdb0dd2dde3bb62"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function addTaskToFirebase(taskTitle, dueDate) {
    const taskRef = database.ref('tasks');
    const newTaskRef = taskRef.push();

    newTaskRef.set({
        title: taskTitle,
        dueDate: dueDate,
        isChecked: false // Initialize as unchecked
    });
}

function createTaskItem(taskKey, taskTitle, dueDate, isChecked) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isChecked;

    const label = document.createElement('label');
    label.textContent = taskTitle;

    const dueDateSpan = document.createElement('span');
    dueDateSpan.textContent = `Due: ${dueDate}`;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button'); // Add the delete-button class
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.addEventListener('click', () => {
        const confirmed = confirm('Are you sure you want to delete this task?');
        if (confirmed) {
            deleteTaskFromFirebase(taskKey);
            showLoader();
        }
    });

    taskItem.appendChild(checkbox);
    taskItem.appendChild(label);
    taskItem.appendChild(dueDateSpan);
    taskItem.appendChild(deleteButton);

    return taskItem;
}



function handleCheckboxChange(event) {
    const checkbox = event.target;
    const taskItem = checkbox.closest('.task');

    if (checkbox.checked) {
        taskItem.classList.add('completed');
    } else {
        taskItem.classList.remove('completed');
    }
}

// Function to retrieve tasks from Firebase
function loadTasksFromFirebase() {
    showLoader();
    const taskRef = database.ref('tasks');

    taskRef.on('value', (snapshot) => {
        taskList.innerHTML = ''; // Clear the current task list

        snapshot.forEach((childSnapshot) => {
            const taskKey = childSnapshot.key;
            const task = childSnapshot.val();
            const taskItem = createTaskItem(taskKey, task.title, task.dueDate, task.isChecked);
            taskList.appendChild(taskItem);

            // Attach event listener to the new task's checkbox
            const checkbox = taskItem.querySelector('input[type="checkbox"]');
            const taskElement = checkbox.closest('.task');

            if (checkbox.checked) {
                taskElement.classList.add('completed');
            } else {
                taskElement.classList.remove('completed');
            }
            checkbox.addEventListener('change', () => {
                markTaskAsDoneInFirebase(taskKey, checkbox.checked, checkbox);
            });
        });
        hideLoader();
    });
}


function deleteTaskFromFirebase(taskKey) {
    const taskRef = database.ref('tasks').child(taskKey);

    taskRef.remove()
        .then(() => {
            // Task successfully deleted
            hideLoader();
        })
        .catch((error) => {
            console.error('Error deleting task:', error);
            hideLoader();
        });
}


// Function to mark a task as done in Firebase
function markTaskAsDoneInFirebase(taskKey, isChecked, checkbox) {
    const taskRef = database.ref('tasks').child(taskKey);

    taskRef.update({
        isChecked: isChecked
    });
}

// Call loadTasksFromFirebase when the page loads
window.addEventListener('load', () => {
    loadTasksFromFirebase();
});

// Attach event listener to the add task form
addTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const taskTitleInput = document.getElementById('task-title');
    const dueDateInput = document.getElementById('due-date');

    if (taskTitleInput.value.trim() === '') {
        alert('Please enter a task title.');
        return;
    }

    if (dueDateInput.value.trim() === '') {
        alert('Please enter a due date.');
        return;
    }

    addTaskToFirebase(taskTitleInput.value, dueDateInput.value);

    taskTitleInput.value = '';
    dueDateInput.value = '';
});


// Show the loader
function showLoader() {
    document.querySelector('.loader-container').style.display = 'flex';
}

// Hide the loader
function hideLoader() {
    document.querySelector('.loader-container').style.display = 'none';
}