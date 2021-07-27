export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Произошла ошибка: ${res.status}`);
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._handleResponse)
  }

  addCard(dataCard) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(dataCard)
    })
    .then(this._handleResponse)
  }

  getProfile() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._handleResponse)
  }

  addProfile(dataNewAuthor) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(dataNewAuthor)
    })
    .then(this._handleResponse)
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._handleResponse)
  }

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._handleResponse)
  }

  addLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._handleResponse)
  }

}
