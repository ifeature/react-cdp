import initialState from './initialState';
import * as types from '../actions/actionTypes';

let newState;

function tasksReducer(state = [], action) {
    switch (action.type) {
        case types.TASK_ADD:
            return [...state, action.payload];
        case types.TASK_EDIT:
            newState = state.map(task => {
                if (task._id === action.payload._id) {
                    task = action.payload;
                }
                return task;
            });
            return state;
        case types.LOAD_TASKS_SUCCESS:
            return action.payload.tasks;
        default:
            return state;
    }
}

export default tasksReducer;
