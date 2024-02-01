// Getting Elements by id reference
let input = document.getElementById("input-text");
let addTask = document.getElementById("addTask");
let saveTask = document.getElementById("saveTask");
let datePicker = document.getElementById("datepicker");
let itemsArray = [];
let list = document.getElementById("list");
let x = 0;

// Display Date
function displayDate() {
  let date = new Date();
  date = date.toString().split(" ");
  document.querySelector("#date").innerHTML =
    date[0] + " " + date[2] + " " + date[3];
}
displayDate();
document.getElementById("myList").style.backgroundColor = "#f8f8ff";
addTask.addEventListener("click", function () {
  let inputVal = input.value;
  let datePickerVal = datePicker.value;
  if (!inputVal || !datePickerVal) {
    alert("Please enter a task");
  } else {
    if (itemsArray.some((item) => item.name === inputVal)) {
      alert("Task already exists");
      return;
    }
    const itemArray = {
      name: inputVal,
      date: datePickerVal,
      status: "Pending",
      id: x,
      check: false,
    };
    itemsArray.push(itemArray);
    x = Math.max(...itemsArray.map((item) => item.id));
    x++;
    resetForm();
    showTask();
  }
});

// CHECK FUNCTION
function checkButton(id) {
  let divId = document.getElementById(`${id}`);
  let textElement = divId.firstElementChild.firstElementChild.childNodes[1];
  let dateElement = divId.firstElementChild.firstElementChild.childNodes[5];
  let statusElement = divId.firstElementChild.firstElementChild.childNodes[3];
  let deletebtn = divId.getElementsByTagName("div")[0].childNodes[1];
  let editBtn = divId.getElementsByTagName("div")[0].childNodes[3];
  let checkBtn = divId.getElementsByTagName("input")[0];
  if (checkBtn.checked) {
    textElement.style.textDecoration = "line-through";
    textElement.style.textDecorationThickness = "2px";
    textElement.style.textDecorationColor = "red";
    dateElement.style.textDecoration = "line-through";
    dateElement.style.textDecorationThickness = "2px";
    dateElement.style.textDecorationColor = "red";
    statusElement.innerHTML = "Completed";
    let filterArray = itemsArray.filter((item) => item.id === id);
    filterArray[0].check = true;
    filterArray[0].status = "Completed";
    checkBtn.disabled = true;
    deletebtn.disabled = true;
    editBtn.disabled = true;
    addTask.style.display = "block";
    saveTask.style.display = "none";
    resetForm();
  }
}

// SHOW TASK
function showTask() {
  let html = "";
  let myTable = document.getElementById("myList");
  itemsArray.forEach((itemsArray) => {
    let textStyles =
      itemsArray.check === true
        ? "text-decoration: line-through; text-decoration-thickness: 2px; text-decoration-color: red;"
        : "";
    let dateStyles =
      itemsArray.check === true
        ? "text-decoration: line-through; text-decoration-thickness: 2px; text-decoration-color: red;"
        : "";
    let disableButton = itemsArray.check ? "disabled" : "";
    html += `<div id="${itemsArray.id}">
    <ul class="main-list">
      <li>
        <span  class="text" style="${textStyles}">${itemsArray.name}</span>
        <span class="text">${itemsArray.status}</span>
        <span class="date" style="${dateStyles}">${itemsArray.date}</span>
        <div class="btn3">
          <button class="btn2 deletebtn"  onclick="deleteTask(${
            itemsArray.id
          })" ${disableButton}>
            <i class="fa-solid fa-trash"></i>
          </button> 
          <button class="btn1" onclick="editTask(${
            itemsArray.id
          })"  ${disableButton}>
            <i class="fa-solid fa-pen"></i>
          </button>
        </div>
      </li>
      <input onclick="checkButton(${
        itemsArray.id
      })" ${disableButton} type="checkbox"  ${
      itemsArray.check ? "checked" : ""
    }>
    </ul>
    </div>
    `;
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
  let saveIndex = id; // Set saveIndex to the provided index
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
  let filterArray = itemsArray.filter((item) => item.id == id);
  if (filterArray.length > 0) {
    filterArray[0].name = input.value;
    filterArray[0].date = datePicker.value;
    addTask.style.display = "block";
    saveTask.style.display = "none";
    resetForm();
    showTask();
  }
}
// Use of the saveTask event listener with saveIndex
saveTask.addEventListener("click", () => {
  let saveIndex = input.getAttribute("data-hidden");
  saveTaskFunction(saveIndex);
});

// DeleteTask function that takes index from itemsArray and then decrements the itemsArray length and deletes the index value
function deleteTask(id) {
  itemsArray = itemsArray.filter((item) => item.id !== id);
  resetForm();
  addTask.style.display = "block";
  saveTask.style.display = "none";
  showTask();
}

// Reset the form fields
function resetForm() {
  input.value = "";
  datePicker.value = "";
}
