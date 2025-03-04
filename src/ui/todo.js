import { createTaskElement } from "../domain/task.js";

export const render = (taskService) => {
  const taskList = document.getElementById("task-list");
  const listState = taskList.getAttribute("data-state");
  taskList.innerHTML = "";
  const tasksToRender = taskService.getAllTasks();
  const tasks = tasksToRender.filter((task) => {
    if (listState === "completed") {
      toggleFilterColor("completed");
      return task.state === "completed";
    } else if (listState === "pending") {
      toggleFilterColor("pending");
      return task.state === "pending";
    }
    toggleFilterColor("all");
    return task;
  });
  tasks.forEach((task) => {
    const taskElement = createTaskElement(task);
    taskList.appendChild(taskElement);
  });

  darkMode(taskService);

  const counterFn = counter();
  counterFn(taskService);
};

const counter = () => {
  const completedCount = document.getElementById("completed-count");
  const pendingCount = document.getElementById("pending-count");
  const allCount = document.getElementById("all-count");

  return (taskService) => {
    const completedTasks = taskService.getCompletedTasks().length;
    const pendingTasks = taskService.getPendingTasks().length;
    const allTasks = taskService.getAllTasks().length;

    completedCount.textContent = completedTasks;
    pendingCount.textContent = pendingTasks;
    allCount.textContent = allTasks;
  };
};

const darkMode = (taskService) => {
  const elements = {
    body: document.querySelector("body"),
    tasks: document.querySelectorAll(".task"),
    paragraphs: document.querySelectorAll("p"),
    input: document.querySelector("input"),
    h1: document.querySelector("h1"),
    h2: document.querySelector("h2"),
    darkModeButton: document.getElementById("dark-mode"),
    darkModeIcon: document.getElementById("dark-mode-icon"),
    completedFilterBtn: document.getElementById("completed-filter"),
    allFilterBtn: document.getElementById("all-tasks-filter"),
    pendingFilterBtn: document.getElementById("pending-filter"),
  };

  const isDarkMode = taskService.darkModeState();

  const toggleClasses = (element, classes, condition) => {
    element.classList.toggle(classes, condition);
  };


  toggleClasses(elements.body, "bg-stone-800", isDarkMode);
  elements.tasks.forEach((task) => {
    toggleClasses(task, "bg-stone-700", isDarkMode);
    toggleClasses(task, "hover:bg-stone-900", isDarkMode);
  });
  elements.paragraphs.forEach((p) =>
    toggleClasses(p, "text-stone-100", isDarkMode)
  );
  toggleClasses(elements.input, "text-stone-100", isDarkMode);
  toggleClasses(elements.input, "bg-stone-700", isDarkMode);
  toggleClasses(elements.h1, "text-stone-100", isDarkMode);
  toggleClasses(elements.h2, "text-stone-100", isDarkMode);
  toggleClasses(elements.darkModeButton, "bg-stone-200", isDarkMode);
  toggleClasses(elements.darkModeButton, "bg-stone-800", !isDarkMode);
  toggleClasses(elements.darkModeIcon, "fa-sun", isDarkMode);
  toggleClasses(elements.darkModeIcon, "fa-moon", !isDarkMode);
  toggleClasses(elements.completedFilterBtn, "hover:bg-stone-700", isDarkMode);
  toggleClasses(elements.completedFilterBtn, "hover:bg-gray-300", !isDarkMode);
  toggleClasses(elements.allFilterBtn, "hover:bg-stone-700", isDarkMode);
  toggleClasses(elements.allFilterBtn, "hover:bg-gray-300", !isDarkMode);
  toggleClasses(elements.pendingFilterBtn, "hover:bg-stone-700", isDarkMode);
  toggleClasses(elements.pendingFilterBtn, "hover:bg-gray-300", !isDarkMode);
};

const toggleFilterColor = (filter) => {
  const filters = {
    completed: document.getElementById("completed-filter"),
    all: document.getElementById("all-tasks-filter"),
    pending: document.getElementById("pending-filter"),
  };

  Object.keys(filters).forEach((key) => {
    const element = filters[key];
    element.classList.toggle("text-green-500", key === filter);
    element.classList.toggle("font-bold", key === filter);

  });
}

