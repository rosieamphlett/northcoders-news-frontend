import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "../stylez/Articles.css";
import "../stylez/App.css";
import * as api from '../api';
import pt from 'prop-types'

class Articles extends Component {
  state = {
    articles: [],//maybe use a sort for votes here?
    error: null
  };

  render() {
    if(this.state.error) {
      return <Redirect to={{pathname: '/error', state: this.state.error}} />
    } else if (this.props.articles.length === 0) {
      return <div className="loading">
        <p>Loading Articles...</p>
        <img src="http://icon-park.com/imagefiles/loading7_pink.gif" className="loading-spinner" alt="loading"></img>
        </div>
    } else return (
        <div>
        {this.state.articles.map(article => {
          let imageSrc;
           if (article.belongs_to === 'coding') {
            imageSrc = "https://cdn-images-1.medium.com/max/1600/1*8r6hvv5E-FOOdKOih4G7Hg.jpeg"
          } else if(article.belongs_to === 'cooking') {
            imageSrc = "https://usateatsiptrip.files.wordpress.com/2018/03/gettyimages-887636042.jpg?w=1000&h=600&crop=1"
          } else {
            imageSrc = "https://nevadapreps.com/wp-content/uploads/2017/08/9048804_web1_bcr-soccer-aug04-16.jpg"
          }
            return <div key={article._id}>
            <Link to={`/articles/${article._id}`} className="article-link">
            <h2 className="article-title">{article.title}</h2>
            <img className= "article-pic" src={`${imageSrc}`} alt="code"></img>
          </Link><br/>
          <Link to={`/users/${article.created_by.username}`} className ="posted-by">Posted by: {article.created_by.username}</Link>
          <p className="votes">Votes: {article.votes}</p>
          </div>
        })}
    </div>
    )
  }

  componentDidUpdate(prevProps) {
    if (prevProps.slugId !== this.props.slugId) {
      if (this.props.slugId === undefined) {
        api
          .fetchArticles()
          .then(res => {
            this.setState({ articles: res });
          })
      }
      if (this.props.slugId !== undefined) {
        api
          .fetchArticlesByTopic(this.props.slugId)
          .then(res => {
            if(res.type === 'error') {
              this.setState({
                error: res.error
              })
            } else {
              this.setState({ articles: res });
            }
          })
        }
    }}

  componentDidMount() {
    this.props.slugId === undefined
      ? api
        .fetchArticles()
        .then(res => {
          if(res.type === 'error') {
            this.setState({
              error: res.error
            })
          } else {
            this.setState({ articles: res });
          }
        }) 
      : api
          .fetchArticlesByTopic(this.props.slugId)
          .then(res => {
            if(res.type === 'error') {
              this.setState({
                error: res.error
              })
            } else {
              this.setState({ articles: res });
            }
          })
    }
}

Articles.propTypes = {
  articles: pt.arrayOf(pt.object),
};

export default Articles;