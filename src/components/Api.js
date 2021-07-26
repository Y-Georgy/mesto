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

  addCardToServer(dataCard) {
    return fetch(this._url, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(dataCard)
    })
    .then(this._handleResponse)
    .catch(this._catchError);
  }

  deleteCardFromServer() {
    return fetch(this._url, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._handleResponse)
    .catch(this._catchError);
  }

  addProfileInfoToServer(dataNewAuthor) {
    return fetch(this._url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(dataNewAuthor)
    })
    .then(this._handleResponse)
    .catch(this._catchError);
  }
}
