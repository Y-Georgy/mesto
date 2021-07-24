export default class Api {
  constructor(url) {
    this._url = url;
  }

  call() {
    fetch(this._url, {
      headers: {
        authorization: 'ef9c4dff-4cef-417b-a4dd-85f6d4ba3fef'
      }
    })
      .then(res => res.json())
      .then((result) => {
        console.log(result);
    });
  }
}
