import React, { Component } from "react";
import "../stylez/App.css";
import { Redirect } from "react-router-dom";
import pt from 'prop-types';
import Login from './Login';
import Nav from './Nav'
import * as actions from '../actions/actions';
import {connect} from 'react-redux';

class User extends Component {
  componentDidMount() {
    this.props.fetchUserId(this.props.match.params.id);
    this.props.fetchUsers();
    this.props.fetchTopics();
  }

  render() {
    let {error, userProfile, topics, users } = this.props
    if (error) {
      return <Redirect to={{pathname: '/error', state: error}} />
    } else {
      return (
        <div>
        <Nav topics={topics}/>
        <Login users={users}/>
        <div className="user-summary">
            <h1>{userProfile.username}</h1>
            <h2>{userProfile.name}</h2>
            <img className="user-avatar" src={userProfile.avatar_url} onError={event => event.target.src="http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg"} alt="user-avatar" />
        </div>
        </div>
      );
    }
    }         
}

function mapDispatchToProps (dispatch) {
    return {
      fetchUserId: (id) => {
          dispatch(actions.fetchUserId(id))
      },
      fetchTopics: () => {
        dispatch(actions.fetchTopics())
      },
      fetchUsers: () => {
        dispatch(actions.fetchUsers());
      }
    };
}

function MapStateToProps (state) {
    return {
        userProfile: state.userProfile,
      loading: state.loading,
      error: state.error,
      users: state.users,
      topics: state.topics
    };
}


User.propTypes = {
    userProfile: pt.object,
    fetchUserId: pt.func 
};

export default connect(MapStateToProps, mapDispatchToProps)(User);