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
let datePicker = document.getElementById("datepicker");
let itemsArray = [];
let list = document.getElementById("list");
let itemId;
let itemIdCounter = 0;
addTask.addEventListener("click", function () {
  let inputVal = input.value;
  let datePickerVal = datePicker.value;
  if (!inputVal || !datePickerVal) {
    alert("Please enter a task");
  } else {
    const itemArray = {
      name: inputVal,
      date: datePickerVal,
      status: "Pending",
      id: Math.max(...itemsArray.map((item) => item.id), itemIdCounter),
      check: false,
    };
    itemsArray.push(itemArray);
    itemIdCounter = itemArray.id + 1;
    input.value = "";
    datePicker.value = "";
    showTask();
  }
});

// CHECK FUNCTION
function check1(id) {
  let checkBox = document.getElementById(`checkBox-${id}`);
  let del1 = document.getElementById(`del-${id}`);
  let edit = document.getElementById(`edit-${id}`);
  let textElement = document.getElementById(`text-${id}`);
  let dateElement = document.getElementById(`date2-${id}`);
  let statusElement = document.getElementById(`status-${id}`);
  if (checkBox.checked) {
    textElement.style.textDecoration = "line-through";
    textElement.style.textDecorationThickness = "2px";
    textElement.style.textDecorationColor = "red";
    dateElement.style.textDecoration = "line-through";
    dateElement.style.textDecorationThickness = "2px";
    dateElement.style.textDecorationColor = "red";
    statusElement.innerHTML = "Completed";
    // Assuming you want to update the 'check' property of the corresponding item in the itemsArray
    let filterArray = itemsArray.filter((item) => item.id === id);
    filterArray[0].check = true;
    filterArray[0].status = "Completed";
    // Assuming you want to disable the edit button
    edit.disabled = true;
    del1.disabled = true;
    checkBox.disabled = true;
    addTask.style.display = "block";
    saveTask.style.display = "none";
    input.value = "";
    datePicker.value = "";
  }
}

// SHOW TASK
function showTask() {
  let html = "";
  let myTable = document.getElementById("myList");
  itemsArray.forEach((itemsArray) => {
    let listId = `list-${itemsArray.id}`;
    let textId = `text-${itemsArray.id}`;
    let statusId = `status-${itemsArray.id}`;
    let dateId = `date2-${itemsArray.id}`;
    let deleteBtnId = `del-${itemsArray.id}`;
    let editBtnId = `edit-${itemsArray.id}`;
    let checkboxId = `checkBox-${itemsArray.id}`;
    let textStyles =
      itemsArray.check === true
        ? "text-decoration: line-through; text-decoration-thickness: 2px; text-decoration-color: red;"
        : "";
    let dateStyles =
      itemsArray.check === true
        ? "text-decoration: line-through; text-decoration-thickness: 2px; text-decoration-color: red;"
        : "";
    let disableButton = itemsArray.check ? "disabled" : "";

    html += `
    <ul class="main-list">
      <li id="${listId}">
        <span id="${textId}" class="text" style="${textStyles}">${
      itemsArray.name
    }</span>
        <span id="${statusId}" class="text">${itemsArray.status}</span>
        <span id="${dateId}" class="date" style="${dateStyles}">${
      itemsArray.date
    }</span>
        <div class="btn3">
          <button class="btn2 deletebtn" id="${deleteBtnId}" onclick="deleteTask(${
      itemsArray.id
    })" ${disableButton}>
            <i class="fa-solid fa-trash"></i>
          </button> 
          <button class="btn1" onclick="editTask(${
            itemsArray.id
          })" id="${editBtnId}" ${disableButton}>
            <i class="fa-solid fa-pen"></i>
          </button>
        </div>
      </li>
      <input onclick="check1(${
        itemsArray.id
      })" ${disableButton} type="checkbox" id="${checkboxId}" ${
      itemsArray.check ? "checked" : ""
    }>
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

// EDIT TASK FUNCTION
function editTask(id) {
  let input = document.getElementById("input-text");
  let saveIndex = id; // Set saveIndex to the provided index
  let addTask = document.getElementById("addTask");
  let saveTask = document.getElementById("saveTask");
  let filterArray = itemsArray.filter((item) => item.id === id);
  if (filterArray.length > 0) {
    input.value = filterArray[0].name;
    datePicker.value = filterArray[0].date;
    input.setAttribute("data-hidden", saveIndex); // Set the data hidden attribute to saveIndex
    addTask.style.display = "none";
    saveTask.style.display = "block";
  }
}

// UPDATE TASK FUNCTION
function saveTaskFunction(id) {
  let input = document.getElementById("input-text");
  let saveTask = document.getElementById("saveTask");
  let addTask = document.getElementById("addTask");
  let filterArray = itemsArray.filter((item) => item.id == id);
  if (filterArray.length > 0) {
    filterArray[0].name = input.value;
    filterArray[0].date = datePicker.value;
    addTask.style.display = "block";
    saveTask.style.display = "none";
    input.value = "";
    datePicker.value = "";
    showTask();
  }
}
// Use of the saveTask event listener with saveIndex
let saveTask = document.getElementById("saveTask");
saveTask.addEventListener("click", () => {
  let saveIndex = input.getAttribute("data-hidden");
  saveTaskFunction(saveIndex);
});

// DeleteTask function that takes index from itemsArray and then decrements the itemsArray length and deletes the index value
function deleteTask(id) {
  itemsArray = itemsArray.filter((item) => item.id !== id);
  input.value = "";
  datePicker.value = "";
  let addTask = document.getElementById("addTask");
  let saveTask = document.getElementById("saveTask");
  addTask.style.display = "block";
  saveTask.style.display = "none";
  showTask();
}
