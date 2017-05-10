import initialState from './initialState';
import * as types from '../actions/actionTypes';

let newState;

function tasksReducer(state = initialState.tasks, action) {
  switch (action.type) {
    case types.TASK_ADD:
      return [...state, action.payload];
    case types.TASK_EDIT:
      newState = state.map(task => {
        if (task.id === action.payload.id) {
          task = action.payload;
        }
        return task;
      });
      return state;
    default:
      return state;
  }
}

export default tasksReducer;
