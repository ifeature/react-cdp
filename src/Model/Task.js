class Task {
  constructor(title, description = '') {
    this.title = title;
    this.description = description;
    this.done = false;
  }

  setId(id) {
    this.id = id;
  }
}

export default Task;
