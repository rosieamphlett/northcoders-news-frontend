import React from 'react';
import PropTypes from 'prop-types';
import chooseImg from '../helpers/index';
import Votes from './Votes';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';
import Login from './Login';
import AddComment from './AddComment';
import Nav from './Nav';
import moment from 'moment';
import { Redirect, Link } from "react-router-dom";
import '../stylez/Article.css';

class Article extends React.Component {
  componentDidMount () {
    this.props.fetchArticlesByID(this.props.match.params.article_id);
    this.props.fetchComments(this.props.match.params.article_id);
    this.props.fetchUsers();
    this.props.fetchTopics();
  }

  render () {
      let {loading, selectedArticle, selectedComments, error} = this.props
      if (error) {
        const pathname = `/error`
        const state = error
      return <Redirect to={{pathname, state}}></Redirect>
      } else
      if (!loading) {
        return (
        <div>
          <Nav topics={this.props.topics}/>
          <Login users={this.props.users} />
          <div className="content">
            <div className="article-and-comments">
                <article className="article">
                    <h1 className="article-title">{selectedArticle.title}</h1>
                    <img className="article-pic" src={chooseImg(selectedArticle.belongs_to)} alt="article-pic" />
                    <h4 className="article-body">{selectedArticle.body}</h4>
                    {selectedArticle.created_by && 
                        <p className="timestamp">
                          Posted {moment(selectedArticle.created_at).startOf().fromNow().toString()} by
                          <Link to={`/users/${selectedArticle.created_by.username}`}> {selectedArticle.created_by.username}</Link></p>}
                    <Votes className="article-votes" path={`/articles/${selectedArticle._id}`} votes={selectedArticle.votes} />
                </article>
            <div className="voteAndComment">
            </div>
                    <h1 className="comments-title">{selectedComments.length} Comments</h1>
                    <article className="comments">
                    {selectedComments.map((comment, i) => 
                    <article className="each-comment"key={i}>
                      <Link to={`/users/${comment.created_by.username}`}><img className="comment-user-pic" src={comment.created_by.avatar_url} onError={event => event.target.src="http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg"} alt="user-pic" /></Link>
                        <div className="comment-content">
                        <Link to={`/users/${comment.created_by.username}`}><span className="comment-username">{comment.created_by.username}</span></Link>
                          <span className="timestamp"> - {moment(comment.created_at).startOf().fromNow().toString()}</span>
                          <span>{(this.props.user && this.props.user._id === comment.created_by._id) && <button className="deleteButton"onClick={this.handleDelete(selectedArticle._id, comment._id)}>delete me</button>}</span>
                          <p className="comment-body">{comment.body}</p>
                          <div className="comment-votes">{this.props.user && <Votes className="comment-votes"path={`/comments/${comment._id}`} votes={comment.votes} />}</div>
                        </div>
                    </article>)}
                </article>
            </div>
            <AddComment article_id={this.props.match.params.article_id}/>
        </div>
        </div>
        );
    } else {
      return <div className="loading">
          <p>Loading...</p>
          <img src="https://thumbs.gfycat.com/CheerfulGreatAmurstarfish-max-1mb.gif" className="loading-spinner" alt="loading"></img>
          </div>
    }
  }

  handleDelete = (article_id, comment_id) => {
    return () => {
      this.props.deleteComment(article_id, comment_id)
    }
  };
}

function mapDispatchToProps (dispatch) {
  return {
    fetchArticlesByID: (id) => {
      dispatch(actions.fetchArticlesByID(id));
    },
    fetchUsers: () => {
      dispatch(actions.fetchUsers());
    },
    fetchComments: function (id) {
      dispatch(actions.fetchComments(id))
    },
    deleteComment: function(article_id, comment_id) {
      dispatch(actions.deleteComment(article_id, comment_id))
    },
    fetchTopics: () => {
      dispatch(actions.fetchTopics())
    } 
  };
}

function MapStateToProps (state) {
  return {
    selectedArticle: state.selectedArticle,
    selectedComments: state.selectedComments,
    loading: state.loading,
    users: state.users,
    user: state.user,
    topics: state.topics,
    error: state.error
  };
}

Article.propTypes = {
    selectedArticle: PropTypes.object.isRequired,
    selectedComments: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    fetchArticlesByID: PropTypes.func.isRequired,
    fetchComments: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired
};

export default connect(MapStateToProps, mapDispatchToProps)(Article);