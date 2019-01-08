import React, { Component } from "react";
import pt from 'prop-types';
import {connect} from 'react-redux';
import { Redirect } from "react-router-dom";
import * as actions from "../actions/actions.js";
import '../stylez/Article.css'

class Votes extends Component {
    state = {
        userVotes: 0
    }

  render() {
    let {error, user, path, votes} = this.props
    if (error) {
        const pathname = `/error`
        const state = error
      return <Redirect to={{pathname, state}}></Redirect>
      } else
      if (user) {
        return (
            <div>
                <button className="vote-button" disabled={this.state.userVotes > 0} onClick={() => {this.clickVote(path, "up")}}><span role="img" aria-label="emoji">👍</span></button>
                <span>{" "}{votes + this.state.userVotes} {" "}</span>
                <button className="vote-button" disabled={this.state.userVotes < 0} onClick={() => {this.clickVote(path, "down")}}><span role="img" aria-label="emoji">👎</span></button>
            </div>
        );
      } 
    else if(/comments/g.test(path) && !user) {
        return(<p>{''}</p>)
    }
    else {
        return <p className="log-in-to-vote">{votes} Votes<br /> Please log in to vote on articles and comments</p>
    }
  }

  clickVote = ((path, direction) => {
    let { userVotes } = this.state
    direction === "up" ? userVotes++ : userVotes--;
        this.setState ({
            userVotes
        })
        this.props.changeVote(path, direction)
    })
}

function mapDispatchToProps (dispatch) {
    return {
      changeVote: (path, direction) => {
        dispatch(actions.changeVote(path, direction))
      }
    };
}

function MapStateToProps (state) {
    return {
      user: state.user,
      error: state.error
    };
  }

Votes.propTypes = {
  comments: pt.arrayOf(pt.object),
  user: pt.object,
  votes: pt.number
};

export default connect(MapStateToProps, mapDispatchToProps)(Votes);