import React from 'react';
import PropTypes from 'prop-types';

import { Add } from '../Common';
import { Tree } from './components';
import './Categories.css';

function Categories({
  data,
  editMode,
  selectedCategory,
  onCategoryAdd,
  onCategoryAddRequest,
  onCategoryEditRequest,
  onCategoryDelete,
  onCategorySelect,
  onCategoryExpand
}) {
  return (
    <section className="categories">
      <Add
        onAdd={onCategoryAdd}
        className="categories__add"
        name="category"
        placeholder="Enter category title"
        />
      <Tree
        data={data}
        editMode={editMode}
        selectedCategory={selectedCategory}
        onCategorySelect={onCategorySelect}
        onCategoryAddRequest={onCategoryAddRequest}
        onCategoryEditRequest={onCategoryEditRequest}
        onCategoryDelete={onCategoryDelete}
        onCategoryExpand={onCategoryExpand}
        className="categories__tree"
        />
    </section>
  );
}

Categories.propTypes = {
  data: PropTypes.array.isRequired,
  selectedCategory: PropTypes.object,
  onCategoryAdd: PropTypes.func.isRequired,
  onCategoryDelete: PropTypes.func.isRequired,
  onCategorySelect: PropTypes.func.isRequired,
  onCategoryExpand: PropTypes.func.isRequired
};

Categories.defaultProps = {
  selectedCategory: null
};

export default Categories;
