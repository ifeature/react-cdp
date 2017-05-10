import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import classnames from 'classnames';

import Category from '../Category';

function collapseCategories(categories, allCategories) {
  categories.forEach(category => {
    const cat = allCategories.find(c => c.id === category);
    cat.expanded = false;
    if (cat.categories.length > 0) {
      collapseCategories(cat.categories);
    }
  });
}

class Tree extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
    selectedCategory: PropTypes.object,
    onCategorySelect: PropTypes.func.isRequired,
    className: PropTypes.string
  };

  static get defaultProps() {
    return {
      selectedCategory: null,
      className: ''
    };
  };

  constructor(props, context) {
    super(props, context);
    this.handleCategoryExpand = this.handleCategoryExpand.bind(this);
  }

  renderTree(data, parent = null) {
    const listClassName = classnames('categories__list');
    return (
      <ul className={listClassName}>
        {
          data.map(category => {
            const categories = category.categories.map(id => this.props.data.find(c => c.id === id));
            const selected = isEqual(category, this.props.selectedCategory);
            const expandable = categories.length > 0;
            const expanded = category.expanded;
            const handleCategoryExpand = expandable ? this.handleCategoryExpand.bind(this, category) : null;
            return (
              (category.parent === parent || category.parent === null) &&
              <li key={category.id} className="categories__item">
                <Category
                  title={category.title}
                  editMode={this.props.editMode}
                  expandable={expandable}
                  expanded={expanded}
                  selected={selected}
                  onCategoryDelete={this.props.onCategoryDelete.bind(this, category)}
                  onCategorySelect={this.props.onCategorySelect.bind(this, category)}
                  onCategoryAddRequest={this.props.onCategoryAddRequest.bind(this, category.id)}
                  onCategoryEditRequest={this.props.onCategoryEditRequest.bind(this, category)}
                  onCategoryExpand={handleCategoryExpand}
                  />
                { expandable && expanded && this.renderTree(categories, category.id) }
              </li>
            );
          })
        }
      </ul>
    );
  }

  handleCategoryExpand(category) {
    if (!category.expanded) {
      collapseCategories(category.categories, this.props.data);
    }
    this.props.onCategoryExpand(category);
  }

  render() {
    return (
      <div className="categories__tree">
        {this.renderTree(this.props.data)}
      </div>
    );
  }
}

export default Tree;
