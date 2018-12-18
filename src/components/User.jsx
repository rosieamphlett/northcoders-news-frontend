import React, { Component } from "react";
import "../stylez/App.css";
import * as api from "../api";
import { Redirect } from "react-router-dom";
import pt from 'prop-types';

class User extends Component {
  state = {
    profile: {},
    error: null
  };

  componentDidMount() {
    api
      .fetchUserById(this.props.userId)
      .then(res => {
        if(res.type === 'error') {
          this.setState({
            error: res.error
          })
        } else {
          this.setState({
            profile: res[0]
          })
        }
      })
    }

  render() {
    if (this.state.error) {
      return <Redirect to={{pathname: '/error', state: this.state.error}} />
    } else {
      return (
        
        <div className="user-summary">
          <h3 className="username-heading"> {this.state.profile.username}</h3>
          <img className="avatar" src={this.state.profile.avatar_url} alt="user-avatar" onError={event =>
              (event.target.src =
                "http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg")
            }/>
        </div>
      );
    }
  }
}

User.propTypes = {
  articles: pt.arrayOf(pt.object),
  userId: pt.string
};

export default User;