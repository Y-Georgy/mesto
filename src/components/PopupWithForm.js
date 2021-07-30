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

  setInputValues = (data) => {
    this._popupInputs.forEach((input) => {
      input.value = data[input.name];
    });
  }

  _handlerSubmit = (evt) => {
    evt.preventDefault();
    this._handlerSubmitForm(this._getInputValues());
  }

  setEventListeners () {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._handlerSubmit);
  }

  close () {
    super.close();
    this._formElement.reset();
  }
}

export default PopupWithForm;
