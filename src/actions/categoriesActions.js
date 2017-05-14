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


export function editCategory(config) {
    return dispatch => {
        dispatch(editCategoryRequest(config));
        return api.updateCategory(config)
            .then(result => {
                dispatch(editCategorySuccess(result));
            })
            .catch(error => {
                dispatch(editCategoryFailure(error));
            });
    }
}

export function editCategoryRequest(result) {
    return {
        type: types.UPDATE_CATEGORY_REQUEST,
        payload: result
    };
}

export function editCategorySuccess(result) {
    return {
        type: types.UPDATE_CATEGORY_SUCCESS,
        payload: result
    };
}

export function editCategoryFailure(error) {
    return {
        type: types.UPDATE_CATEGORY_FAILURE,
        error: true,
        payload: error
    };
}





export function deleteCategory(config) {
    return dispatch => {
        dispatch(deleteCategoryRequest(config));
        return api.deleteCategory(config)
            .then(result => {
                dispatch(deleteCategorySuccess(result));
            })
            .catch(error => {
                dispatch(deleteCategoryFailure(error));
            });
    }
}

export function deleteCategoryRequest(result) {
    return {
        type: types.DELETE_CATEGORY_REQUEST,
        payload: result
    };
}

export function deleteCategorySuccess(result) {
    return {
        type: types.DELETE_CATEGORY_SUCCESS,
        payload: result
    };
}

export function deleteCategoryFailure(error) {
    return {
        type: types.DELETE_CATEGORY_FAILURE,
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

export function categoryDelete(category) {
    return {
        type: types.CATEGORY_DELETE,
        payload: category
    };
}
