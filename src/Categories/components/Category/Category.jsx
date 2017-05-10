import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Button } from 'reactstrap';

import './Category.css';

function Category({
  title,
  editMode,
  expandable,
  selected,
  expanded,
  onCategorySelect,
  onCategoryAddRequest,
  onCategoryEditRequest,
  onCategoryDelete,
  onCategoryExpand
}) {
  const categoryClassName = classnames(
    'category',
    {
      'category_active': selected
    }
  );
  function renderButtons() {
    if (editMode) {
      return (
        <div className="button-group d-inline-block">
          <Button size="sm">
            <i className="fa fa-share"></i>
          </Button>
        </div>
      );
    }
    return (
      <div className="button-group d-inline-block">
        <Button size="sm" onClick={onCategoryEditRequest}>
          <i className="fa fa-pencil-square-o"></i>
        </Button>
        <Button size="sm" onClick={onCategoryDelete}>
          <i className="fa fa-trash-o"></i>
        </Button>
        <Button size="sm" onClick={onCategoryAddRequest}>
          <i className="fa fa-plus-square-o"></i>
        </Button>
    </div>
    );
  }
  return (
    <div className={categoryClassName} onClick={onCategorySelect}>
      {
        expandable &&
        <Button size="sm" onClick={onCategoryExpand}>
          {
            expanded ?
            <i className="fa fa-chevron-up"></i> :
            <i className="fa fa-chevron-down"></i>
          }
        </Button>
      }
      <span className="category__title">{title}</span>
      {renderButtons()}
    </div>
  );
}

Category.propTypes = {
  title: PropTypes.string.isRequired,
  expandable: PropTypes.bool,
  expanded: PropTypes.bool.isRequired,
  onCategorySelect: PropTypes.func.isRequired,
  onCategoryDelete: PropTypes.func.isRequired,
  onCategoryExpand: PropTypes.func
};

Category.defaulProps = {
  expandable: false
};

export default Category;
