import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Button, Label, InputGroup, Input} from 'reactstrap';

class TaskEditor extends PureComponent {
    static propTypes = {
        task: PropTypes.object.isRequired,
        done: PropTypes.bool.isRequired,
        description: PropTypes.string.isRequired,
        onSave: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            task: this.props.task
        };
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleEdit(event) {
        event.preventDefault();
        const task = this.state.task;
        task.title = this.title.value;
        task.description = this.description.value;
        task.done = this.done.checked;
        this.props.onSave(task);
    }

    render() {
        return (
            <div className="task-editor">
                <Button onClick={this.handleEdit}>Save</Button>
                <Button onClick={this.props.onCancel}>Cancel</Button>
                <InputGroup>
                    <Input defaultValue={this.props.task.title} getRef={(node) => this.title = node}/>
                </InputGroup>
                <InputGroup>
                    <Label check>
                        <Input type="checkbox" defaultChecked={this.props.done}
                               getRef={(node) => this.done = node}/>{' '}
                        Done
                    </Label>
                </InputGroup>
                <InputGroup>
                    <Input type="textarea" defaultValue={this.props.task.description}
                           getRef={(node) => this.description = node}/>
                </InputGroup>
            </div>
        );
    }
}

export default TaskEditor;
