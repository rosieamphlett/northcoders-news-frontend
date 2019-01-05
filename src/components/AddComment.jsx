import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/actions';
import '../stylez/AddComment.css'

class AddComment extends Component {
  state = {
    commentBody: ""
  };

  render() {
    if(this.props.user) {
      return (
    <div className="add-comment">
      <h2 className="add-a-comment-title">Add a comment</h2>
          <textarea className="post-comment-box" placeholder="Write your comment here..." cols="50"
              rows="5" type="text" value={this.state.commentBody} onChange={this.addCommentText}/><br/>
          <button className="post-btn" onClick={() => this.addComment(this.props.article_id, this.state.commentBody)
            }>Post</button><br/><br/>
    </div>);
    } else return <p className="add-comment-login">Please log in to add a comment</p>
  }

  addCommentText = event => {
    this.setState({ 
      commentBody: event.target.value 
    })
  };

  addComment = (article_id, data) => {
    data = {
      body: data,
      created_by: this.props.user._id
    };
    this.props.postNewComment(article_id, data)
  };
}

function mapDispatchToProps (dispatch) {
  return {
    postNewComment: function (id, newComment) {
      dispatch(actions.postNewComment(id, newComment));
    },
    fetchComments: function (id) {
      dispatch(actions.fetchComments(id))
    }
  };
}

function MapStateToProps (state) {
    return {
        selectedComments: state.selectedComments,
        user: state.user
    };
}

AddComment.propTypes = {
  article_id: PropTypes.string.isRequired,
  user: PropTypes.object,
  selectedComments: PropTypes.array
}

export default connect(MapStateToProps, mapDispatchToProps)(AddComment);