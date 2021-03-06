const Axios = require("axios");
const URL = 'https://the-best-nc-news.herokuapp.com/api'

export const errorHandling = (apiCallFn) => {
  return (...args) => apiCallFn(...args)
  .catch(err => {
    return {type: 'error', error: err.response.data.err}
  })
}

export const fetchArticles = errorHandling(() => {
  return Axios.get(`${URL}/articles`)
    .then(res => res.data.articles)
});

export const fetchArticleById = errorHandling(articleId => {
  return Axios.get(`${URL}/articles/${articleId}`
  ).then(({data} ) => data);
});

export const fetchArticlesByTopic = errorHandling(topicId => {
  return Axios.get(`${URL}/topics/${topicId}/articles`)
    .then(res => res.data.articles);
})

export const fetchTopics = errorHandling(() => {
  return Axios.get(`${URL}/topics`);
});

export const fetchUsers = errorHandling(() => {
  return Axios.get(`${URL}/users`)
});

export const fetchUserById = errorHandling(userId => {
  return Axios.get(`${URL}/users/${userId}`)
  .then(res=> res.data.user);
});

export const fetchComments = errorHandling(id => {
  return Axios.get(`${URL}/articles/${id}/comments`)
  .then(({data} ) => data);
});

export const fetchCommentsForArticle = errorHandling((articleId) => {
  return Axios.get(`${URL}/articles/${articleId}/comments`)
});

export const deleteComment = errorHandling(commentId => {
  return Axios.delete(`${URL}/comments/${commentId}`)
  .then(res => res.data.msg);
});

export const postNewComment = (articleid, comment) => {
  return Axios.post(`${URL}/articles/${articleid}/comments`, comment)
    .then(res => res.data.comment);
};

export const postNewArticle = (topic, content) => {
  return Axios.post(`${URL}/topics/${topic}/articles`, content)
    .then(res => res.data.content)
}

export const changeVotes = (path, direction) => {
  return Axios.put(`${URL}${path}?vote=${direction}`)
}
