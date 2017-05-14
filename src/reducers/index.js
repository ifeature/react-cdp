import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';

import categories from './categoriesReducer';
import tasks from './tasksReducer';
import search from './searchReducer';
import selected from './selectedReducer';
import editMode from './editModeReducer';
import modal from './modalReducer';

const rootReducer = combineReducers({
    routing,
    modal,
    editMode,
    selected,
    categories,
    tasks,
    search
});

export default rootReducer;
