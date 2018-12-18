import React, { Component } from "react";
import "../src/stylez/App.css";
import { Link, Route, Switch } from "react-router-dom";
import Articles from "./components/Articles";
import Article from "./components/Article";
import User from "./components/User";
import Error from "./components/Error";
import Login from "./components/Login";
import Nav from './components/Nav';
import * as api from "./api";

class App extends Component {
  state = {
    articles: [],
    users: [],
    loggedInUser: '',
    loggedInID: '',
    error: null
  };
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Link to="/" className="App-title"><h1>Northcoders News</h1></Link>
        </header><br/>
        <Login users={this.state.users} loggedInUser={this.state.loggedInUser} selectUser={this.selectUser} logOut={this.logOut}/><br/>
        <Nav />
    
        <div>
          <Switch>
          <Route exact path="/" render={() => (<Articles articles={this.state.articles} handleError={this.handleError}/>)}/>
          <Route exact path="/topics/:slug" render={props => (<Articles handleError={this.handleError} slugId={props.match.params.slug} articles={this.state.articles}/>)}/>
          <Route exact path="/articles/:id" render={props => (<Article loggedInID={this.state.loggedInID} handleError={this.handleError} articleId={props.match.params.id} articles={this.state.articles} loggedInUser={this.state.loggedInUser}/>)}/>
          <Route exact path="/users/:id" render={props => (<User userId={props.match.params.id} handleError={this.handleError}/>)}/>
          <Route path="/*" component={Error}/>
          </Switch>
        </div>
      </div>
    );
  }
 
  componentDidMount() {
    return Promise.all([api.fetchArticles(),api.fetchUsers()])
    .then(([articlesData, usersData]) => {
      this.setState({
        articles: articlesData,
        users: usersData.data.users
      });
    })
  }

  selectUser = (event) => {
    this.setState({ 
      loggedInID: event.target.value
    }, 
    () => this.state.users.forEach(user => {
      if (user._id === this.state.loggedInID) {
        this.setState ({ loggedInUser: user.name});
      }
    }))
  }
    
  logOut = () => {
    this.setState ({
      loggedInUser: '',
      loggedInID: ''
    })
  }

  handleError = (error) => {
    this.setState({
      error
    })
  }
}

export default App;