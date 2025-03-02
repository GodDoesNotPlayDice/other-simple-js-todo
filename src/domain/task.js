export class Task {
    constructor(text) {
        this.uuid = this.generateUUID();
        this.text = text;
        this.state = "pending";
    }

    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

export const createTaskElement = (task) => {
    const taskElement = document.createElement("div");

    taskElement.classList.add("bg-stone-100", "flex", "justify-between", "items-center", "p-2", "text-left", "rounded-md", "cursor-pointer", "hover:bg-gray-150", "task");

    taskElement.setAttribute("data-state", `${task.state}`);
    taskElement.setAttribute("uuid", `${task.uuid}`);

    const task_left_side = document.createElement("div");
    task_left_side.classList.add("flex", "items-center", "task_left_side");
    
    const Icon = document.createElement("i");
    if (task.state === "completed") {
        Icon.classList.add("fa-solid", "fa-check", "mr-2", "cursor-pointer", "text-green-500", 'w-3');
    }
    else {
        Icon.classList.add("fa-solid", "fa-clock", "mr-2", "cursor-pointer", "text-yellow-500", 'w-3');
    }

    const task_text = document.createElement("p");
    task_text.textContent = task.text;

    task_left_side.appendChild(Icon);
    task_left_side.appendChild(task_text);

    const task_right_side = document.createElement("div");
    
    const editIcon = document.createElement("i");
    editIcon.classList.add("fa-solid", "fa-pen", "mr-2", "cursor-pointer", "text-blue-500");

    const trashIcon = document.createElement("i");
    trashIcon.classList.add("fa-solid", "fa-trash", "mr-2", "cursor-pointer", "text-red-500");

    task_right_side.appendChild(editIcon);
    task_right_side.appendChild(trashIcon);

    taskElement.appendChild(task_left_side);
    taskElement.appendChild(task_right_side);

    return taskElement;
};

export const inputEditElement = (target, taskService) => {
    const t = target.closest(".task");
    const left_side = t.querySelector(".task_left_side");
    const p = left_side.querySelector("p");
    const input = document.createElement("input");
    input.type = "text";
    input.value = p.innerText;
    input.placeholder = "Edit your task";
    input.classList.add(
      "border",
      "border-green-500",
      "rounded-md",
      "focus:outline-none",
      "focus:ring-1",
      "focus:ring-green-500",
      "focus:border-transparent",
      "h-6"
    );

    if (taskService.darkModeState()) {
      input.classList.add("bg-stone-700", "text-stone-100");
    }

    return input;
  };
  