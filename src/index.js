import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './App';
import Articles from './components/Articles';
import Article from './components/Article';
import Error from './components/Error';
import reducer from './reducers/reducer';
import './stylez/index.css';

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(<Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Articles} />
        <Route path="/topics/:topic" component={Articles} />
        <Route path="/articles/:article_id" component={Article} />
        <Route path="/users/:id" component={user} />
        <Route path="/*" component={Error} />
      </Route>
    </Router>
  </Provider>, document.getElementById('root'));