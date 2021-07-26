import Popup from "./Popup";

export default class PopupWithSubmit extends Popup {
  constructor(handlerSubmitForm, popupSelector) {
    super(popupSelector);
    this._handlerSubmitForm = handlerSubmitForm;
    this._formElement = this._popup.querySelector('.popup__container');
  }

  _handlerSubmit = (evt) => {
    evt.preventDefault();
    this._handlerSubmitForm(); // передать функцию?
  }

  _setEventListeners () {
    super._setEventListeners();
    this._formElement.addEventListener('submit', this._handlerSubmit);
  }

  _removeEventListeners () {
    this._formElement.removeEventListener('submit', this._handlerSubmit);
  }

  close () {
    super.close();
    this._removeEventListeners;
  }
}
