import {combineReducers} from 'redux';
import initialState from './initialState';
import * as types from '../actions/actionTypes';

function selectedReducer(state = initialState.selected, action) {
    switch (action.type) {
        case types.SEARCH_TASK_SUCCESS:
            return {...state, category: null};
        case types.ADD_TASK_SUCCESS:
            const c = state.category;
            c.tasks.push(action.payload.data._id);
            return {...state, ...c};
        case types.CATEGORY_SELECT:
            return {...state, category: action.payload};
        case types.TASK_SELECT:
            return {...state, task: action.payload};
        default:
            return state;
    }
}

export default selectedReducer;
