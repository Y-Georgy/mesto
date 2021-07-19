import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor (handlerSubmitForm, popupSelector) {
    super(popupSelector);
    this._formElement = this._popup.querySelector('.popup__container');
    this._handlerSubmitForm = handlerSubmitForm;
    this._popupInputs = Array.from(this._popup.querySelectorAll('.popup__input'));
  }

  getInputValues () {
    const valueInputs = {}
    this._popupInputs.forEach((input) => {
      valueInputs[input.name] = input.value;
    });
    return valueInputs;
  }

  _setEventListeners () {
    super._setEventListeners();
    this._formElement.addEventListener('submit', this._handlerSubmitForm)
  }

  close () {
    super.close();
    this._formElement.reset();
  }

}

export default PopupWithForm;
