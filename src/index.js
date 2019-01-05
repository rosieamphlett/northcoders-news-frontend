import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';

import App from './App';
import Articles from './components/Articles';
import Article from './components/Article';
// import User from './components/User';
// import Error from './components/Error';
import reducer from './reducers/reducer';
import './stylez/index.css';

const store = createStore(reducer, applyMiddleware(thunk));
export const history = createBrowserHistory();

ReactDOM.render(
<Provider store={store}>
    <Router history={history}>
        <App>
            <Switch>
                <Route exact path="/" component={Articles} />
                <Route path="/topics/:topic" component={Articles} />
                <Route path="/articles/:article_id" component={Article}/>
                {/* <Route path="/users/:id" component={User} />
                <Route path="/*" component={Error} /> */}
            </Switch>
        </App>
    </Router>
  </Provider>, document.getElementById('root'));