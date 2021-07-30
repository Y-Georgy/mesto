import Popup from "./Popup";

export default class PopupWithSubmit extends Popup {
  constructor(handlerSubmitForm, popupSelector) {
    super(popupSelector);
    this._handlerSubmitForm = handlerSubmitForm;
    this._formElement = this._popup.querySelector('.popup__container');
  }

  _handlerSubmit = (evt) => {
    evt.preventDefault();
    this._handlerSubmitForm(this.card);
  }

  setEventListeners () {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._handlerSubmit);
  }

  close () {
    super.close();
  }

  open(card) {
    super.open();
    this.card = card;
  }
}
