'use strict';

import axios from 'axios';

export class UnsplashAPI {
    #BASE_URL = 'https://pixabay.com/api/';
    #API_KEY = '25420016-eb91b2af771977a7d26691575';
  
    constructor(keyword = null) {
      this.page = 1;
      this.keyword = keyword;
    }
  
    fetchPhotos() {
      return axios.get(`${this.#BASE_URL}/?key=${this.#API_KEY}`, {
        params: {
          q: this.keyword,
          page: this.page,
          per_page: 40,
          image_type: "photo",
          orientation: "horizontal",
          safesearch: "false",
        },
      });
    }
  }