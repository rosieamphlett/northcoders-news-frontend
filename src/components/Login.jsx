import React, { Component } from "react";
import pt from "prop-types";
import * as actions from '../actions/actions';
import {connect} from 'react-redux';
import { Redirect } from "react-router-dom";

class Login extends Component {
  render() {
    let {user, error} = this.props
    if (error) {
      const pathname = `/error`
      const state = error
    return <Redirect to={{pathname, state}}></Redirect>
    } else
      return (
        <div>
          {!user ?
            <div className="full-login">
                <select className="login" onChange={this.selectUser}>
                <option>Log In Here</option>
                {this.props.users.map(user => (
                    <option className="select-options" value={user._id} name={user.name} key={user._id}>
                    {user.name}</option>)) 
                }</select>
            </div>
            : <div className="login-with-user">
              <img className="logged-in-pic"src={user.avatar_url} onError={event => event.target.src="http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg"} alt="user-pic" />
              <div className="logged-in-text">{user.name}</div>
                <button className="log-out" onClick={this.logOut}>Log out</button>
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
      error: state.error
    };
}

Login.propTypes = {
  logOut: pt.func,
  loggedInUser: pt.func,
  selectUser: pt.func,
  users: pt.arrayOf(pt.object)
};

export default connect(MapStateToProps, mapDispatchToProps)(Login);