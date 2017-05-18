import * as types from '../actions/actionTypes';
import expandedReducer from './expandedReducer';
import categoryReducer from './categoryReducer';

let idx;
let newState;

function categoriesReducer(state = [], {type, payload}) {
    switch (type) {
        case types.LOAD_CATEGORIES_SUCCESS:
            return payload.categories;
        case types.CATEGORY_EXPAND:
            return state.map(category => {
                return expandedReducer(category, { type, payload })
            });
        case types.ADD_CATEGORY_SUCCESS:
            newState = state.map(cat => {
                if (cat._id === payload.category.parent) {
                    cat.categories.push(payload.category._id);
                }
                return cat;
            });
            return [payload.category, ...newState];
        case types.UPDATE_CATEGORY_SUCCESS:
            newState = state.map(cat => {
                if (cat._id === payload.data._id) {
                    return categoryReducer(cat, { type, payload });
                }
            });
            return newState;
        case types.DELETE_CATEGORY_SUCCESS:
            newState = state.map(cat => {
                cat.categories = cat.categories.filter(c => c !== payload.data._id);
                return cat;
            });
            idx = state.findIndex(cat => cat._id === payload.data._id);
            newState.splice(idx, 1);
            return newState;
        default:
            return state;
    }
}

export default categoriesReducer;
