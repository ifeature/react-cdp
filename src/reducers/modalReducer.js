import * as types from '../actions/actionTypes';
import initialState from './initialState';

function modalReducer(state = initialState.modal, action) {
    switch (action.type) {
        case types.OPEN_MODAL:
            return true;
        case types.CLOSE_MODAL:
            return false;
        default:
            return state;
    }
}

export default modalReducer;
