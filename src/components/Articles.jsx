import React, { Component } from "react";
import { Link } from "react-router-dom";
import chooseImg from '../helpers/index';
import "../stylez/Articles.css";
import "../stylez/App.css";
// import moment from 'moment';
import pt from 'prop-types';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';
import Nav from './Nav';
import Login from "./Login";
import '../stylez/Articles.css';

class Articles extends Component {
  render () {
    if (!this.props.loading) return (
      <div>
        <div className="navlinks">
          <Nav topics={this.props.topics}/>
          <Login users={this.props.users}/>
        </div>
      <div className='ArticleList'>
        {Object.keys(this.props.match.params).length !== 0 ? 
        this.mapArticles(this.props.articles.filter(article => article.belongs_to === this.props.match.params.topic)) 
        : this.mapArticles(this.props.articles)}
      </div>
      </div>
    )
    else return (<div className="loading">
    <p>Loading...</p>
    <img src="https://thumbs.gfycat.com/CheerfulGreatAmurstarfish-max-1mb.gif" className="loading-spinner" alt="loading"></img>
    </div>)
  }

  componentDidMount () {
    this.props.fetchArticles();
    this.props.fetchUsers();
    this.props.fetchTopics()
  }

  mapArticles(articles) {
    return articles.map((article, i) => 
    <article className="each-article"key={i}>
      <div className="article-content">
      <Link to={`/articles/${article._id}`}>
        <h2 className="article-title">{article.title}</h2>
        <img className="article-pic" src={chooseImg(article.belongs_to)} alt="article-pic" />
        <p className="textSnippet">{article.body.slice(0, 150)}...</p>
        <span className="username">Posted by <span className="user">{article.created_by.username}</span></span>
        </Link>
        </div>
  </article>)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchArticles: () => {
      dispatch(actions.fetchArticles());
    },
    fetchUsers: () => {
      dispatch(actions.fetchUsers());
    },
    fetchTopics: () => {
      dispatch(actions.fetchTopics())
    } 
  };
}

function MapStateToProps (state) {
  return {
    articles: state.articles,
    users: state.users,
    topics: state.topics,
    loading: state.loading
  };
}

Articles.propTypes = {
  loading: pt.bool.isRequired,
  fetchArticles: pt.func.isRequired,
  fetchUsers: pt.func.isRequired,
  fetchTopics: pt.func.isRequired,
  match: pt.object.isRequired
};

export default connect(MapStateToProps, mapDispatchToProps)(Articles);