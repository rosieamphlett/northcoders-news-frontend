import React, { Component } from "react";
// import '../stylez/App.css'
import pt from "prop-types";
import * as actions from '../actions/actions';
import {connect} from 'react-redux';


class Login extends Component {
  render() {
      return (
        <div>
          {!this.props.user ?
            <div><p className="login">Log In Below:</p>
                <select className="select" onChange={this.selectUser}>
                <option>Select a User</option>
                {this.props.users.map(user => (
                    <option className="select-options" value={user._id} name={user.name} key={user._id}>
                    {user.name}</option>)) 
                }</select>
            </div>
            : <div><p className="logged-in">Logged in as {this.props.user.name}</p>
                <button className="select" onClick={this.logOut}>Log out</button>
            </div>}
        </div>
      );
  }

  selectUser = (event) => {
    this.props.users.forEach(user => {
      if (user._id === event.target.value) {
        this.props.loggedInUser(user)
      }
    })
  }

  logOut = () => {
      this.props.loggedInUser(null)
  }
}

function mapDispatchToProps (dispatch) {
    return {
      loggedInUser: (user) => {
        dispatch(actions.loggedInUser(user))
      } 
    };
}

function MapStateToProps (state) {
    return {
      user: state.user,
    };
}

Login.propTypes = {
  logOut: pt.func,
  loggedInUser: pt.func,
  selectUser: pt.func,
  users: pt.arrayOf(pt.object)
};

export default connect(MapStateToProps, mapDispatchToProps)(Login);