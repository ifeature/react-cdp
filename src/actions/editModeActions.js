import * as types from './actionTypes';

export function editModeOn() {
  return {
    type: types.EDIT_MODE_ON
  };
}

export function editModeOff() {
  return {
    type: types.EDIT_MODE_OFF
  };
}
