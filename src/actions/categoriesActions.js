import * as types from './actionTypes';

export function categoryExpand(category) {
    return {
      type: types.CATEGORY_EXPAND,
      payload: category
    };
}

export function categoryAdd(category) {
    return {
      type: types.CATEGORY_ADD,
      payload: category
    };
}

export function categorySelect(category) {
    return {
      type: types.CATEGORY_SELECT,
      payload: category
    };
}

export function categoryEdit(category) {
    return {
      type: types.CATEGORY_EDIT,
      payload: category
    };
}

export function categoryDelete(category) {
  return {
    type: types.CATEGORY_DELETE,
    payload: category
  };
}
