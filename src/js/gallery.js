'use strict';

import { UnsplashAPI } from './unsplash-api';
import galleryCardsTemplate from '../templates/gallery-card.hbs';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchFormEl = document.querySelector('.js-search-form');
const galleryListEl = document.querySelector('.js-gallery');
const loadMoreBtnEl = document.querySelector('.js-load-more');

const unsplashApi = new UnsplashAPI();

searchFormEl.addEventListener('submit', async event => {
  event.preventDefault();

  const keyword = event.currentTarget.elements['user-search-query'].value;

  if (keyword.trim() === '') {
    return Notiflix.Notify.info(
      '"Sorry, there are no images matching your search query. Please try again."',
    );
  }

  unsplashApi.keyword = keyword;
  unsplashApi.page = 1;

  galleryListEl.innerHTML = '';

  const { data } = await unsplashApi.fetchPhotos();
  try {
    if (data.hits.length === 0) {
      loadMoreBtnEl.classList.add('is-hidden');
      return;
    }

    if (data.totalHits === 1) {
      galleryListEl.insertAdjacentHTML('beforeend', galleryCardsTemplate(data.hits));
      loadMoreBtnEl.classList.add('is-hidden');
      return;
    }

    galleryListEl.insertAdjacentHTML('beforeend', galleryCardsTemplate(data.hits));
    loadMoreBtnEl.classList.remove('is-hidden');

    let lightbox = new SimpleLightbox('.gallery a', {
      captionDelay: 250,
      navText: ['<', '>'],
    });
  } catch (err) {
    console.log(err);
  }
});

window.addEventListener('scroll', async event => {
  let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;

  if (windowRelativeBottom <= document.documentElement.clientHeight + 100) {
    try {
      unsplashApi.page += 1;

      const { data } = await unsplashApi.fetchPhotos();

      galleryListEl.insertAdjacentHTML('beforeend', galleryCardsTemplate(data.hits));
      let lightbox = new SimpleLightbox('.gallery a', {
        captionDelay: 250,
        navText: ['<', '>'],
      });
    } catch (err) {
      console.log(err);
    }
  }
});
