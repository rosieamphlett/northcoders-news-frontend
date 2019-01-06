import * as types from '../actions/types';
import moment from 'moment';

const initialState = {
  articles: [],
  selectedArticle: {},
  selectedComments: [],
  topics: [],
  loading: true,
  users: [],
  user: null,
  error: null
};

function reducer (prevState = initialState, action) {
  if (!action) return prevState;

  //fetchUsers
  if (action.type === types.FETCH_USERS_REQUEST) {
    const newState = {...prevState}
    newState.loading = true;
    return newState;
  }

  if (action.type === types.FETCH_USERS_SUCCESS) {
    const newState = {...prevState}
    newState.users = action.payload;
    newState.loading = false;
    return newState;
  }

  if (action.type === types.FETCH_USERS_ERROR) {
    const newState = {...prevState}
    newState.users = [];
    newState.loading = false;
    newState.error = action.payload;
    return newState;
  }

  //loggedInUser
  if(action.type === types.LOGGED_IN_USER) {
    const newState = {...prevState}
    newState.user = action.payload
    return newState;
  }

  //topics 
  if(action.type === types.FETCH_TOPICS_REQUEST) {
    const newState = {...prevState}
    newState.loading = true;
    return newState;
  }

  if (action.type === types.FETCH_TOPICS_SUCCESS) {
    const newState = {...prevState}
    newState.topics = action.payload;
    newState.loading = false;
    return newState;
  }

  if (action.type === types.FETCH_TOPICS_ERROR) {
    const newState = {...prevState}
    newState.topics = [];
    newState.loading = false;
    newState.error = action.payload;
    return newState;
  }

// fetchArticles
  if (action.type === types.FETCH_ARTICLES_REQUEST) {
    const newState = {...prevState}
    newState.loading = true;
    return newState;
  }

  if (action.type === types.FETCH_ARTICLES_SUCCESS) {
    const newState = {...prevState}
    newState.articles = action.payload;
    newState.loading = false;
    return newState;
  }

  if (action.type === types.FETCH_ARTICLES_ERROR) {
    const newState = {...prevState}
    newState.articles = [];
    newState.loading = false;
    newState.error = action.payload;
    return newState;
  }

  // fetchArticlesByID
  if (action.type === types.FETCH_ARTICLES_BY_ID_REQUEST) {
    const newState = {...prevState};
    newState.loading = true;
    return newState;
  }

  if (action.type === types.FETCH_ARTICLES_BY_ID_SUCCESS) {
    const newState = {...prevState};
    newState.selectedArticle = action.payload;
    newState.loading = false;
    return newState;
  }

  if (action.type === types.FETCH_ARTICLES_BY_ID_ERROR) {
    const newState = {...prevState};
    newState.articles = [];
    newState.selectedArticle = {};
    newState.loading = false;
    newState.error = action.payload;
    return newState;
  }

  if (action.type === types.DELETE_COMMENT_REQUEST) {
    const newState = {...prevState}
    newState.loading = true;
    return newState;
  }

  if (action.type === types.DELETE_COMMENT_SUCCESS) {
    const newState = {...prevState}
    newState.selectedComments = action.payload.sort((a, b) => {
      return moment(a.created_at).diff(moment(b.created_at), "seconds")})
    newState.loading = false;
    return newState;
  }

  if (action.type === types.ADD_COMMENT_ERROR) {
    const newState = {...prevState};
    newState.articles = [];
    newState.selectedArticle = {};
    newState.selectedComments = {};
    newState.loading = false;
    newState.error = action.payload;
    return newState;
  }

  //comments
  if (action.type === types.ADD_COMMENT_REQUEST) {
    const newState = {...prevState}
    newState.loading = true;
    return newState;
  }

  if (action.type === types.ADD_COMMENT_SUCCESS) {
    const newState = {...prevState}
    newState.selectedComments = action.payload.sort((a, b) => {
      return moment(a.created_at).diff(moment(b.created_at), "seconds")})
    newState.loading = false;
    return newState;
  }

  if (action.type === types.ADD_COMMENT_ERROR) {
    const newState = {...prevState};
    newState.articles = [];
    newState.selectedArticle = {};
    newState.selectedComments = {};
    newState.loading = false;
    newState.error = action.payload;
    return newState;
  }

  if (action.type === types.FETCH_COMMENTS_REQUEST) {
    const newState = {...prevState};
    newState.loading = true;
    return newState;
  }

  if (action.type === types.FETCH_COMMENTS_SUCCESS) {
    const newState = {...prevState};
    newState.selectedComments = action.payload.sort((a, b) => {
      return moment(a.created_at).diff(moment(b.created_at), "seconds")})
    newState.loading = false;
    return newState;
  }

  if (action.type === types.FETCH_COMMENTS_ERROR) {
    const newState = {...prevState};
    newState.articles = [];
    newState.selectedArticle = {};
    newState.selectedComments = {};
    newState.loading = false;
    newState.error = action.payload;
    return newState;
  }

  return prevState
}

export default reducer;