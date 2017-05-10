import * as types from '../actions/actionTypes';
import initialState from './initialState';

function searchReducer(state = initialState.search, action) {
    switch (action.type) {
        case types.SEARCH_TASK_REQUEST:
            return Object.assign(
                {},
                state,
                {
                    query: {
                        title: action.payload.title,
                        done: action.payload.done,
                        pristine: false
                    }
                });
        default:
            return state;
    }
}

export default searchReducer;
