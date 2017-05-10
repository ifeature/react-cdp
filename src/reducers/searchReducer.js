import * as types from '../actions/actionTypes';
import initialState from './initialState';

function searchReducer(state = initialState.search, action) {
    switch (action.type) {
        case types.SEARCH_TASK_REQUEST:
            return Object.assign(
                {},
                state,
                { query: { title: action.payload.title, done: action.payload.done } },
                { pristine: false }
                );
        case types.SEARCH_TASK_SUCCESS:
            return Object.assign(
                {},
                state,
                { data: action.payload.tasks }
            );
        case types.SEARCH_TASK_FAILURE:
            return Object.assign({}, initialState.search, { pristine: false, error: true });
        default:
            return state;
    }
}

export default searchReducer;
