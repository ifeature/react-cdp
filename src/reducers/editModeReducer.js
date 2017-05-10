import * as types from '../actions/actionTypes';
import initialState from './initialState';

function editModeReducer(state = initialState.editMode, action) {
  switch (action.type) {
    case types.EDIT_MODE_ON:
      return true;
    case types.EDIT_MODE_OFF:
      return false;
    default:
      return state;
  }
}

export default editModeReducer;
