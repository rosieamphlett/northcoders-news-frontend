import React, { Component } from "react";
import { Link } from "react-router-dom";
import chooseImg from '../helpers/index';
import "../stylez/Articles.css";
import pt from 'prop-types';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';
import Nav from './Nav';
import Login from "./Login";
import { Redirect } from "react-router-dom";

class Articles extends Component {
  render () {
    let {error, loading, topics, users, articles } = this.props
    if (error) {
      const pathname = `/error`
      const state = error
    return <Redirect to={{pathname, state}}></Redirect>
    } else
    if (!loading) return (
      <div>
        <div className="navlinks">
          <Nav topics={topics}/>
          <Login users={users}/>
        </div>
      <div className='ArticleList'>
        {Object.keys(this.props.match.params).length !== 0 ? 
        this.mapArticles(articles.filter(article => article.belongs_to === this.props.match.params.topic)) 
        : this.mapArticles(articles)}
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
    loading: state.loading,
    error: state.error
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