import React from 'react';
import PropTypes from 'prop-types';
import chooseImg from '../helpers/index';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';

class Article extends React.Component {
  componentDidMount () {
    this.props.fetchArticlesByID(this.props.match.params.article_id);
  }

  render () {
      let {loading, selectedArticle} = this.props
      if (loading === false) {
        return (
        <div className="articlePage columns">
            <div className="column is-three-quarters">
                <article>
                    <h1>{selectedArticle.title}</h1>
                    <img src={chooseImg(selectedArticle.belongs_to)} alt="article-pic" />
                    <h4>{selectedArticle.body}</h4>
                    <p>By: {selectedArticle.created_by.username}</p>
                    <p>Time: {selectedArticle.created_at}</p>
                    <p>Votes: {selectedArticle.votes}</p>
                </article> 
            </div>
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
    loading: PropTypes.bool.isRequired,
    fetchArticlesByID: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired
};

export default connect(MapStateToProps, mapDispatchToProps)(Article);