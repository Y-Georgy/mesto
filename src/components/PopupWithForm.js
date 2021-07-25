import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor (handlerSubmitForm, popupSelector) {
    super(popupSelector);
    this._formElement = this._popup.querySelector('.popup__container');
    this._handlerSubmitForm = handlerSubmitForm;
    this._popupInputs = Array.from(this._popup.querySelectorAll('.popup__input'));
  }

  _getInputValues = () => {
    const valueInputs = {}
    this._popupInputs.forEach((input) => {
      valueInputs[input.name] = input.value;
    });
    return valueInputs;
  }

  _handlerSubmit = (evt) => {
    evt.preventDefault();
    this._handlerSubmitForm(this._getInputValues());
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
    this._formElement.reset();
    this._removeEventListeners;
  }
}

export default PopupWithForm;
