// Display Date
function displayDate() {
  let date = new Date();
  date = date.toString().split(" ");
  document.querySelector("#date").innerHTML =
    date[0] + " " + date[2] + " " + date[3];
}
displayDate();

document.getElementById("myList").style.backgroundColor = "#f8f8ff";

// Getting Elements by id reference
let input = document.getElementById("input-text");
let addTask = document.getElementById("addTask");
let itemsArray = [];
let index = 0;

// For add Button that will add the push the task into empty array
addTask.addEventListener("click", function () {
  inputVal = input.value;
  if (!inputVal) {
    alert("Please enter a task");
  } else {
    itemsArray.push(inputVal);
    input.value = "";
    showTask();
  }
});

// It will show the table row with buttons and tasks
function showTask() {
  let html = "";

  let myTable = document.getElementById("myList");
  itemsArray.forEach((item, index) => {
    html += ` 
    <ul class="main-list">
      <li id="list">
       <div class="text">${item}</div>
        <div class="btn3"><button class="btn2 deletebtn" id="del" onclick="deleteTask(${index})" ><i class="fa-solid fa-trash"></i></button> <button class="btn1" onclick="editTask(${index})" id="edit"><i class="fa-solid fa-pen"></i></button> </div>
      </li>
    </ul>`;
  });
  // Used this so task container can have same color as body
  myTable.innerHTML = html;
  if (!html) {
    myTable.style.backgroundColor = "#f8f8ff";
  } else {
    myTable.style.backgroundColor = "#ecedf6";
  }
}

// EditTask function to show save task button as block and to set the Attribute to saveIndex
function editTask(index) {
  let input = document.getElementById("input-text");
  let saveIndex = index; // Set saveIndex to the provided index
  let addTask = document.getElementById("addTask");
  let saveTask = document.getElementById("saveTask");
  input.value = itemsArray[index];
  input.setAttribute("data-hidden", saveIndex); // Set the data hidden attribute to saveIndex
  addTask.style.display = "none";
  saveTask.style.display = "block";
}

// Function to handle saveTask action
function saveTaskFunction(index) {
  let input = document.getElementById("input-text");
  let saveTask = document.getElementById("saveTask");
  let addTask = document.getElementById("addTask");
  itemsArray[index] = input.value;
  addTask.style.display = "block";
  saveTask.style.display = "none";
  input.value = "";
  showTask();
}

// Use of the saveTask event listener with saveIndex
let saveTask = document.getElementById("saveTask");
saveTask.addEventListener("click", () => {
  let input = document.getElementById("input-text");
  let saveIndex = input.getAttribute("data-hidden");
  saveTaskFunction(saveIndex);
});

// DeleteTask function that takes index from itemsArray and then decrements the itemsArray length and deletes the index value
function deleteTask(index) {
  for (let i = index; i < itemsArray.length - 1; i++) {
    index = i;
    break;
  }
  if (index !== -1) {
    for (let i = index; i < itemsArray.length - 1; i++) {
      itemsArray[i] = itemsArray[i + 1];
    }
    itemsArray.length--;
    addTask.style.display = "block";
    saveTask.style.display = "none";
    input.value = "";
  }
  showTask();
}
