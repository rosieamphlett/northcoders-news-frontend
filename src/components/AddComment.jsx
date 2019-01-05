import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/actions';

class AddComment extends Component {
  state = {
    commentBody: ""
  };

  render() {
    return (
    <div>
          <textarea className="post-comment-box" placeholder="Write your comment here..." cols="50"
              rows="5" type="text" value={this.state.commentBody} onChange={this.addCommentText}/><br/>
          <button className="select" onClick={() => this.addComment(this.props.article_id, this.state.commentBody)
            }>Post My Comment!</button><br/><br/>
    </div>);
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