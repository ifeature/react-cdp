import TaskStore from './TaskStore';
import { isEqual } from 'lodash';

const taskStore = new TaskStore();

// We need to count completed categories
// GIVEN that we should traverse over categories Tree
class Category {
  constructor(title) {
    this.id = Math.random().toString(16).slice(2);
    this.title = title;
    this.expanded = false;
    this.tasks = [];
    this.categories = [];
  }

  toggleExpand() {
    this.expanded = !this.expanded;
  }

  getCategories() {
    return this.categories;
  }

  addSubCategory(subCategory, head) {
    if (head) {
      this.categories.unshift(subCategory);
    } else {
      this.categories.push(subCategory);
    }
  }

  removeSubCategory(subCategory) {
    const length = this.children.length;
    this.categories = this.categories.filter(child => child === subCategory);
  }

  addTask(task) {
    const taskId = taskStore.addTask(task).id;
    this.tasks.push(taskId);
  }

  getTasks() {
    return this.tasks.map(id => taskStore.getTask(id));
  }
}

export default Category;
