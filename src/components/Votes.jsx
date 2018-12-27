import React, { Component } from "react";
import * as api from "../api.js";
import '../stylez/Comments.css';
import pt from 'prop-types';

class Votes extends Component {
  state = {
    vote: 0
  };

  render() {
    if (/comments/g.test(this.props.path) || this.props.loggedInUser) {
      return (
        <div>
            <button className="vote-button" disabled={!this.props.loggedInUser || this.state.vote > 0} onClick={() => {this.clickVote("up")}}><span role="img" aria-label="emoji">👍</span></button>
            <span className="commentVotes">{" "}{this.props.votes + this.state.vote} {" "}</span>
            <button className="vote-button" disabled={!this.props.loggedInUser || this.state.vote < 0} onClick={() => {this.clickVote("down")}}><span role="img" aria-label="emoji">👎</span></button>
        </div>
      );
    } else if (!(/comments/g.test(this.props.path)) && !this.props.loggedInUser) {
      return <p>You must be logged in to vote!</p>
    }
  }

  clickVote = direction => {
    let { vote } = this.state
    direction === "up" ? vote++ : vote--;
    this.setState({ 
      vote
    });
    api.changeVotes(this.props.path, direction)
    .then(res => res.votes);
  };
}

Votes.propTypes = {
  comments: pt.arrayOf(pt.object),
  loggedInUser: pt.string,
  votes: pt.number
};

export default Votes;