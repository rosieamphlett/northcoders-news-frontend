import * as types from './types';
import axios from 'axios';
const url = 'https://the-best-nc-news.herokuapp.com/api';


//get articles
export function fetchArticles () {
  return function (dispatch) {
      dispatch(fetchArticlesRequest());
      axios.get(`${url}/articles`)
      .then(res => {
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

export function fetchUsers () {
  return function (dispatch) {
    dispatch(fetchUsersRequest());
    axios.get(`${url}/users`)
    .then(res => {
      dispatch(fetchUsersSuccess(res.data.users))
    })
    .catch(err => {
      console.log(err);
      dispatch(fetchUsersError(err))
    })
  }
}

export function fetchUsersRequest () {
  return {
      type: types.FETCH_USERS_REQUEST
  };
}

export function fetchUsersSuccess (users) {
  return {
      type: types.FETCH_USERS_SUCCESS,
      payload: users
  };
}

export function fetchUsersError (error) {
  return {
      type: types.FETCH_USERS_ERROR,
      payload: error
  };
}

//logged in user

export function loggedInUser (user) {
  return {
    type: types.LOGGED_IN_USER,
    payload: user
  }
}

export function changeVote (path, direction) {
  return function (dispatch) {
    dispatch(changeVoteRequest(path, direction));
    axios.put(`${url}${path}?vote=${direction}`)
    .then(res => {
      dispatch(changeVoteSuccess(res.data.article.votes))
    })
    .catch(err => {
      dispatch(changeVoteError(err))
    })
  }
}

export function changeVoteRequest (path, direction) {
  return {
      type: types.CHANGE_VOTE_REQUEST,
      path,
      direction
  };
}

export function changeVoteSuccess (votes) {
  return {
      type: types.CHANGE_VOTE_SUCCESS,
      payload: votes
  };
}

export function changeVoteError (error) {
  return {
      type: types.CHANGE_VOTE_ERROR,
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

//comments!
export function fetchComments (id) {
  return function (dispatch) {
      dispatch(fetchCommentsRequest(id));
      axios.get(`${url}/articles/${id}/comments`)
      .then(res => {
          dispatch(fetchCommentsSuccess(res.data.comment));
      })
      .catch(err => {
          console.log(err);
          dispatch(fetchCommentsError(err));
      });
  };
}

export function fetchCommentsRequest (id) {
  return {
      type: types.FETCH_COMMENTS_REQUEST,
      id: id
  };
}

export function fetchCommentsSuccess (comments) {
  return {
      type: types.FETCH_COMMENTS_SUCCESS,
      payload: comments 
  };
}

export function fetchCommentsError (error) {
  return {
      type: types.FETCH_COMMENTS_ERROR,
      payload: error
  };
}








