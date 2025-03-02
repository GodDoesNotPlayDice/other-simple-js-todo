import { TaskRepository } from "../domain/taskRepository.js";

export class LocalStorageTaskRepository extends TaskRepository {
  save(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  edit(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const index = tasks.findIndex((t) => t.uuid === task.uuid);
    tasks[index] = task;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  findById(uuid) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return tasks.find((t) => t.uuid === uuid);
  }

  findAll() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  }

  delete(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((t) => t.uuid !== task.uuid);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  toggleDarkMode() {
    let isDarkMode = JSON.parse(localStorage.getItem("darkmode"));
    if (isDarkMode) {
      localStorage.setItem("darkmode", JSON.stringify(false));
    } else {
      localStorage.setItem("darkmode", JSON.stringify(true));
    }
  }

  darkModeState() {
    return JSON.parse(localStorage.getItem("darkmode"));
  }
}

