import {isEqual} from 'lodash';
import * as types from '../actions/actionTypes';
import initialState from './initialState';

let idx;
let relIdx;
let newState;

function categoriesReducer(state = [], {type, payload}) {
    switch (type) {
        case types.LOAD_CATEGORIES_SUCCESS:
            return payload.categories;
        case types.CATEGORY_EXPAND:
            payload.expanded = !payload.expanded;
            idx = state.findIndex(cat => isEqual(cat, payload));
            newState = state.slice();
            newState.splice(idx, 1, payload);
            return newState;
        case types.ADD_CATEGORY_SUCCESS:
            console.log('success', payload);
            newState = state.map(cat => {
                if (cat._id === payload.category.parent) {
                    cat.categories.push(payload.category._id);
                }
                return cat;
            });
            return [payload.category, ...newState];
        case types.CATEGORY_EDIT:
            newState = state.map(cat => {
                if (isEqual(cat, payload)) {
                    cat.title = payload.title;
                }
                return cat;
            });
            return newState;
        case types.CATEGORY_DELETE:
            newState = state.map(cat => {
                cat.categories = cat.categories.filter(c => c !== payload._id);
                return cat;
            });
            idx = state.findIndex(cat => isEqual(cat, payload));
            newState.splice(idx, 1);
            return newState;
        default:
            return state;
    }
}

export default categoriesReducer;
