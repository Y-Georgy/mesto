class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open () {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add('popup_opened');

  }

  close () {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handlerClickClose = (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__icon-close')) {
      this.close();
    }
  }

  setEventListeners () {
    this._popup.addEventListener('mousedown', this._handlerClickClose);
  }
}

export default Popup;
