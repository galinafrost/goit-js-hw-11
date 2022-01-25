'use strict';
// https://jsonplaceholder.typicode.com/

import createPostsMarkup from '../templates/posts.hbs';

const loadMoreEl = document.querySelector('.js-load-more');
const postsListEl = document.querySelector('.js-posts');
const BASE_URL = 'https://jsonplaceholder.typicode.com';
let page = 1;

const fetchPosts = () => {
  return fetch(`${BASE_URL}/posts?_limit=10&_page=${page}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
};

fetchPosts()
  .then(data => {
    postsListEl.insertAdjacentHTML('beforeend', createPostsMarkup(data));
  })
  .catch(err => {
    console.log(err);
  });

loadMoreEl.addEventListener('click', event => {
  page += 1;

  fetchPosts()
    .then(data => {
      postsListEl.insertAdjacentHTML('beforeend', createPostsMarkup(data));
    })
    .catch(err => {
      console.log(err);
    });
});
