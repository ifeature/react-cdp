import React, {PureComponent} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {Add} from '../common';
import {List, TaskEditor} from './components';
import './Tasks.css';

import * as tasksActions from '../actions/tasksActions';
import * as editModeActions from '../actions/editModeActions';

class Tasks extends PureComponent {
    handleEdit = (task) => {
        this.props.editModeOn();
        this.props.taskSelect(task);
    };

    handleComplete = (task) => {
        task.done = !task.done;
        this.props.editTask({ id: task._id, title: task.title, description: task.description, done: task.done });
    };

    handleSave = (task) => {
        this.props.editTask({ id: task._id, title: task.title, description: task.description, done: task.done });
        this.props.taskSelect(null);
        this.props.editModeOff();
    };

    handleCancel = () => {
        this.props.taskSelect(null);
        this.props.editModeOff();
    };

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

export default connect(({editMode, selected: {task: selectedTask, category: selectedCategory}}) => ({
    editMode,
    selectedTask
}), dispatch => (
    bindActionCreators({...tasksActions, ...editModeActions}, dispatch)
))(Tasks);
