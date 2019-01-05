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
import '../stylez/Article.css';
import '../stylez/App.css'

class Article extends React.Component {
  componentDidMount () {
    this.props.fetchArticlesByID(this.props.match.params.article_id);
    this.props.fetchComments(this.props.match.params.article_id);
    this.props.fetchUsers();
    this.props.fetchTopics();
  }

  render () {
      let {loading, selectedArticle, selectedComments} = this.props
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
                    <p className="timestamp">Posted {moment(selectedArticle.created_at).startOf().fromNow().toString()}</p>
                    <Votes className="article-votes" path={`/articles/${selectedArticle._id}`} votes={selectedArticle.votes} />
                </article>
            <div className="voteAndComment">
            </div>
                    <h1 className="comments-title">{selectedComments.length} Comments</h1>
                    <article className="comments">
                    {selectedComments.map((comment, i) => 
                    <article className="each-comment"key={i}>
                    <img className="comment-user-pic" src={comment.created_by.avatar_url} onError={event => event.target.src="http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg"} alt="user-pic" />
                    <div className="comment-content">
                    <span className="comment-username">{comment.created_by.username}</span>
                    <span className="timestamp"> - {moment(comment.created_at).startOf().fromNow().toString()}</span>
                    <span>{(this.props.user && this.props.user._id === comment.created_by._id) && <button className="deleteButton"onClick={this.handleDelete(selectedArticle._id, comment._id)}>delete me</button>}</span>
                    <p className="comment-body">{comment.body}</p>
                    <div className="comment-votes">{this.props.user && <Votes className="comment-votes"path={`/comments/${comment._id}`} votes={comment.votes} />}</div>
                    </div></article>)}
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
    topics: state.topics
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