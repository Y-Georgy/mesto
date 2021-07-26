class Card {
  constructor (data, templateSelector, {handleDeleteClick, handleLikeClick, handleImgClick}) {
    this._templateElement = document.querySelector(templateSelector).content;
    this._title = data.name;
    this._link = data.link;
    this._handleImgClick = handleImgClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this.cardId = data._id
    //this._data = data;
  }

  // клонируем template
    _cloneTemplateElement = () => {
      this._cardNewElement = this._templateElement.querySelector('.element').cloneNode(true);
    }

  // берем нужные элементы из разметки
  _takeElementsCard = () => {
    this._imgElement = this._cardNewElement.querySelector('.element__img');
    this._titleElement = this._cardNewElement.querySelector('.element__title');
    this._likeQuantity = this._cardNewElement.querySelector('.element__like-quantity');
    this._buttonLike = this._cardNewElement.querySelector('.element__icon-like');
    this._buttonDelete = this._cardNewElement.querySelector('.element__icon-delete');
  }

  // сверяем id карточки и мой id
  _compareOwner = () => {
    if (this._ownerId !== '5e3543d6c22b20fed4882e3e') {
      this._buttonDelete.remove();
      this._flag = false;
    } else {
      this._flag = true;
    }
  }

  // наполняем данными карточку
  _fillDataCard = () => {
    this._imgElement.src = this._link;
    this._imgElement.alt = this._title;
    this._titleElement.textContent = this._title;
    this._likeQuantity.textContent = this._likes.length;
  }

  test(message) {
    console.log(message)
  }

  // устанавливаем слушатели
  _setEventListeners = () => {
    this._buttonLike.addEventListener('click', () => {
      if (this._buttonLike.classList.contains('element__icon-like_active')) {
        this._handleLikeClick(this.cardId, true);
        this._buttonLike.classList.remove('element__icon-like_active');
      } else {
        this._handleLikeClick(this.cardId, false);
        this._buttonLike.classList.add('element__icon-like_active');
      }
    })
    if (this._flag) {
      console.log('Есть моя карточка');
      this._buttonDelete.addEventListener('click', () => {
        this._handleDeleteClick(this.cardId, this._cardNewElement);
      });
    }
    this._imgElement.addEventListener('click', () => {
      this._handleImgClick({
        link: this._link,
        title: this._title
      });
    })
  }

  // like card
  // _likeCard = () => {
  //   this._buttonLike.classList.toggle('element__icon-like_active');
  // }

  // delete card
  // _deleteCard = () => {
  //   const cardElementToDelete = this._buttonDelete.closest('.element');
  //   cardElementToDelete.remove();
  // }

  // создаем карточку
  createCard = () => {
    //console.log(this.cardId);
    this._cloneTemplateElement();
    this._takeElementsCard();
    this._compareOwner();
    this._fillDataCard();
    this._setEventListeners();
    return this._cardNewElement;
  }
}

export default Card;
