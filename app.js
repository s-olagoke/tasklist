// define UI Vars
const form = document.querySelector('#task-form'),
      taskList = document.querySelector('.collection'),
      clearBtn = document.querySelector('.clear-tasks'),
      filter = document.querySelector('#filter');
      taskInput = document.querySelector('#task');


// Load all event listenters
loadEventListeners();

// Load all event Listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // add task
  form.addEventListener('submit', addTask);
  // remove Task
  taskList.addEventListener('click', removeTask);
  // clear task
  clearBtn.addEventListener('click', clearTasks);
  // Filter task
  filter.addEventListener('keyup', filterTasks)


}

// Add task
function addTask(e) {

  if (taskInput.value === '') {
    alert('Add a task');
  } else {

    
      // Create li element
      const li = document.createElement('li');
    
      // Add class
      li.className = 'collection-item';
    
      // Create text node and append to the li
      li.appendChild(document.createTextNode(taskInput.value));
    
      // Create new link
      const link = document.createElement('a');
    
      // add class
      link.className = 'delete-item secondary-content';
    
      // Add icon html
      link.innerHTML = `<i class="fas fa-window-close"></i>`;
    
      // Append the link to li
      li.appendChild(link);
    
      // append li to ul
      taskList.appendChild(li);

      // store in localstorage
      storeTaskInLocalStorage(taskInput.value);
    
      // Clear input
      taskInput.value = ''; 
  }

  e.preventDefault();
}

// Add to localStorage
function storeTaskInLocalStorage(task) {
  let tasks;

  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
  console.log(tasks)
}

// Get Task from localstorage
function getTasks() {
  let tasks;

  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task) {
    // Create li element
    const li = document.createElement('li');
    
    // Add class
    li.className = 'collection-item';
  
    // Create text node and append to the li
    li.appendChild(document.createTextNode(task));
  
    // Create new link
    const link = document.createElement('a');
  
    // add class
    link.className = 'delete-item secondary-content';
  
    // Add icon html
    link.innerHTML = `<i class="fas fa-window-close"></i>`;
  
    // Append the link to li
    li.appendChild(link);
  
    // append li to ul
    taskList.appendChild(li);
  });
}


// Remove task
function removeTask(e) {
  
  if (e.target.parentElement.classList.contains('delete-item')) {

    if(confirm('Are you sure?') ){
      e.target.parentElement.parentElement.remove();

      // remove task from local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove task from local storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;

  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index) {
    if(taskItem.textContent === task) {
      tasks.splice(index, 1)
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// clear task
function clearTasks() {

  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  clearTasksFromLocalStorage();

}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// FIlter tasks
function filterTasks(e) {

  const text = e.target.value.toLowerCase();

  // Select all list items
  document.querySelectorAll('.collection-item').forEach(function(task) {
    const item = task.firstChild.textContent
   

    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display ='none'
    }
      });
}

