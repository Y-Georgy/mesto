class Card {
  constructor (data, templateSelector, openPopupImage) {
    this._templateElement = document.querySelector(templateSelector).content;
    this._title = data.name;
    this._link = data.link;
    this._openPopupImage = openPopupImage;
  }

  // клонируем template
    _cloneTemplateElement = () => {
      this._cardNewElement = this._templateElement.querySelector('.element').cloneNode(true);
    }

  // берем нужные элементы из разметки
  _takeElementsCard = () => {
    this._imgElement = this._cardNewElement.querySelector('.element__img');
    this._titleElement = this._cardNewElement.querySelector('.element__title');
    this._buttonLike = this._cardNewElement.querySelector('.element__icon-like');
    this._buttonDelete = this._cardNewElement.querySelector('.element__icon-delete');
  }

  // наполняем данными карточку
  _fillDataCard = () => {
    this._imgElement.src = this._link;
    this._imgElement.alt = this._title;
    this._titleElement.textContent = this._title;
  }

  // устанавливаем слушатели
  _setEventListeners = () => {
    this._buttonLike.addEventListener('click', this._likeCard)
    this._buttonDelete.addEventListener('click', this._deleteCard)
    this._imgElement.addEventListener('click', () => {
      this._openPopupImage(this._link, this._title);
    })
  }

  // like card
  _likeCard = () => {
    this._buttonLike.classList.toggle('element__icon-like_active');
  }

  // delete card
  _deleteCard = () => {
    const cardElementToDelete = this._buttonDelete.closest('.element');
    cardElementToDelete.remove();
  }

  // создаем карточку
  createCard = () => {
    this._cloneTemplateElement();
    this._takeElementsCard();
    this._fillDataCard();
    this._setEventListeners();
    return this._cardNewElement;
  }
}

export default Card;
