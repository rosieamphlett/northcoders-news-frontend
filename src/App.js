import React, { Component } from "react";
import "../src/stylez/App.css";
import { Link, Route, Switch } from "react-router-dom";
import Articles from "./components/Articles";
import Article from "./components/Article";
import User from "./components/User";
import Error from "./components/Error";
import Login from "./components/Login";
import Nav from './components/Nav';
import moment from 'moment';
import * as api from "./api";

class App extends Component {
  state = {
    articles: [],
    users: [],
    loggedInUser: '',
    loggedInID: '',
    user : {},
    error: null
  };
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Link to="/" className="App-title"><h1>Northcoders News</h1></Link>
        </header><br/>
        <Login users={this.state.users} loggedInUser={this.state.loggedInUser} selectUser={this.selectUser} logOut={this.logOut}/><br/>
        <Nav user={this.state.user} loggedInUser={this.state.loggedInUser}addContent={this.addContent}/>
    
        {this.props.children}
      </div>
    );
  }
 
  componentDidMount() {
    return Promise.all([api.fetchArticles(),api.fetchUsers()])
    .then(([articlesData, usersData]) => {
      articlesData = articlesData.sort((a, b) => {
        return moment(b.created_at).diff(moment(a.created_at), "seconds");
      })
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
        this.setState ({ 
          loggedInUser: user.name,
          user 
        });
      }
    }))
  }
    
  logOut = () => {
    this.setState ({
      loggedInUser: '',
      loggedInID: ''
    })
  }

  addContent = (content) => {
    let articles = [...this.state.articles, content]
    articles = articles.sort((a, b) => {
      return moment(b.created_at).diff(moment(a.created_at), "seconds");
    })
    this.setState({
        articles
    })
}

  handleError = (error) => {
    this.setState({
      error
    })
  }
}

export default App;