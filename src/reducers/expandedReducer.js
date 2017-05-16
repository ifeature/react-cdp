import * as types from '../actions/actionTypes';

function expandedReducer(state, action) {
    switch(action.type) {
        case types.CATEGORY_EXPAND:
            return {
                ...state,
                expanded: !action.payload.expanded
            };
        default:
            return state;
    }
}

export default expandedReducer;