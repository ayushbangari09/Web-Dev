function addTask(){

let input = document.getElementById("taskInput");
let taskText = input.value.trim();

if(taskText === ""){
alert("Please enter a task!");
return;
}

let li = document.createElement("li");

let checkbox = document.createElement("input");
checkbox.type="checkbox";

let span = document.createElement("span");
span.textContent = taskText;
span.className="task-text";

checkbox.onclick = function(){
span.classList.toggle("completed");
updateCount();
}

let actionDiv = document.createElement("div");
actionDiv.className="actions";

let editBtn = document.createElement("button");
editBtn.textContent="Edit";
editBtn.className="edit";

editBtn.onclick=function(){
let newTask = prompt("Edit task:", span.textContent);
if(newTask !== null && newTask.trim() !== ""){
span.textContent = newTask;
}
}

let deleteBtn = document.createElement("button");
deleteBtn.textContent="Delete";
deleteBtn.className="delete";

deleteBtn.onclick=function(){
li.remove();
updateCount();
}

actionDiv.appendChild(editBtn);
actionDiv.appendChild(deleteBtn);

li.appendChild(checkbox);
li.appendChild(span);
li.appendChild(actionDiv);

document.getElementById("taskList").appendChild(li);

input.value="";

updateCount();
}

function updateCount(){

let tasks = document.querySelectorAll("#taskList li");
let completed = document.querySelectorAll(".completed").length;

document.getElementById("completed").textContent = completed;
document.getElementById("pending").textContent = tasks.length - completed;

}
