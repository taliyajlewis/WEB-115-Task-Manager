let tasks = [];
let taskId = 1;

//Styling 
document.body.style.textAlign = "center";
document.body.style.fontFamily = "Arial, sans-serif";
document.body.style.backgroundColor = "#f8f9fa";

let heading = document.querySelector("h1");
heading.style.backgroundColor = "#3498db";
heading.style.color = "white";
heading.style.display = "inline-block";
heading.style.padding = "10px 20px";
heading.style.borderRadius = "10px";
heading.style.marginTop = "20px";
heading.style.marginBottom = "10px";

// Form and Input Handling
let form = document.getElementById("taskForm");
form.style.margin = "20px auto";

let taskDiv = document.getElementById("taskmanager");
taskDiv.style.maxWidth = "700px";
taskDiv.style.margin = "20px auto";
taskDiv.style.textAlign = "left";

//After submit is pressed
document.getElementById("taskForm").addEventListener("submit", function(event) {
    event.preventDefault();

    
// Prevents invalid inputs with alert message
    let name = document.getElementById("taskName").value.trim();
    if (name === "") {
        alert("Please enter a task name");
        return;
    }

    let priority = document.getElementById("priority").value;
    let important = document.getElementById("important").checked;
    let completed = false;
    let dateAdded = new Date().toLocaleDateString();

// Task stored in array of  objects
    let myTask = {
        id: taskId,
        name: name,
        priority: priority,
        isImportant: important,
        isCompleted: completed,
        date: dateAdded
    };

// Console Logging of Tasks (JSON.stringify)

    tasks.push(myTask);
    taskId++;

    console.log(JSON.stringify(tasks));

    document.getElementById("taskForm").reset();

    displayTasks();
});

//Displays all tasks on the page
function displayTasks() {
    let taskDiv = document.getElementById("taskmanager");
    taskDiv.innerHTML = "";

    if (tasks.length > 0) {
        let header = document.createElement("div");
        header.style.display = "flex";
        header.style.fontWeight = "bold";
        header.style.borderBottom = "2px solid black";
        header.style.padding = "5px 0";

        let headers = ["Task Name", "Priority", "Date", "Done", "Delete"];
        let headerFlex = [2, 1, 1, 1, 1];

        headers.forEach(function(text, index) {
            let h = document.createElement("div");
            h.textContent = text;
            h.style.flex = headerFlex[index];
            header.appendChild(h);
        });

        taskDiv.appendChild(header);
    }

    for (let i = 0; i < tasks.length; i++) {
        let myTask = tasks[i];
        let row = document.createElement("div");
        row.style.display = "flex";
        row.style.alignItems = "center";
        row.style.padding = "5px 0";
        row.style.borderBottom = "1px solid #ccc";

// Red bubble for high priority task
        if (myTask.isImportant) {
            row.style.borderLeft = "4px solid red";
        }

// Crosses out completed task
        if (myTask.isCompleted) {
            row.style.textDecoration = "line-through";
        }

        let nameDiv = document.createElement("div");
        nameDiv.textContent = myTask.name;
        nameDiv.style.flex = "2";

        let priorityDiv = document.createElement("div");
        priorityDiv.textContent = myTask.priority;
        priorityDiv.style.flex = "1";
        priorityDiv.style.padding = "2px 5px";
        priorityDiv.style.borderRadius = "5px";
        priorityDiv.style.color = "white";
        priorityDiv.style.marginLeft = "10px";

// Establishes colors for each priority
        if (myTask.priority === "High") {
            priorityDiv.style.backgroundColor = "#e74c3c";
        } else if (myTask.priority === "Medium") {
            priorityDiv.style.backgroundColor = "#f39c12";
        } else {
            priorityDiv.style.backgroundColor = "#27ae60";
        }

// Displays current date

        let dateDiv = document.createElement("div");
        dateDiv.textContent = myTask.date;
        dateDiv.style.flex = "1";
        dateDiv.style.marginLeft = "10px";

        let doneDiv = document.createElement("div");
        let doneBox = document.createElement("input");
        doneBox.type = "checkbox";
        doneBox.checked = myTask.isCompleted;

// Mark task as complete
        doneBox.addEventListener("change", function() {
            myTask.isCompleted = doneBox.checked;
            console.log(JSON.stringify(tasks));
            displayTasks();
        });
        doneDiv.appendChild(doneBox);
        doneDiv.style.flex = "1";
        doneDiv.style.marginLeft = "10px";

//Delete Button
        let delDiv = document.createElement("div");
        let deleteB = document.createElement("button");
        deleteB.textContent = "Delete";
        deleteB.addEventListener("click", function() {
            tasks.splice(i, 1);
            console.log(JSON.stringify(tasks));
            displayTasks();
        });
        delDiv.appendChild(deleteB);
        delDiv.style.flex = "1";

        row.appendChild(nameDiv);
        row.appendChild(priorityDiv);
        row.appendChild(dateDiv);
        row.appendChild(doneDiv);
        row.appendChild(delDiv);

        taskDiv.appendChild(row);
    }

    //Creates footer element, applies only after submitting form
    if (!document.getElementById("footer")) {
        let footer = document.createElement("div");
        footer.id = "footer";
        footer.textContent = "Task Manager by Taliya Lewis 2025";
        footer.style.textAlign = "center";
        footer.style.padding = "10px";
        footer.style.marginTop = "20px";
        footer.style.borderTop = "1px solid #ccc";
        footer.style.fontSize = "14px";
        footer.style.color = "#555";
        document.body.appendChild(footer);
    }
}