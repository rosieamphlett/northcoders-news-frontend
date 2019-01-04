import * as types from '../actions/types';

const initialState = {
  articles: [],
  selectedArticle: {},
  selectedComments: [],
  loading: true,
  error: null
};

function reducer (prevState = initialState, action) {
  if (!action) return prevState;

// fetchArticles
  if (action.type === types.FETCH_ARTICLES_REQUEST) {
    const newState = Object.assign({}, prevState);
    newState.loading = true;
    return newState;
  }

  if (action.type === types.FETCH_ARTICLES_SUCCESS) {
    const newState = Object.assign({}, prevState);
    newState.articles = action.payload;
    newState.loading = false;
    return newState;
  }

  if (action.type === types.FETCH_ARTICLES_ERROR) {
    const newState = Object.assign({}, prevState);
    newState.articles = [];
    newState.loading = false;
    newState.error = action.error;
    return newState;
  }

  // fetchArticlesByID
  if (action.type === types.FETCH_ARTICLES_BY_ID_REQUEST) {
    const newState = Object.assign({}, prevState);
    newState.loading = true;
    return newState;
  }

  if (action.type === types.FETCH_ARTICLES_BY_ID_SUCCESS) {
    const newState = Object.assign({}, prevState);
    newState.selectedArticle = action.payload;
    newState.loading = false;
    return newState;
  }

  if (action.type === types.FETCH_ARTICLES_BY_ID_ERROR) {
    const newState = Object.assign({}, prevState);
    newState.articles = [];
    newState.selectedArticle = {};
    newState.loading = false;
    newState.error = action.error;
    return newState;
  }

  return prevState
}

export default reducer;