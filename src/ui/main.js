import { TaskService } from '../application/taskService.js';
import { LocalStorageTaskRepository } from '../infrastructure/localStorageRepo.js';
import { render } from './todo.js';
import { inputEditElement } from '../domain/task.js';

const taskRepository = new LocalStorageTaskRepository();
const taskService = new TaskService(taskRepository);

const input = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task-btn");
const deleteAllCompletedButton = document.getElementById("delete-all-completed");
const completedFilterBtn = document.getElementById("completed-filter");
const allFilterBtn = document.getElementById("all-tasks-filter");
const pendingFilterBtn = document.getElementById("pending-filter");
const taskList = document.getElementById("task-list");
const darkModeButton = document.getElementById("dark-mode");

input.addEventListener("keyup", (event) => {
    if (input.value.trim() === "") {
        iziToast.show({
            title: "Tasks",
            message: "The task cannot be empty",
            color: "red",
            position: "topRight",
          });
        return;
    }   
    if (event.key === "Enter" && input.value.trim() !== "") {
        taskService.addTask(input.value);
        input.value = "";
        render(taskService);
    }
});

addTaskButton.addEventListener("click", () => {
    if (input.value.trim() === "") {
        iziToast.show({
            title: "Tasks",
            message: "The task cannot be empty",
            color: "red",
            position: "topRight",
          });
        return;
    }
    taskService.addTask(input.value);
    input.value = "";
    render(taskService);
});

taskList.addEventListener("click", (event) => {
    const target = event.target;
    const taskElement = target.closest(".task");
    const uuid = taskElement.getAttribute("uuid");

    if (target.classList.contains("fa-clock") || target.classList.contains("fa-check")) {
        taskService.toggleTaskState(uuid);
        render(taskService);
    } else if (target.classList.contains("fa-trash")) {
        taskService.deleteTask(uuid);
        render(taskService);
    } else if (target.classList.contains("fa-pen")) {
        const inputEdit = inputEditElement(target, taskService);
        const p = target.closest(".task").children[0].children[1]
        target.closest(".task").children[0].replaceChild(inputEdit, p);
        inputEdit.focus();
        inputEdit.addEventListener("keyup", (event) => {
            if (event.key === "Enter") {
                if (inputEdit.value.trim() === "") {
                    render(taskService);
                    return;
                }
                taskService.editTask(uuid, inputEdit.value);
                render(taskService);
            }
        });

        inputEdit.addEventListener("blur", () => {
            if (inputEdit.value.trim() === "") {
                render(taskService);
                return;
            }
            taskService.editTask(uuid, inputEdit.value);
            render(taskService);
        }
        );
    }
   
});

deleteAllCompletedButton.addEventListener("click", () => {
    taskService.deleteAllCompletedTasks();
    render(taskService);
});

completedFilterBtn.addEventListener("click", () => {
    taskList.dataset.state = "completed";
    render(taskService, taskService.getCompletedTasks())
});

pendingFilterBtn.addEventListener("click", () => {
    taskList.dataset.state = "pending";
    render(taskService, taskService.getPendingTasks());
});

allFilterBtn.addEventListener("click", () => {
    taskList.dataset.state = "all";
    render(taskService);
});

darkModeButton.addEventListener("click", () => {
    taskService.toggleDarkMode();
    render(taskService);
}
);


render(taskService);

