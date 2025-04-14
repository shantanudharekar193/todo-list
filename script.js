let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();

  if (task === "") return;

  taskList.push({ text: task, completed: false });
  input.value = "";
  saveTasks();
  renderTasks();
}

function renderTasks() {
  const ul = document.getElementById("taskList");
  ul.innerHTML = "";

  let completedCount = 0;

  taskList.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const textSpan = document.createElement("span");
    textSpan.textContent = task.text;
    textSpan.onclick = () => toggleComplete(index);
    li.appendChild(textSpan);

    const editBtn = document.createElement("i");
    editBtn.className = "fas fa-edit";
    editBtn.title = "Edit";
    editBtn.onclick = () => editTask(index);
    li.appendChild(editBtn);

    const delBtn = document.createElement("i");
    delBtn.className = "fas fa-trash";
    delBtn.title = "Delete";
    delBtn.onclick = () => deleteTask(index);
    li.appendChild(delBtn);

    ul.appendChild(li);

    if (task.completed) completedCount++;
  });

  document.getElementById("total").textContent = taskList.length;
  document.getElementById("completed").textContent = completedCount;
}

function toggleComplete(index) {
  taskList[index].completed = !taskList[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  const confirmDelete = confirm("Are you sure you want to delete this task?");
  if (confirmDelete) {
    taskList.splice(index, 1);
    saveTasks();
    renderTasks();
  }
}

function editTask(index) {
  const newText = prompt("Edit your task:", taskList[index].text);
  if (newText !== null && newText.trim() !== "") {
    taskList[index].text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

function clearAll() {
  if (confirm("Clear all tasks?")) {
    taskList = [];
    saveTasks();
    renderTasks();
  }
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(taskList));
}
