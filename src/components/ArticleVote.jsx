import React, { Component } from "react";
import * as api from "../api.js";
import '../stylez/Articles.css';
import pt from "prop-types";

class articleVote extends Component {
  state = {
    userVote: 0,
  };

  render() {
    return (
      <div>
        <span>
          <div className="votes">Article votes: {this.props.votes + this.state.userVote}</div><br/>
          <button className="vote-button" disabled={!this.props.loggedInUser || this.state.userVote > 0} onClick={() => this.articleVote("up")}><span role="img" aria-label="emoji">👍</span></button> 
          <button className="vote-button" disabled={!this.props.loggedInUser || this.state.userVote < 0} onClick={() => this.articleVote("down")}><span role="img" aria-label="emoji">👎</span></button>
          {!this.props.loggedInUser ? <p>You must be logged in to vote!</p> : ''}
        </span>
      </div>
    );
  }

  articleVote = direction => {
    let {userVote} = this.state
      direction === "up" ? userVote++ : userVote--;
      this.setState({ 
        userVote
       });
      api.articleVoteApi(this.props.articleId, direction)
      .then(res => res.votes)
  }


}

articleVote.propTypes = {
  loggedInUser: pt.string,
  votes: pt.number
};


export default articleVote;