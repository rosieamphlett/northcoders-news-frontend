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
          dispatch(fetchArticlesError(err.response.data));
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

export function fetchTopics () {
  return function (dispatch) {
    dispatch(fetchTopicsRequest());
    axios.get(`${url}/topics`)
    .then(res => {
      dispatch(fetchTopicsSuccess(res.data.topics))
    })
    .catch(err => {
      dispatch(fetchTopicsError(err.response.data))
    })
  }
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

export function fetchUsers () {
  return function (dispatch) {
    dispatch(fetchUsersRequest());
    axios.get(`${url}/users`)
    .then(res => {
      dispatch(fetchUsersSuccess(res.data.users))
    })
    .catch(err => {
      dispatch(fetchUsersError(err.response.data))
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
      dispatch((/comments/g.test(path) ? 
        changeVoteSuccess(res.data.comment.votes) 
          : changeVoteSuccess(res.data.article.votes)))
    })
    .catch(err => {
      dispatch(changeVoteError(err.response.data))
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
          dispatch(fetchArticlesByIDError(err.response.data));
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

export function postNewComment (article_id, comment) {
  return function (dispatch) {
    dispatch(postNewCommentRequest(article_id, comment));
    axios.post(`${url}/articles/${article_id}/comments`, comment)
    .then(res => {
      postNewCommentSuccess(res.data.comment)
    })
    .then(() => dispatch(fetchComments(article_id)))
    .catch(err => {
      dispatch(postNewCommentError(err.response.data))
    })
  }  
}

export function postNewCommentRequest (article_id, comment) {
  return {
      type: types.ADD_COMMENT_REQUEST,
      article_id,
      comment
  };
}

export function postNewCommentSuccess (comment) {
  return {
      type: types.ADD_COMMENT_SUCCESS,
      payload: comment 
  };
}

export function postNewCommentError (error) {
  return {
      type: types.ADD_COMMENT_ERROR,
      payload: error
  };
}

//delete comment
export function deleteComment(article_id, comment_id) {
  return function (dispatch) {
    dispatch(deleteCommentRequest(comment_id));
    axios.delete(`${url}/comments/${comment_id}`)
    .then(res => {
      deleteCommentSuccess(res.data.msg)
    })
    .then(() => dispatch(fetchComments(article_id)))
    .catch(err => {
      dispatch(deleteCommentError(err.response.data))
    })
  }
}

export function deleteCommentRequest (id) {
  return {
      type: types.DELETE_COMMENT_REQUEST,
      id: id
  };
}

export function deleteCommentSuccess (comment) {
  return {
      type: types.DELETE_COMMENT_SUCCESS,
      payload: comment 
  };
}

export function deleteCommentError (error) {
  return {
      type: types.DELETE_COMMENT_ERROR,
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
          dispatch(fetchCommentsError(err.response.data));
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

export function fetchUserId (user_id) {
  return function (dispatch) {
    dispatch(fetchUserIdRequest(user_id))
    axios.get(`${url}/users/${user_id}`)
    .then(res => {
      dispatch(fetchUserIdSuccess(res.data.user[0]))
    })
    .catch(err => {
      dispatch(fetchUserIdError(err.response.data))
    })
  }
}

export function fetchUserIdRequest (id) {
  return {
      type: types.FETCH_USERID_REQUEST,
      id: id
  };
}

export function fetchUserIdSuccess (user_info) {
  return {
      type: types.FETCH_USERID_SUCCESS,
      payload: user_info
  };
}

export function fetchUserIdError (error) {
  return {
      type: types.FETCH_USERID_ERROR,
      payload: error
  };
}






