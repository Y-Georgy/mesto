export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  getData() {
    return fetch(this._url, {
      headers: this._headers,
    })
    .then(this._handleResponse)
    .catch(this._catchError);
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);

  }

  _catchError(err) {
    console.log(err);
  }

  getCards() {
    return fetch(this._url, {
      headers: this._headers,
    })
    .then(this._handleResponse)
    .catch(this._catchError);
  }
}
