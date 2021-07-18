import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor ({link, title}, popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupSignature = this._popup.querySelector('.popup__image-signature');
    this._link = link;
    this._title = title;
  }

  open = () => {
    super.open();
    this._popupImage.src = this._link;
    this._popupImage.alt = this._title;
    this._popupSignature.textContent = this._title;
  }
}

export default PopupWithImage;
