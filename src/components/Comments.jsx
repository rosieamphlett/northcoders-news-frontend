import React, { Component } from "react";
import pt from "prop-types";
import * as api from "../api.js";
import moment from "moment";
import CommentVotes from "./CommentVotes";
import '../stylez/Comments.css';
import AddComment from './AddComment';
import { Redirect, Link } from 'react-router-dom';

class Comments extends Component {
  state = {
    comments: [],
    userComment: false,
    error: null,
    currentUser: '',
  };

  render() {
    if(this.state.error) {
      return <Redirect to={{pathname: '/error', state: this.state.error}}/>
    
    } else if (this.state.comments.length === 0 && this.props.loggedInUser) {
      return <div><p>No comments! Why not be the first to post below?</p>
      <AddComment articleid={this.props.articleId} addComment={this.addComment} /></div>
    
    } else if (this.state.comments.length === 0 && !this.props.loggedInUser) {
      return <p>No comments! Please log in to add a comment</p>

  
    } else
    return (
      <div className="comments">
        {this.state.comments.map(comment => {
          return (
            <div key={comment._id}>
              <Link to={`/users/${comment.created_by.username}`} className="username">{comment.created_by.username}:</Link><br/>
              <p className="comment-text">{comment.body}</p>
              <span className="time"> 
                {moment(comment.created_at).startOf().fromNow().toString()}
              </span>
              {this.props.loggedInUser === comment.created_by.name ? <button className="deleteButton" onClick={this.handleDelete(comment._id)}>delete me</button> : ''}
              <CommentVotes votes={comment.votes} comment={comment} commentId={comment._id} />
              <br/>
            </div>
          );
        })}
        <h3 className="comment-headings">Add a comment</h3>
        {this.props.articleId && this.props.loggedInUser ? (<AddComment articleid={this.props.articleId} addComment={this.addComment}/>) : 'Please log in to add a comment'}<br/><br/>
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.newComment !== prevProps.newComment) {
      this.setState({
        comments: [...this.state.comments, this.props.newComment]
      });
    }
  }
  
  componentDidMount() {
    this.loadComments();
  }

  loadComments = () => {
    api
      .fetchComments(this.props.articleId)
      .then(res => res.type === 'error' ? this.setState({error: res.error}) : this.setState({ comments: res.comment }));
  }

  handleDelete = commentId => {
      return () => {
      api.deleteComment(commentId).then(msg => {
        if (msg === "your comment has been deleted!") { // eslint-disable-next-line
          let newArr = this.state.comments.filter(comment => {
            if (comment._id !== commentId) {
              return comment;
            }
          });
          this.setState({
            comments: newArr
          });
        }
      });
    }
  };

  addComment = (articleid, data) => {
    //currentUser=this.props.loggedInUser
    data = {
      body: data,
      created_by: this.props.loggedInID
    };
    api
      .postNewComment(articleid, data)
      .then( comment  => {
        this.setState({ 
          comments: [...this.state.comments, comment],
          commentBody: "",
         });
      })
      .catch(err => {
        this.setState({ errorComments: true });
      })
      .then(() => {
        api
          .fetchCommentsForArticle(this.props.articleId)
          .then(({ data }) => {
            this.setState({ comments: data.comment });
          })
          .catch(err => {
            this.setState({ errorComments: true });
          });
      });
  };
}

Comments.propTypes = {
  comments: pt.arrayOf(pt.object),
  loggedInUser: pt.string
};

export default Comments;
