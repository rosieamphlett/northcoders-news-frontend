import React, { Component } from "react";
import PropTypes from 'prop-types';
import "../src/stylez/App.css";
import { Link} from "react-router-dom";

// import Login from "./components/Login";
import Nav from './components/Nav';


class App extends Component { 

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Link to="/" className="App-title"><h1>Northcoders News</h1></Link>
        </header><br/>
        {/* <Login users={this.state.users} loggedInUser={this.state.loggedInUser} selectUser={this.selectUser} logOut={this.logOut}/><br/> */}
        <Nav />
    
        {this.props.children}
      </div>
    );
  }
}


App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;