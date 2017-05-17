import 'whatwg-fetch';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../src/actions/categoriesActions';
import * as types from '../../src/actions/actionTypes';
import nock from 'nock';

// jest.mock('../../src/Api', () => {
//     return class Api {
//         loadCategories() {
//             return Promise.resolve({ categories: ['do something']  });
//         }
//     };
// });

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
    afterEach(() => {
        nock.cleanAll()
    });

    it('creates LOAD_CATEGORIES_SUCCESS when fetching categories has been done', () => {
        nock('http://localhost')
            .get('/categories')
            .reply(200, { payload: { categories: ['do something'] }});

        const expectedActions = [
            { type: types.LOAD_CATEGORIES_REQUEST, payload: undefined },
            { type: types.LOAD_CATEGORIES_SUCCESS, payload: { categories: ['do something']  } }
        ];
        const store = mockStore({ categories: [] });

        return store.dispatch(actions.loadCategories())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            });
    });
});