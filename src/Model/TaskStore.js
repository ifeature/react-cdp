let instance;

class TaskStore {
  constructor() {
    if (instance) {
      return instance;
    }
    this.tasks = [];
    instance = this;
  }

  addTask(task) {
    const lastId = this.tasks.length > 0 && this.tasks[this.tasks.length - 1].id;
    if (!lastId) {
      task.setId(1);
    } else {
      task.setId(lastId + 1);
    }
    this.tasks.push(task);
    return task;
  }

  getTask(id) {
    return this.tasks.filter(task => task.id === id)[0];
  }

  getTasks() {
    return this.tasks;
  }
}

export default TaskStore;
