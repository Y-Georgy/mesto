class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open = () => {
    this._setEscListener();
    this._popup.classList.add('popup_opened');
  }

  close = () => {
    this._popup.classList.remove('popup_opened');
    this._removeEscListener();
  }

  _setEscListener = () => {
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

}

export default Popup;
