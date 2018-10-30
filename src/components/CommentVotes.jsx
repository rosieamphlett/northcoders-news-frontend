import React, { Component } from "react";
import * as api from "../api.js";
import '../stylez/Comments.css';
import pt from 'prop-types';

class CommentVotes extends Component {
  state = {
    comVote: 0,
    isButtonDisabled: false
  };

  render() {
    return (
      <div>
          <button className="vote-button" disabled={!this.props.loggedInUser || this.state.isButtonDisabled} onClick={() => {this.commentVote("up")}}><span role="img" aria-label="emoji">👍</span></button>
          <span className="commentVotes">{" "}{this.props.votes + this.state.comVote} {" "}</span>
          <button className="vote-button" disabled={!this.props.loggedInUser || this.state.isButtonDisabled} onClick={() => { this.commentVote("down")}}><span role="img" aria-label="emoji">👎</span></button>
      </div>
    );
  }

  commentVote = direction => {
    let comVote = this.state.comVote;
    direction === "up" ? comVote++ : comVote--;
    this.setState({ 
      comVote: comVote,
      isButtonDisabled: true 
    });
    api.changeCommentVote(this.props.commentId, direction).then(res => {
      return res.data;
    });
  };
}

CommentVotes.propTypes = {
  comments: pt.arrayOf(pt.object),
  loggedInUser: pt.string,
  votes: pt.number
};

export default CommentVotes;