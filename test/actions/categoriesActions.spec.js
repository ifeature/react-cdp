import * as actions from '../../src/actions/categoriesActions';
import * as types from '../../src/actions/actionTypes';

jest.mock('../../src/Api');

describe('actions', () => {
    describe('categoriesActions', () => {
        it('should create LOAD_CATEGORIES_SUCCESS action', () => {
            const data = [
                {
                    _id: '591c25ced31b6a371a223d66',
                    title: 'Category1',
                    parent: null,
                    expanded: false,
                    tasks: [],
                    categories: []
                },
                {
                    _id: '591c25d3d31b6a371a223d67',
                    title: 'Category2',
                    parent: null,
                    expanded: false,
                    tasks: [],
                    categories: []
                },
            ];
            const expectedAction = {
                type: types.LOAD_CATEGORIES_SUCCESS,
                payload: data
            };
            expect(actions.loadCategoriesSuccess(data)).toEqual(expectedAction);
        })
    });
});