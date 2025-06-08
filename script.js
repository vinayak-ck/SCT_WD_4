// Get references to form elements
const form = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const dateTimeInput = document.getElementById("taskDateTime");
const taskList = document.getElementById("taskList");

// Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskText = taskInput.value.trim();
  const taskDateTime = dateTimeInput.value;

  if (!taskText || !taskDateTime) return;

  createTaskItem(taskText, taskDateTime);
  taskInput.value = "";
  dateTimeInput.value = "";
});

// Create and add a task item to the list
function createTaskItem(taskText, dateTime) {
  const listItem = document.createElement("li");

  const taskSpan = document.createElement("span");
  taskSpan.className = "task-text";
  taskSpan.innerText = `${taskText} (${new Date(dateTime).toLocaleString()})`;

  const actions = document.createElement("div");
  actions.className = "actions";

  const completeButton = document.createElement("button");
  completeButton.innerText = "✅";
  completeButton.onclick = () => {
    taskSpan.classList.toggle("completed");
  };

  const editButton = document.createElement("button");
  editButton.innerText = "✏️";
  editButton.onclick = () => {
    const updatedText = prompt("Edit task", taskText);
    const updatedDate = prompt("Edit date/time", dateTime);
    if (updatedText && updatedDate) {
      taskSpan.innerText = `${updatedText} (${new Date(updatedDate).toLocaleString()})`;
    }
  };

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "🗑️";
  deleteButton.onclick = () => {
    listItem.remove();
  };

  actions.appendChild(completeButton);
  actions.appendChild(editButton);
  actions.appendChild(deleteButton);

  listItem.appendChild(taskSpan);
  listItem.appendChild(actions);
  taskList.appendChild(listItem);
}

// Enable inline editing of task text on click
taskList.addEventListener("click", function (event) {
  if (event.target.classList.contains("task-text")) {
    const spanElement = event.target;
    const originalContent = spanElement.innerText;
    const taskOnlyText = originalContent.replace(/\s*\(.*\)$/, "");

    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = taskOnlyText;
    inputField.className = "edit-input";

    spanElement.replaceWith(inputField);
    inputField.focus();

    inputField.addEventListener("blur", function () {
      const datePart = originalContent.match(/\(.*\)$/);
      const dateSuffix = datePart ? datePart[0] : "";
      const updatedTask = inputField.value.trim();

      if (updatedTask !== "") {
        const newSpan = document.createElement("span");
        newSpan.className = "task-text";
        newSpan.innerText = `${updatedTask} ${dateSuffix}`;
        inputField.replaceWith(newSpan);
      } else {
        inputField.replaceWith(spanElement);
      }
    });

    inputField.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        inputField.blur();
      } else if (e.key === "Escape") {
        inputField.replaceWith(spanElement);
      }
    });
  }
});
