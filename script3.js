// Display Date
function displayDate() {
  let date = new Date();
  date = date.toString().split(" ");
  document.querySelector("#date").innerHTML =
    date[0] + " " + date[2] + " " + date[3];
}
displayDate();

document.getElementById("mylist").style.backgroundColor = "#f8f8ff";

// Getting Elements by id reference
let input = document.getElementById("input-text");
let addtask = document.getElementById("addtask");
let itemsArray = [];

// For add Button that will add the push the task into empty array
addtask.addEventListener("click", function () {
  inputval = input.value;
  if (!inputval) {
    alert("Please enter a task");
  } else {
    itemsArray.push(inputval);
    input.value = "";
    showtask();
    console.log(itemsArray);
  }
});

// It will show the table row with buttons and tasks
function showtask() {
  let html = "";

  let mytable = document.getElementById("mylist");
  itemsArray.forEach((item, index) => {
    html += ` 
    <ul class="main-list">
      <li id="list">
       <div class="text">${item}</div>
        <div class="btn3"><button class="btn2 deletebtn" id="del" onclick="deletetask(${index})" ><i class="fa-solid fa-trash"></i></button> <button class="btn1" onclick="edittask(${index})" id="edit"><i class="fa-solid fa-pen"></i></button> </div>
      </li>
    </ul>`;
  });
  // Used this so task container can have same color as body
  mytable.innerHTML = html;
  if (!html) {
    mytable.style.backgroundColor = "#f8f8ff";
  } else {
    mytable.style.backgroundColor = "#ecedf6";
  }
}

// Edit Task
function edittask(index) {
  let saveindex = document.getElementById("saveindex");
  let addtask = document.getElementById("addtask");
  let savetask = document.getElementById("savetask");
  saveindex.value = index;
  input.value = itemsArray[index];
  addtask.style.display = "none";
  savetask.style.display = "block";
}

// save index is used to save the corresponding value to input
let savetask = document.getElementById("savetask");
savetask.addEventListener("click", () => {
  let saveindex = document.getElementById("saveindex").value;
  itemsArray[saveindex] = input.value;
  addtask.style.display = "block";
  savetask.style.display = "none";
  input.value = "";
  showtask();
});

function deletetask(index) {
  let newArray = [];
  for (let i = 0; i < itemsArray.length; i++) {
    if (index !== i) {
      newArray[newArray.length] = itemsArray[i];
    }
  }
  itemsArray = newArray;
  showtask();
}