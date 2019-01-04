import * as types from './types';
import axios from 'axios';
const url = 'https://the-best-nc-news.herokuapp.com/api';

export function fetchArticles () {
  return function (dispatch) {
      dispatch(fetchArticlesRequest());
      axios.get(`${url}/articles`)
      .then(res => {
          console.log('fetchArticles res data: ', res.data);
          dispatch(fetchArticlesSuccess(res.data.articles));
      })
      .catch(err => {
          console.log(err);
          dispatch(fetchArticlesError(err));
      });
  };
}

export function fetchArticlesRequest () {
  return {
      type: types.FETCH_ARTICLES_REQUEST
  };
}

export function fetchArticlesSuccess (articles) {
  return {
      type: types.FETCH_ARTICLES_SUCCESS,
      payload: articles
  };
}

export function fetchArticlesError (error) {
  return {
      type: types.FETCH_ARTICLES_ERROR,
      payload: error
  };
}

// fetchTopics
export function fetchTopics () {
  return function (dispatch) {
    dispatch(fetchTopicsRequest());
    axios.get(`${url}/topics`)
      .then(res => {
        console.log(res.data.topics)
        dispatch(fetchTopicsSuccess(res.data.topics));
      })
      .catch(err => {
        dispatch(fetchTopicsError(err));
      });

  };
}
export function fetchTopicsRequest () {
  return {
    type: types.FETCH_TOPICS_REQUEST
  };
}

export function fetchTopicsSuccess (topics) {
  return {
    type: types.FETCH_TOPICS_SUCCESS,
    payload: topics
  };
}

export function fetchTopicsError (error) {
  return {
    type: types.FETCH_TOPICS_ERROR,
    payload: error
  };
}

//article by ID
export function fetchArticlesByID (id) {
  return function (dispatch) {
      dispatch(fetchArticlesByIDRequest(id));
      axios.get(`${url}/articles/${id}`)
      .then(res => {
          dispatch(fetchArticlesByIDSuccess(res.data.article[0]));
      })
      .catch(err => {
          console.log(err);
          dispatch(fetchArticlesByIDError(err));
      });
  };
}

export function fetchArticlesByIDRequest (id) {
  return {
      type: types.FETCH_ARTICLES_BY_ID_REQUEST,
      id
  };
}

export function fetchArticlesByIDSuccess (article) {
  return {
      type: types.FETCH_ARTICLES_BY_ID_SUCCESS,
      payload: article
  };
}

export function fetchArticlesByIDError (error) {
  return {
      type: types.FETCH_ARTICLES_BY_ID_ERROR,
      payload: error
  };
}
