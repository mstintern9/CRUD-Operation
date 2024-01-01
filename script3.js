// Display Date
function displayDate() {
  let date = new Date();
  date = date.toString().split(" ");
  document.querySelector("#date").innerHTML =
    date[0] + " " + date[2] + " " + date[3];
}
displayDate();

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
  }
});

// It will show the table row with buttons and tasks
function showtask() {
  let html = "";
  let mytable = document.getElementById("myTable");
  itemsArray.forEach((item, index) => {
    html += ` <tr>
    <th>${index + 1}</th>
    <td>${item}</td>
    <td> <button class="button" onclick="edittask(${index})" id="edit"><i class="fa-regular fa-pen-to-square"></i></button> <button class="button" id="del" onclick="deletetask(${index})" ><i class="fa-solid fa-trash"></i></button> </td>
  </tr>`;
  });
  mytable.innerHTML = html;
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

// Delete task
function deletetask(index) {
  itemsArray.splice(index, 1);
  showtask();
}
