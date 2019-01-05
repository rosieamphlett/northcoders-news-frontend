import React, { Component } from "react";
import pt from 'prop-types';
import {connect} from 'react-redux';
import * as actions from "../actions/actions.js";
import '../stylez/Article.css'

class Votes extends Component {
    state = {
        userVotes: 0,
    }

  render() {
      if (this.props.user) {
        return (
            <div>
                <button className="vote-button" disabled={this.state.userVotes > 0} onClick={() => {this.clickVote(this.props.path, "up")}}><span role="img" aria-label="emoji">👍</span></button>
                <span>{" "}{this.props.votes + this.state.userVotes} {" "}</span>
                <button className="vote-button" disabled={this.state.userVotes < 0} onClick={() => {this.clickVote(this.props.path, "down")}}><span role="img" aria-label="emoji">👎</span></button>
            </div>
        );
      } 
    else if(/comments/g.test(this.props.path) && !this.props.user) {
        return(<p>{''}</p>)
    }
    else {
        return <p className="log-in-to-vote">{this.props.votes} Votes<br /> Please log in to vote on articles and comments</p>
    }
  }

  clickVote = ((path, direction) => {
    let { userVotes } = this.state
    direction === "up" ? userVotes++ : userVotes--;
        this.setState ({
            userVotes
        })
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
      user: state.user
    };
  }

Votes.propTypes = {
  comments: pt.arrayOf(pt.object),
  user: pt.object,
  votes: pt.number
};

export default connect(MapStateToProps, mapDispatchToProps)(Votes);