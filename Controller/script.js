/**
 * Initialize the app
 */
var enterButton = document.getElementById("enter");
var input = document.getElementById("userInput");
var ul = document.getElementById("listTasks");

// localStorage.removeItem("tasks");
function init() {
  addTaskToList();
  displayTasks();
  taskCompleted();
}
init();

//Get input length
function inputLength() {
  return input.value.length;
}

//Get the input value
function getInputValue() {
  return input.value;
}

//Clear input
function clearInput() {
  input.value = "";
}

// Create the element to append to the list
function createTaskElement(text, index) {
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(text));
  var buttn = document.createElement("button");
  buttn.appendChild(document.createTextNode("X"));
  buttn.id = index;
  buttn.addEventListener("click", function(event) {
    deleteItem(event);
  });
  li.appendChild(buttn);
  // Add an id
  li.id = index;
  // Add to the current list
  ul.appendChild(li);
}

// Get the local Storage tasks array
function getLocalStorageItem(item) {
  if (localStorage.getItem(item) === null) {
    var tasks = JSON.stringify([]);
    localStorage.setItem("tasks", tasks);
  }
  return JSON.parse(localStorage.getItem(item));
}

// Add Element to the list.
function addTaskToList() {
  enterButton.addEventListener("click", function() {
    if (getInputValue() === "") {
      alert("Please, enter a task");
    } else {
      var newList = getLocalStorageItem("tasks");
      newList.push(getInputValue());
      localStorage.setItem("tasks", JSON.stringify(newList));
      clearInput();
      displayTasks();
    }
  });
}

// Display List of Tasks
function displayTasks() {
  var taskArray = getLocalStorageItem("tasks");
  // Delete the current list
  ul.innerHTML = "";
  // Display the list
  for (let index = 0; index < taskArray.length; index++) {
    createTaskElement(taskArray[index], index);
  }
}

// Delete Item
function deleteItem(event) {
  console.log(event.target.id);
  // Get the id of the element to delete.
  var taskIndex = event.target.id;
  // Remove tge element from the array
  var newList = getLocalStorageItem("tasks");
  newList.splice(taskIndex, 1);
  // Store the array in the local storage
  localStorage.setItem("tasks", JSON.stringify(newList));
  displayTasks();
}

// Task Completed
function taskCompleted() {
  ul.addEventListener("click", function(event) {
    //Check to click an "LI" on the "UL"
    if (event.target.tagName === "LI") {
      // Assign the task as completed.
      if (event.target.className === "done") {
        event.target.className = "";
      } else {
        event.target.className = "done";
      }
    }
  });
}
// Associate Arrays Example
var associArray = {};
associArray["important"] = "First Task";
associArray["SuperImportant"] = "Second Task";
associArray["Not Important"] = "Third Task";
localStorage.setItem("associative", JSON.stringify(associArray));
console.log(localStorage.getItem("associative"));

// Object Example
var objectExp = {
  name: "Carl",
  Important: "This task",
  other: "Not important"
};

localStorage.setItem("Object", JSON.stringify(objectExp));
console.log(localStorage.getItem("Object"));
