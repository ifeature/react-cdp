import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TaskStore from '../Model/TaskStore';
import { Add } from '../Common';
import { List, TaskEditor } from './components';
import './Tasks.css';

import * as tasksActions from '../actions/tasksActions';
import * as editModeActions from '../actions/editModeActions';

const taskStore = new TaskStore();

class Tasks extends PureComponent {
  constructor(props, contenxt) {
    super(props, contenxt);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
  }

  handleEdit(task) {
    this.props.editModeOn();
    this.props.taskSelect(task);
  }

  handleComplete(task) {
    task.done = !task.done;
    this.props.tasksEdit(task);
  }

  handleSave(task) {
    this.props.tasksEdit(task);
    this.props.taskSelect(null);
    this.props.editModeOff();
  }

  handleCancel() {
    this.props.taskSelect(null);
    this.props.editModeOff();
  }

  render() {
    return (
      <section className="tasks">
        <Add
          className="tasks__add"
          onAdd={this.props.onTaskAdd}
          name="task"
          placeholder="Enter task title"
        />
        {
          this.props.editMode ?
          <TaskEditor
            task={this.props.selectedTask}
            category={this.props.selectedCategory}
            description={this.props.selectedTask.description}
            done={this.props.selectedTask.done}
            onSave={this.handleSave}
            onCancel={this.handleCancel}
          /> :
          <List
            data={this.props.data}
            handleComplete={this.handleComplete}
            handleEdit={this.handleEdit}
          />
        }
      </section>
    );
  }
}

export default connect(({ editMode, selected: { task: selectedTask, category: selectedCategory } }) => ({ editMode, selectedTask }), dispatch => (
  bindActionCreators({...tasksActions, ...editModeActions}, dispatch)
))(Tasks);
