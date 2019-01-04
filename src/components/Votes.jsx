import React, { Component } from "react";
import '../stylez/Comments.css';
// import pt from 'prop-types';
import {connect} from 'react-redux';
import * as actions from "../actions/actions.js";

class Votes extends Component {
    state = {
        userVotes: 0,
    }

  render() {
      console.log(this.state.userVotes)
      return (
        <div>
            <button className="vote-button" disabled={this.state.userVotes > 0} onClick={() => {this.clickVote(this.props.path, "up")}}><span role="img" aria-label="emoji">👍</span></button>
            <span className="commentVotes">{" "}{this.props.votes + this.state.userVotes} {" "}</span>
            <button className="vote-button" disabled={this.state.userVotes < 0} onClick={() => {this.clickVote(this.props.path, "down")}}><span role="img" aria-label="emoji">👎</span></button>
        </div>
      );
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

// Votes.propTypes = {
//   comments: pt.arrayOf(pt.object),
//   user: pt.object,
//   votes: pt.number
// };

export default connect(mapDispatchToProps)(Votes);