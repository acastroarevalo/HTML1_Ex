interface Task {
    text: string;
    completed: boolean;
}

const btn = document.getElementById("btn")!;
const input = document.getElementById("todoInput")! as HTMLInputElement;
const form = document.getElementById("todoForm")!;
const list = document.getElementById("todoList")!;
const tasks: Task[] = readTasks();
tasks.forEach(createTask);


form.addEventListener("submit", function(e){
    e.preventDefault();

    if (tasks.length < 8) {
        if (input.value.length < 3) {
            alert("Task should be of 3 characters minimum.");
        }else {
            const nTask: Task = {
                text: input.value,
                completed: false
            };
            createTask(nTask);
            tasks.push(nTask); 
        } 
    }else {
        alert("Maximum of 8 items are allowed to add in the list.");
    }
    
    localStorage.setItem("tasks", JSON.stringify(tasks));
    input.value="";
})

function readTasks(): Task[] {
    const tasksJSON = localStorage.getItem("tasks");
    if (tasksJSON == null) return[];
    return JSON.parse(tasksJSON);
}

function createTask(task: Task){
    const newTask = document.createElement("li");
    const taskBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    
    if (task.completed){
        taskBtn.style.backgroundColor = "#00ff00";
    } else {
        taskBtn.style.backgroundColor = "#ffff00";
    }

    deleteBtn.append("X");
    taskBtn.append(task.text);
    newTask.append(taskBtn);
    newTask.append(deleteBtn);
    list.append(newTask);

    taskBtn.addEventListener("click", function(){
        task.completed = !task.completed;
        console.log(task.completed);
        if (task.completed){
            taskBtn.style.backgroundColor = "#00ff00";
        } else {
            taskBtn.style.backgroundColor = "#ffff00";
        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
    })

    deleteBtn.addEventListener("click", function(){
        if (task.completed){
            if (confirm("Delete Task?")) {
                newTask.remove();
                //taskNumber -= 1;
                for (let i = 0; i < tasks.length; i++){
                    if(tasks[i].text == task.text){
                        tasks.splice(i, 1);
                    }
                }
            }
        } else {
            alert("Uncomplete task cannot be deleted")
        }
        localStorage.setItem("tasks", JSON.stringify(tasks)); 
    })
}