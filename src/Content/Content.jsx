import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Button, Modal, ModalHeader, ModalBody, Input, ModalFooter, Container, Row, Col } from 'reactstrap';

import {ProgressBar} from '../common';
import Categories from '../Categories';
import Tasks from '../Tasks';

import * as taskActions from '../actions/tasksActions';
import * as categoriesActions from '../actions/categoriesActions';
import * as modalActions from '../actions/modalActions';

// Should be replaced by Layout component ...
export class Content extends Component {
    static propTypes = {
        className: PropTypes.string
    };

    static get defaultProps() {
        return {
            className: ''
        };
    }

    state = {
        categoryToEdit: null,
        categoryToAdd: null,
        categoryToDelete: null
    };

    renderErrorModal() {
        return (
            <Modal isOpen={!this.props.selectedCategory && this.props.modal}>
                <ModalHeader>Error Modal</ModalHeader>
                <ModalBody>
                    You should select category fssirst.
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleErrorModalClose}>Ok</Button>
                </ModalFooter>
            </Modal>
        );
    }

    renderConfirmationModal() {
        return (
            <Modal
                isOpen={this.state.categoryToDelete && this.props.modal}
                toggle={this.toggle}
                className={this.props.className}
            >
                <ModalHeader>Confirmation Modal</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete {this.state.categoryToDelete ? this.state.categoryToDelete.title : null}?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleCategoryDeleteConfirm}>Ok</Button>{' '}
                    <Button color="secondary" onClick={this.handleCategoryDeleteCancel}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }

    renderAddingModal() {
        return (
            <Modal isOpen={this.state.categoryToAdd && this.props.modal}>
                <ModalHeader>Adding Modal</ModalHeader>
                <ModalBody>
                    <Input placeholder="Enter category title" getRef={(node) => this.input = node} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleCategoryAddConfirm}>Ok</Button>{' '}
                    <Button color="secondary" onClick={this.handleCategoryAddCancel}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }

    renderEditModal() {
        return (
            <Modal isOpen={this.state.categoryToEdit && this.props.modal}>
                <ModalHeader>Modal title</ModalHeader>
                <ModalBody>
                    <Input
                        placeholder="Enter category title"
                        defaultValue={this.state.categoryToEdit ? this.state.categoryToEdit.title : ''}
                        getRef={(node) => this.input = node}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleCategoryEditConfirm}>Ok</Button>{' '}
                    <Button color="secondary" onClick={this.handleCategoryEditCancel}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }

    handleCategoryAddRequest = (parent) => {
        const category = {
            _id: Math.random().toString(16).slice(2),
            parent,
            expanded: false,
            title: '',
            tasks: [],
            categories: []
        };
        this.setState({ categoryToAdd: category });
        this.props.openModal();
    };

    handleCategoryAdd = (title, parent, cb) => {
        this.props.addCategory({ title, parent });
        cb && cb();
    };

    handleCategoryAddConfirm = () => {
        const category = this.state.categoryToAdd;
        category.title = this.input.value;
        this.setState({ categoryToAdd: null });
        this.props.addCategory({ title: this.input.value, parent: category.parent });
        this.props.closeModal();
    };

    handleCategoryAddCancel = () => {
        this.setState({ categoryToAdd: null });
        this.props.closeModal();
    };

    handleCategoryDelete = (category) => {
        this.setState({ categoryToDelete: category });
        this.props.openModal();
    };

    handleCategoryDeleteConfirm = () => {
        this.props.deleteCategory({ id: this.state.categoryToDelete._id });
        this.setState({ categoryToDelete: null, selectedCategory: null });
        this.props.closeModal();
    };

    handleCategoryDeleteCancel = () => {
        this.props.categorySelect({});
        this.props.closeModal();
    };

    handleCategoryEditRequest = (category) => {
        this.setState({ categoryToEdit: category });
        this.props.openModal();
    };

    handleCategoryEditConfirm = (title) => {
        const category = this.state.categoryToEdit;
        category.title = title;
        this.setState({ categoryToEdit: null });
        this.props.editCategory({ id: category._id, title: this.input.value });
        this.props.closeModal();
    };

    handleCategoryEditCancel = () => {
        this.setState({ categoryToEdit: null });
        this.props.closeModal();
    };

    handleCategorySelect = (category) => {
        this.props.categorySelect(category);
    };

    handleCategoryExpand = (category) => {
        this.props.categoryExpand(category);
    };

    handleTaskAdd = (title, cb) => {
        const task = {
            _id: Math.random().toString(16).slice(2),
            title,
            description: '',
            done: false
        };
        if (!this.props.selectedCategory) {
            this.props.openModal();
        } else {
            this.props.addTask({ title, category: this.props.selectedCategory._id });
            cb && cb();
        }
    };

    handleErrorModalClose = () => {
        this.props.closeModal();
    };

    render() {
        const contentClassName = classnames('content', this.props.className);
        return (
            <main className={contentClassName}>
                <Container>
                    <Row>
                        <ProgressBar categories={this.props.categories} tasks={this.props.tasks} />
                    </Row>
                    <Row>
                        <Col xs="12" md="6">
                            <Categories
                                data={this.props.categories}
                                editMode={this.props.editMode}
                                selectedCategory={this.props.selectedCategory}
                                onCategoryAdd={this.handleCategoryAdd}
                                onCategoryAddRequest={this.handleCategoryAddRequest}
                                onCategoryEditRequest={this.handleCategoryEditRequest}
                                onCategoryDelete={this.handleCategoryDelete}
                                onCategorySelect={this.handleCategorySelect}
                                onCategoryExpand={this.handleCategoryExpand}
                            />
                        </Col>
                        <Col xs="12" md="6">
                            <Tasks
                                onTaskAdd={this.handleTaskAdd}
                                data={this.props.selectedCategory ? this.props.selectedCategory.tasks.map(t => this.props.tasks.find(task => task._id === t)) : this.props.foundTasks}
                            />
                        </Col>
                    </Row>
                </Container>
                {this.renderConfirmationModal()}
                {this.renderAddingModal()}
                {this.renderEditModal()}
                {this.renderErrorModal()}
            </main>
        );
    }
}

function mapStateToProps({
    editMode,
    modal,
    selected: {category: selectedCategory},
    categories,
    tasks,
    search: { data, pristine }
}) {
    const foundTasks = pristine ? [] : data;
    return {editMode, selectedCategory, categories, tasks, foundTasks, modal};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...categoriesActions, ...taskActions, ...modalActions}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
