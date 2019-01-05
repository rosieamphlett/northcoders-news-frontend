import React from 'react';
import PropTypes from 'prop-types';
import chooseImg from '../helpers/index';
import Votes from './Votes';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';
import Login from './Login';
import AddComment from './AddComment';
import Nav from './Nav';

class Article extends React.Component {
  componentDidMount () {
    this.props.fetchArticlesByID(this.props.match.params.article_id);
    this.props.fetchComments(this.props.match.params.article_id);
    this.props.fetchUsers();
    this.props.fetchTopics();
  }

  render () {
      let {loading, selectedArticle, selectedComments} = this.props
      if (loading === false) {
        return (
        <div className="articlePage columns">
          <Nav topics={this.props.topics}/>
          <Login users={this.props.users} />
            <div>
                <article>
                    <h1>{selectedArticle.title}</h1>
                    <img src={chooseImg(selectedArticle.belongs_to)} alt="article-pic" />
                    <h4>{selectedArticle.body}</h4>
                    <p>Time: {selectedArticle.created_at}</p>
                    <Votes path={`/articles/${selectedArticle._id}`} votes={selectedArticle.votes} />
                </article>
            <div className="voteAndComment">
            </div>
                <article>
                    <h1>Comments </h1>
                    {selectedComments.map((comment, i) => 
                    <article key={i}>
                    <p>user: {comment.created_by.username}</p>
                    <p>comment: {comment.body}</p>
                    <button onClick={this.handleDelete(selectedArticle._id, comment._id)}>delete me</button>
                    <Votes path={`/comments/${comment._id}`} votes={comment.votes} />
                    </article>)}
                </article>
            </div>
            <AddComment article_id={this.props.match.params.article_id}/> 
        </div>
        );
    } else {
        return <p> loading..</p>
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