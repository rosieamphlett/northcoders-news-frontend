import React, { Component } from "react";
import "../stylez/Comments.css";
import pt from "prop-types";

class AddComment extends Component {
  state = {
    commentBody: ""
  };

  render() {
    return (
    <div>
          <textarea className="post-comment-box" placeholder="Write your comment here..." cols="50"
              rows="5" type="text" value={this.state.commentBody} onChange={this.addCommentText}/><br/>
          <button className="select" onClick={() => { 
              this.props.addComment(this.props.articleid, this.state.commentBody);
            }}>Post My Comment!</button><br/><br/>
    </div>);
  }

  addCommentText = event => {
    this.setState({ commentBody: event.target.value })
  };

}

AddComment.propTypes = {
  comments: pt.arrayOf(pt.object)
};

export default AddComment;