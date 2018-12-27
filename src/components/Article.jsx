import React, { Component } from "react";
import * as api from "../api";
import { Redirect } from "react-router-dom";
import "../stylez/Article.css";
import "../stylez/App.css";
import Votes from "./Votes";
import Comments from "./Comments";
import pt from 'prop-types';

class Article extends Component {
  state = {
    article: [],
    comments: [],
    newComment: {},
    error: null
  };
  
  render() {
    if (this.state.error) {
      const pathname = `/error`
      const state = this.state.error
    return <Redirect to={{pathname, state}}></Redirect>

  } else if (this.props.articles.length === 0) {
        return <div className="loading">
          <p>Loading Articles...</p>
          <img src="http://icon-park.com/imagefiles/loading7_pink.gif" className="loading-spinner" alt="loading"></img>
          </div>

    } else  {
      let {article} = this.state
       if (this.state.article.length !== 0) {

        let imagesrc;
           if (article[0].belongs_to === 'coding') {
            imagesrc = "https://cdn-images-1.medium.com/max/1600/1*8r6hvv5E-FOOdKOih4G7Hg.jpeg"
          } else if(article[0].belongs_to === 'cooking') {
            imagesrc = "https://usateatsiptrip.files.wordpress.com/2018/03/gettyimages-887636042.jpg?w=1000&h=600&crop=1"
          } else if(article[0].belongs_to === 'football') {
            imagesrc = "https://nevadapreps.com/wp-content/uploads/2017/08/9048804_web1_bcr-soccer-aug04-16.jpg"
          } else {
            imagesrc = "http://saveabandonedbabies.org/wp-content/uploads/2015/08/default.png"
          }
      return (
        <div>
          <h3 className="article-title">{article[0].title}</h3><br/>
          <img className= "article-pic" src={`${imagesrc}`} alt="code"></img>
          <br/><br/>
          <p className="article-body">{article[0].body}</p><br/>
          <Votes path={`/articles/${article[0]._id}`} articleId={article[0]._id} votes={article[0].votes} loggedInUser={this.props.loggedInUser}/><br/>
        <div className="comments-box">
        <h3 className="comment-headings">Comments</h3>
        <Comments loggedInID ={this.props.loggedInID} articleId={article[0]._id} loggedInUser={this.props.loggedInUser} getNewComment={this.getNewComment}/>
        </div>
      </div>
      )
    } else return null;
  } }

  componentDidMount = () => {
    this.loadArticle();
  }

  loadArticle = () => {
    return Promise.all([
      api.fetchArticleById(this.props.articleId),
      api.fetchUsers()
    ])
      .then(([article, users]) => {
        if (article.type === 'error') {
          this.setState ({
            error: article.error
          })
        } else if(users.type === 'error') {
          this.setState ({
            error: users.error
          })
        } else {
          this.setState({
          article: article.article,
          users: users.users
        })};
      })
  };

  getNewComment = comment => {
    this.setState({
      newComment: comment
    });
  };

  removeComment = (comment_id) => {
    const comments = [...this.state.comments].filter(comment => {
        return comment._id !== comment_id
    })
    this.setState({
        comments
    })
  }
}

Article.propTypes = {
  articleId: pt.string,
  loggedInUser: pt.string,
  loggedInUserId: pt.string
};

export default Article;