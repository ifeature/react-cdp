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

export function searchTaskRequest(result) {
    return {
        type: types.SEARCH_TASK_REQUEST,
        payload: result
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

export function loadTasks(config) {
    return dispatch => {
        dispatch(loadTasksRequest(config));
        return api.loadTasks(config)
            .then(result => {
                dispatch(loadTasksSuccess(result));
            })
            .catch(error => {
                dispatch(loadTasksFailure(error));
            });
    }
}

export function loadTasksRequest(result) {
    return {
        type: types.LOAD_TASKS_REQUEST,
        payload: result
    };
}

export function loadTasksSuccess(result) {
    return {
        type: types.LOAD_TASKS_SUCCESS,
        payload: result
    };
}

export function loadTasksFailure(error) {
    return {
        type: types.LOAD_TASKS_FAILURE,
        error: true,
        payload: error
    };
}

export function addTask(config) {
    return dispatch => {
        dispatch(addTaskRequest(config));
        return api.addTask(config)
            .then(result => {
                dispatch(addTaskSuccess(result));
            })
            .catch(error => {
                dispatch(addTaskFailure(error));
            });
    }
}

export function addTaskRequest(result) {
    return {
        type: types.ADD_TASK_REQUEST,
        payload: result
    };
}

export function addTaskSuccess(result) {
    return {
        type: types.ADD_TASK_SUCCESS,
        payload: result
    };
}

export function addTaskFailure(error) {
    return {
        type: types.ADD_TASK_FAILURE,
        error: true,
        payload: error
    };
}




export function editTask(config) {
    return dispatch => {
        dispatch(editTaskRequest(config));
        return api.editTask(config)
            .then(result => {
                dispatch(editTaskSuccess(result));
            })
            .catch(error => {
                dispatch(editTaskFailure(error));
            });
    }
}

export function editTaskRequest(result) {
    return {
        type: types.UPDATE_TASK_REQUEST,
        payload: result
    };
}

export function editTaskSuccess(result) {
    return {
        type: types.UPDATE_TASK_SUCCESS,
        payload: result
    };
}

export function editTaskFailure(error) {
    return {
        type: types.UPDATE_TASK_FAILURE,
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
