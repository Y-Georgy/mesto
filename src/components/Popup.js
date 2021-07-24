class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open () {
    this._setEscListener();
    this._popup.classList.add('popup_opened');
    this._setEventListeners();
  }

  close () {
    this._popup.classList.remove('popup_opened');
    this._removeEscListener();
    this._removeEventListeners();
  }

  _setEscListener () {
    document.addEventListener('keydown', this._handleEscClose);
  };

  _removeEscListener() {
    document.removeEventListener('keydown', this._handleEscClose);
  };

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

  _setEventListeners () {
    this._popup.addEventListener('mousedown', this._handlerClickClose);
  }

  _removeEventListeners () {
    this._popup.removeEventListener('mousedown', this._handlerClickClose);
  }
}

export default Popup;
