import * as types from './actionTypes';
import Api from '../Api';

const api = new Api();

export function searchTask(config) {
    return dispatch => {
        dispatch(searchTaskRequest(config));
        return api.search(config)
            .then(result => {
                dispatch(searchTaskSuccess(result));
            })
            .catch(error => {
                dispatch(searchTaskFailure(error));
            });
    }
}

export function searchTaskRequest(task) {
    return {
        type: types.SEARCH_TASK_REQUEST,
        payload: task
    };
}

export function searchTaskSuccess(result) {
    return {
        type: types.SEARCH_TASK_SUCCESS,
        payload: result
    };
}

export function searchTaskFailure(error) {
    return {
        type: types.SEARCH_TASK_FAILURE,
        error: true,
        payload: error
    };
}

export function tasksEdit(task) {
    return {
        type: types.TASK_EDIT,
        payload: task
    };
}

export function taskSelect(task) {
    return {
        type: types.TASK_SELECT,
        payload: task
    }
}

export function taskAdd(task) {
    return {
        type: types.TASK_ADD,
        payload: task
    }
}
