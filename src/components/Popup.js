class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open = () => {
    this._setEscListener();
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
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

  _setEventListeners = () => {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__icon-close')) {
        this.close();
      }
    });
  }

}

export default Popup;
