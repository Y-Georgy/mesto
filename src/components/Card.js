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
    this._data = data;
    this._myProfileId = '5e3543d6c22b20fed4882e3e';
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
    if (this._ownerId !== this._myProfileId) {
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
    this.updateQuantityLike();
  }

  // обновляем кол-во лайков
  updateQuantityLike() {
    this._likeQuantity.textContent = this._likes.length;
  }

  toggleLikeIcon() {
    if (this.isLiked()) {
      this._buttonLike.classList.add('element__icon-like_active');
    } else {
      this._buttonLike.classList.remove('element__icon-like_active');
    }
  }

  // проверка лайка
  isLiked() {
    return this._likes.some((item) => {
      return item._id === this._myProfileId;
    });
  }

  // устанавливаем слушатели
  _setEventListeners = () => {
    this._buttonLike.addEventListener('click', () => {
        this._handleLikeClick(this);
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

  // создаем карточку
  createCard = () => {
    //console.log(this.cardId);
    this._cloneTemplateElement();
    this._takeElementsCard();
    this._compareOwner();
    this._fillDataCard();
    this.toggleLikeIcon();
    this._setEventListeners();
    return this._cardNewElement;
  }
}

export default Card;
