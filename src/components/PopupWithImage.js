import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupSignature = this._popup.querySelector('.popup__image-signature');
  }

  open = ({link, title}) => {
    this._popupImage.src = link;
    this._popupImage.alt = `Увеличенное изображение ${title}`;
    this._popupSignature.textContent = title;
    super.open();
  }
}

export default PopupWithImage;
