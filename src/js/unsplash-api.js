'use strict';

export class UnsplashAPI {
  #BASE_URL = 'https://api.unsplash.com';
  #API_KEY = 'LxvKVGJqiSe6NcEVZOaLXC-f2JIIWZaq_o0WrF8mwJc';

  constructor(keyword = null) {
    this.page = 1;
    this.keyword = keyword;
  }

  fetchPhotos() {
    return fetch(
      `${this.#BASE_URL}/search/photos?query=${this.keyword}&page=${
        this.page
      }&per_page=12&client_id=${this.#API_KEY}`,
    ).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    });
  }

  getRandomPhotos() {
    return fetch(`${this.#BASE_URL}/photos/random?count=12&client_id=${this.#API_KEY}`).then(
      response => {
        if (!response.ok) {
          throw new Error(response.status);
        }

        return response.json();
      },
    );
  }
}
