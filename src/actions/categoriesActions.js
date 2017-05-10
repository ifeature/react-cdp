import * as types from './actionTypes';
import Api from '../Api';

const api = new Api();

/**
 * Load categories
 * @param config
 * @returns {function(*)}
 */
export function loadCategories(config) {
    return dispatch => {
        dispatch(loadCategoriesRequest(config));
        return api.loadCategories(config)
            .then(result => {
                dispatch(loadCategoriesSuccess(result));
            })
            .catch(error => {
                dispatch(loadCategoriesFailure(error));
            });
    }
}

export function loadCategoriesRequest(result) {
    return {
        type: types.LOAD_CATEGORIES_REQUEST,
        payload: result
    };
}

export function loadCategoriesSuccess(result) {
    return {
        type: types.LOAD_CATEGORIES_SUCCESS,
        payload: result
    };
}

export function loadCategoriesFailure(error) {
    return {
        type: types.LOAD_CATEGORIES_FAILURE,
        error: true,
        payload: error
    };
}


/**
 * Add category
 * @param config
 * @returns {function(*)}
 */
export function addCategory(config) {
    return dispatch => {
        dispatch(addCategoryRequest(config));
        return api.addCategory(config)
            .then(result => {
                dispatch(addCategorySuccess(result));
            })
            .catch(error => {
                dispatch(addCategoryFailure(error));
            });
    }
}

export function addCategoryRequest(result) {
    return {
        type: types.ADD_CATEGORY_REQUEST,
        payload: result
    };
}

export function addCategorySuccess(result) {
    return {
        type: types.ADD_CATEGORY_SUCCESS,
        payload: result
    };
}

export function addCategoryFailure(error) {
    return {
        type: types.ADD_CATEGORY_FAILURE,
        error: true,
        payload: error
    };
}




export function categoryExpand(category) {
    return {
        type: types.CATEGORY_EXPAND,
        payload: category
    };
}

export function categorySelect(category) {
    return {
        type: types.CATEGORY_SELECT,
        payload: category
    };
}

export function categoryEdit(category) {
    return {
        type: types.CATEGORY_EDIT,
        payload: category
    };
}

export function categoryDelete(category) {
    return {
        type: types.CATEGORY_DELETE,
        payload: category
    };
}
