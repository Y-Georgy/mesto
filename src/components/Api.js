export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
    this._method = config.method;
    this._body = config.body;
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

  callToServer() {
    return fetch(this._url, {
      method: this._method,
      headers: this._headers,
      body: this._body
    })
    .then(this._handleResponse)
    .catch(this._catchError);
  }
}
