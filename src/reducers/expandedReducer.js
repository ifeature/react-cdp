import { isEqual } from 'lodash';
import * as types from '../actions/actionTypes';

function expandedReducer(state, action) {
    switch(action.type) {
        case types.CATEGORY_EXPAND:
            if (isEqual(state, action.payload)) {
                return {
                    ...state,
                    expanded: !action.payload.expanded
                };
            }
            return state;
        default:
            return state;
    }
}

export default expandedReducer;