import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Form, FormGroup, Label, Input, InputGroup, InputGroupAddon} from 'reactstrap';

import * as tasksActions from '../../actions/tasksActions';

import './Search.css';

class Search extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.searchTask({
            title: this.title.value,
            done: this.done.checked
        });
    }

    render() {
        return (
            <div className={this.props.className}>
                <Form className="search" onSubmit={this.handleSubmit} inline>
                    <FormGroup className="search__field">
                        <Input type="checkbox" name="done" id="showDone" getRef={(node) => this.done = node}/>
                        <Label for="showDone">Show done</Label>{' '}
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <InputGroup>
                            <InputGroupAddon>
                                <i className="fa fa-search"></i>
                            </InputGroupAddon>
                            <Input type="search" name="search" id="searchField" placeholder="Search"
                                   getRef={(node) => this.title = node}/>
                        </InputGroup>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

Search.propTypes = {
    className: PropTypes.string
};

Search.defaultProps = {
    className: ''
};

export default connect(null, dispatch => (
    bindActionCreators(tasksActions, dispatch)
))(Search);
