import React from 'react';
import PropTypes from 'prop-types';
import chooseImg from '../helpers/index';
import Votes from './Votes';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';
// import AddComment from './AddComment';

class Article extends React.Component {
  componentDidMount () {
    this.props.fetchArticlesByID(this.props.match.params.article_id);
    this.props.fetchComments(this.props.match.params.article_id);
  }

  render () {
      let {loading, selectedArticle, selectedComments} = this.props
      console.log(this.props)
      if (loading === false) {
        return (
        <div className="articlePage columns">
            <div className="column is-three-quarters">
                <article>
                    <h1>{selectedArticle.title}</h1>
                    <img src={chooseImg(selectedArticle.belongs_to)} alt="article-pic" />
                    <h4>{selectedArticle.body}</h4>
                    {/* <p>By: {selectedArticle.created_by.username}</p> */}
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
                    <Votes path={`/comments/${comment._id}`} votes={comment.votes} />
                    </article>)}
                </article>
            </div>
            {/* <AddComment postComment={this.props.addContent} article_id={this.props.match.params.article_id}/> */}
        </div>
        );
    } else {
        return <p> loading..</p>
    }
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchArticlesByID: (id) => {
      dispatch(actions.fetchArticlesByID(id));
    },
    fetchComments: (id) => {
      dispatch(actions.fetchComments(id));  
    }
  };
}

function MapStateToProps (state) {
  return {
    selectedArticle: state.selectedArticle,
    selectedComments: state.selectedComments,
    loading: state.loading
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