import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { Container } from 'reactstrap';

import * as taskActions from '../actions/tasksActions';
import * as categoriesActions from '../actions/categoriesActions';

import configureStore from '../store';
import { Header } from '../Common';
import Content from '../Content';
import './App.css';

const store = configureStore();
const history = createHistory();

store.dispatch(taskActions.loadTasks());
store.dispatch(categoriesActions.loadCategories());

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Container className="todo-app">
            <Header className="todo-app__header" title="To-Do List" />
            <Content className="todo-app__content" />
          </Container>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
