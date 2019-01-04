import React, { Component } from "react";
import { Link } from "react-router-dom";
import chooseImg from '../helpers/index';
import "../stylez/Articles.css";
import "../stylez/App.css";
// import * as api from '../api';
// import moment from 'moment';
// import pt from 'prop-types'

import {connect} from 'react-redux';
import * as actions from '../actions/actions';


class Articles extends Component {
  render () {
    return (
      <div id='ArticleList'>
        {Object.keys(this.props.match.params).length !== 0 ? 
        this.mapArticles(this.props.articles.filter(article => article.belongs_to === this.props.match.params.topic)) 
        : this.mapArticles(this.props.articles)}
      </div>
    );
  }

  componentDidMount () {
    this.props.fetchArticles();
  }

  mapArticles(articles) {
    return articles.map((article, i) => 
    <article key={i}>
      <Link to={`/articles/${article._id}`}>
        <h2>{article.title}</h2></Link>
        <img src={chooseImg(article.belongs_to)} alt="article-pic" />
        <p>by {article.created_by.username}</p>
        <p>{article.votes} votes</p>
  </article>)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchArticles: () => {
      dispatch(actions.fetchArticles());
    },
  };
}

function MapStateToProps (state) {
  return {
    articles: state.articles,
    loading: state.loading
  };
}

export default connect(MapStateToProps, mapDispatchToProps)(Articles);