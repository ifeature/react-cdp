import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Container, Row, Col } from 'reactstrap';
import { cloneDeep } from 'lodash';

import { ProgressBar } from '../Common';
import Categories from '../Categories';
import Tasks from '../Tasks';
import Category from '../Model/Category';

import ConfirmationModal from '../ConfirmationModal';
import AddingModal from '../AddingModal';
import EditModal from '../EditModal';
import ErrorModal from '../ErrorModal';

import * as taskActions from '../actions/tasksActions';
import * as categoriesActions from '../actions/categoriesActions';

function computeCompletedCategories(categories, storeCategories, storeTasks, completedCategories = 0, allCategories = categories.length) {
  categories.forEach(category => {
    const tasks = category.tasks.map(task => storeTasks.find(t => t.id === task));
    const subCategories = category.categories.map(subCategory => storeCategories.find(c => c.id === subCategory));
    allCategories = allCategories + subCategories.length;

    if (tasks.every(task => task.done === true) || tasks.length === 0) {
      completedCategories = completedCategories + 1;
    }

    [completedCategories] = computeCompletedCategories(subCategories, storeCategories, storeTasks, completedCategories, allCategories);
  });

  return [completedCategories, allCategories];
}

// Should be replaced by Layout component ...
export class Content extends PureComponent {
  static propTypes = {
    className: PropTypes.string
  };

  static get defaultProps() {
    return {
      className: ''
    };
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      categoryToEdit: null,
      categoryToAdd: null,
      categoryToDelete: null,
      isCategoryAddModalOpen: false,
      isCategoryDeleteModalOpen: false,
      isCategoryEditModalOpen: false,
      isErrorModalOpen: false,
    };
    this.handleCategorySelect = this.handleCategorySelect.bind(this);
    this.handleCategoryAddRequest = this.handleCategoryAddRequest.bind(this);
    this.handleCategoryAdd = this.handleCategoryAdd.bind(this);
    this.handleCategoryDelete = this.handleCategoryDelete.bind(this);
    this.handleCategoryExpand = this.handleCategoryExpand.bind(this);
    this.handleCategoryAddConfirm = this.handleCategoryAddConfirm.bind(this);
    this.handleCategoryAddCancel = this.handleCategoryAddCancel.bind(this);
    this.handleCategoryDeleteConfirm = this.handleCategoryDeleteConfirm.bind(this);
    this.handleCategoryDeleteCancel = this.handleCategoryDeleteCancel.bind(this);
    this.handleCategoryEditRequest = this.handleCategoryEditRequest.bind(this);
    this.handleCategoryEditConfirm = this.handleCategoryEditConfirm.bind(this);
    this.handleCategoryEditCancel = this.handleCategoryEditCancel.bind(this);
    this.handleTaskAdd = this.handleTaskAdd.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleErrorModalClose = this.handleErrorModalClose.bind(this);
  }

  renderErrorModal() {
    return (
      !this.props.selectedCategory &&
      <ErrorModal
        isOpen={this.state.isErrorModalOpen}
        onConfirm={this.handleErrorModalClose}
      />
    );
  }

  renderConfirmationModal() {
    return (
      this.state.categoryToDelete &&
      <ConfirmationModal
        isOpen={this.state.isCategoryDeleteModalOpen}
        item={this.state.categoryToDelete ? this.state.categoryToDelete.title : null}
        onConfirm={this.handleCategoryDeleteConfirm}
        onCancel={this.handleCategoryDeleteCancel}
      />
    );
  }

  renderAddingModal() {
    return (
      this.state.categoryToAdd &&
      <AddingModal
        isOpen={this.state.isCategoryAddModalOpen}
        onConfirm={this.handleCategoryAddConfirm}
        onCancel={this.handleCategoryAddCancel}
      />
    );
  }

  renderEditModal() {
    return (
      this.state.categoryToEdit &&
      <EditModal
        title={this.state.categoryToEdit.title}
        isOpen={this.state.isCategoryEditModalOpen}
        onConfirm={this.handleCategoryEditConfirm}
        onCancel={this.handleCategoryEditCancel}
      />
    );
  }

  handleCategoryAddRequest(parent) {
    const category = {
      id: Math.random().toString(16).slice(2),
      parent,
      expanded: false,
      title: '',
      tasks: [],
      categories: []
    };
    this.setState({
      isCategoryAddModalOpen: !this.state.isCategoryAddModalOpen,
      categoryToAdd: category
    });
  }

  handleCategoryAdd(title, parent = null) {
    const category = {
      id: Math.random().toString(16).slice(2),
      parent,
      expanded: false,
      title,
      tasks: [],
      categories: []
    };
    this.props.categoryAdd(category);
  }

  handleCategoryAddConfirm(title) {
    const category = this.state.categoryToAdd;
    category.title = title;
    this.setState({
      isCategoryAddModalOpen: !this.state.isCategoryAddModalOpen,
      categoryToAdd: null
    });
    this.props.categoryAdd(category);
  }

  handleCategoryAddCancel() {
    this.setState({
      isCategoryAddModalOpen: !this.state.isCategoryAddModalOpen,
      categoryToAdd: null
    });
  }

  handleCategoryDelete(category) {
    this.setState({
      isCategoryDeleteModalOpen: !this.state.isCategoryDeleteModalOpen,
      categoryToDelete: category
    });
  }

  handleCategoryDeleteConfirm() {
    this.props.categoryDelete(this.state.categoryToDelete);
    this.setState({
      isCategoryDeleteModalOpen: !this.state.isCategoryDeleteModalOpen,
      categoryToDelete: null,
      selectedCategory: null
    });
  }

  handleCategoryDeleteCancel() {
    this.setState({
      isCategoryDeleteModalOpen: !this.state.isCategoryDeleteModalOpen
    });
    this.props.categorySelect({});
  }

  handleCategoryEditRequest(category) {
    this.setState({
      isCategoryEditModalOpen: !this.state.isCategoryEditModalOpen,
      categoryToEdit: category
    });
  }

  handleCategoryEditConfirm(title) {
    const category = this.state.categoryToEdit;
    category.title = title;
    this.setState({
      isCategoryEditModalOpen: !this.state.isCategoryEditModalOpen,
      categoryToEdit: null
    });
    this.props.categoryEdit(category);
  }

  handleCategoryEditCancel() {
    this.setState({
      isCategoryEditModalOpen: !this.state.isCategoryEditModalOpen,
      categoryToEdit: null
    });
  }

  handleCategorySelect(category) {
    this.props.categorySelect(category);
  }

  handleCategoryExpand(category) {
    this.props.categoryExpand(category);
  }

  handleTaskAdd(title, cb) {
    const task = {
      id: Math.random().toString(16).slice(2),
      title,
      description: '',
      done: false
    };
    if (!this.props.selectedCategory) {
      this.setState({
        isErrorModalOpen: true
      });
    } else {
      this.props.taskAdd(task);
      cb && cb();
    }
  }

  handleErrorModalClose() {
    this.setState({
      isErrorModalOpen: false
    });
  }

  handleSearch() {

  }

  render() {
    const [completedCategories, allCategories] = computeCompletedCategories(this.props.categories, this.props.categories, this.props.tasks);
    const contentClassName = classnames('content', this.props.className);
    return (
      <main className={contentClassName}>
        <Container>
          <Row>
            <ProgressBar value={completedCategories} max={allCategories} />
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
                data={this.props.selectedCategory ? this.props.selectedCategory.tasks.map(t => this.props.tasks.find(task => task.id === t)) : this.props.foundTasks}
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

function mapStateToProps({ editMode, selected: { category: selectedCategory }, categories, tasks, search: { query } }) {
  const foundTasks = query.pristine ? [] : tasks.filter(task => task.title.toLowerCase().includes(query.title.toLowerCase()) && task.done === query.done);
  return { editMode, selectedCategory, categories, tasks, foundTasks };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...categoriesActions, ...taskActions}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
