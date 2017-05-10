import Task from './Model/Task';
import TaskStore from './Model/TaskStore';
import Category from './Model/Category';

const taskStore = new TaskStore();

function mapCategories(categories) {
  return categories.map(category => {
    const subCategories = category.getCategories();
    let categoriesWithTasks;
    if (subCategories.length > 0) {
      categoriesWithTasks = mapCategories(subCategories);
    }
    const tasks = category.getTasks();
    return {...category, tasks, categories};
  });
}

const root = new Category('_root');
const categoryOne = new Category('Category #1');
const categoryTwo = new Category('Category #2');
const categoryThree = new Category('Category #3');
const categoryFour = new Category('Category #4');
const categoryFive = new Category('Category #5');
const categorySix = new Category('Category #6');

const taskOne = taskStore.addTask(new Task('To-Do Item #1', 'Description #1'));
const taskTwo = taskStore.addTask(new Task('To-Do Item #2', 'Description #2'));
const taskThree = taskStore.addTask(new Task('To-Do Item #3', 'Description #3'));
const taskFour = taskStore.addTask(new Task('To-Do Item #4', 'Description #4'));
const taskFive = taskStore.addTask(new Task('To-Do Item #5', 'Description #5'));
const taskSix = taskStore.addTask(new Task('To-Do Item #6', 'Description #6'));
const taskSeven = taskStore.addTask(new Task('To-Do Item #7', 'Description #7'));

root.addSubCategory(categoryOne);
root.addSubCategory(categoryTwo);
root.addSubCategory(categoryThree);

categoryOne.addTask(taskOne);

categoryTwo.addSubCategory(categoryFour);
categoryTwo.addTask(taskSeven);
categoryFour.addTask(taskTwo);
categoryFour.addTask(taskThree);

categoryThree.addSubCategory(categoryFive);
categoryFive.addTask(taskFour);

categorySix.addTask(taskFive);
categorySix.addTask(taskSix);
categoryThree.addSubCategory(categorySix);

const tasks = taskStore.getTasks();
const categories = mapCategories(root.getCategories());

export {
  root as default,
  categories,
  tasks
};
