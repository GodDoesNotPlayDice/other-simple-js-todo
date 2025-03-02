import { Task } from "../domain/task.js";

export class TaskService {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  addTask(text) {
    const task = new Task(text);
    this.taskRepository.save(task);
    iziToast.show({
      title: "Tasks",
      message: "Task has been added",
      color: "green",
      position: "topRight",
    });
  }

  toggleTaskState(uuid) {
    const task = this.taskRepository.findById(uuid);
    if (task.state === "pending") {
      task.state = "completed";
      iziToast.show({
        title: "Tasks",
        message: "Task has been marked as completed",
        color: "blue",
        position: "topRight",
      });
    } else {
      task.state = "pending";
      iziToast.show({
        title: "Tasks",
        message: "Task has been marked as pending",
        color: "blue",
        position: "topRight",
      });
    }
    this.taskRepository.edit(task);
  }

  deleteTask(uuid) {
    const task = this.taskRepository.findById(uuid);
    this.taskRepository.delete(task);

    iziToast.show({
        title: "Tasks",
        message: "Task has been deleted",
        color: "green",
        position: "topRight",
        });
  }

  editTask(uuid, newText) {
    const task = this.taskRepository.findById(uuid);
    if (task) {
        if (task.text === newText) {
            iziToast.show({
                title: "Tasks",
                message: "The new text is the same as the old one",
                color: "blue",
                position: "topRight",
            });
            return;
        }
      task.text = newText;
      this.taskRepository.edit(task);
        iziToast.show({
            title: "Tasks",
            message: "Task has been edited",
            color: "green",
            position: "topRight",
        });
    }
  }

  deleteAllCompletedTasks() {
    const tasks = this.taskRepository.findAll();

    if (tasks.length === 0) {
      iziToast.show({
        title: "Tasks",
        message: "There aren't tasks to delete",
        color: "red",
        position: "topRight",
      });
      return;
    }

    const completedTasks = tasks.filter((task) => task.state === "completed");

    if (completedTasks.length === 0) {
      iziToast.show({
        title: "Tasks",
        message: "There aren't completed tasks to delete",
        color: "red",
        position: "topRight",
      });
      return;
    }

    completedTasks.forEach((task) => {
      this.taskRepository.delete(task);
    });

    iziToast.show({
      title: "Tasks",
      message: "Completed tasks have deleted",
      color: "green",
      position: "topRight",
    });
  }

  getCompletedTasks() {
    return this.taskRepository
      .findAll()
      .filter((task) => task.state === "completed");
  }

  getPendingTasks() {
    return this.taskRepository
      .findAll()
      .filter((task) => task.state === "pending");
  }

  getAllTasks() {
    return this.taskRepository.findAll();
  }

  toggleDarkMode() {
    if (!this.taskRepository.darkModeState()) {
      Toastify({
        text: "Dark mode enabled 😎🌙",
        duration: 3000,
        position: "center",
        gravity: "bottom",
      }).showToast();
    } else {
      Toastify({
        text: "Light mode enabled 🌞",
        duration: 3000,
        position: "center",
        gravity: "bottom",
      }).showToast();
    }
    this.taskRepository.toggleDarkMode();
  }

  darkModeState() {
    return this.taskRepository.darkModeState();
  }
}
