import * as types from '../actions/actionTypes';

function categoryReducer(state, action) {
    switch(action.type) {
        case types.UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                title: action.payload.data.title
            };
        default:
            return state;
    }
}

export default categoryReducer;