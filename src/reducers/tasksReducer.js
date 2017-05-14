import * as types from '../actions/actionTypes';

let newState;

function tasksReducer(state = [], action) {
    switch (action.type) {
        case types.ADD_TASK_SUCCESS:
            return [...state, action.payload.data];
        case types.UPDATE_TASK_SUCCESS:
            newState = state.map(task => {
                if (task._id === action.payload.data._id) {
                    task = action.payload.data;
                }
                return task;
            });
            return newState;
        case types.LOAD_TASKS_SUCCESS:
            return action.payload.tasks;
        default:
            return state;
    }
}

export default tasksReducer;
