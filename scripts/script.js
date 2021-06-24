const popupErrorList = Array.from(document.querySelectorAll('.popup__error'));
const popupInputList = Array.from(document.querySelectorAll('.popup__input'));

// профиль автора
const profile = document.querySelector('.profile');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__sublitle');
const buttonEdit = profile.querySelector('.profile__edit-button');
const buttonAdd = profile.querySelector('.profile__add-button');

// попап редактирования профиля
const popupTypeEdit = document.querySelector('.popup_type_edit');
const nameInput = popupTypeEdit.querySelector('.popup__input_type_name');
const jobInput = popupTypeEdit.querySelector('.popup__input_type_job');
// кнопки попапа редактирования профиля
const buttonClosePopupTypeEdit = popupTypeEdit.querySelector('.popup__icon-close');
const formElementPopupTypeEdit = popupTypeEdit.querySelector('.popup__container');

// попап добавления карточки
const popupTypeAdd = document.querySelector('.popup_type_add');
const titleInput = popupTypeAdd.querySelector('.popup__input_type_title');
const linkInput = popupTypeAdd.querySelector('.popup__input_type_link');
// кнопки попапа добавления карточки
const buttonClosePopupTypeAdd = popupTypeAdd.querySelector('.popup__icon-close');
const formElementPopupTypeAdd = popupTypeAdd.querySelector('.popup__container');

// попап изображения карточки
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupImageSignature = popupTypeImage.querySelector('.popup__image-signature');
const buttonClosePopupTypeImage = popupTypeImage.querySelector('.popup__icon-close');

// Берем блок template element
const elementTemplate = document.querySelector('.element-template').content;
// Берем блок ul.elements__list
const elementsList = document.querySelector('.elements__list');

// создаем карточку
function createCard(title, link) {
  // клонируем
  const userElement = elementTemplate.querySelector('.element').cloneNode(true);
  // обращаемся к нужным элементам
  const userElementImg = userElement.querySelector('.element__img');
  const userElementTitle = userElement.querySelector('.element__title');
  const buttonLike = userElement.querySelector('.element__icon-like');
  const buttonDelete = userElement.querySelector('.element__icon-delete');
  const imageCard = userElement.querySelector('.element__img');

  // наполняем данными
  userElementImg.src = link;
  userElementImg.alt = title;
  userElementTitle.textContent = title;

  // навешиваем слушатели
  buttonLike.addEventListener('click', likeCard)
  buttonDelete.addEventListener('click', deleteCard)
  imageCard.addEventListener('click', () => {
    openPopupImage(link, title);
  })

  return userElement;
}

// проходим по массиву и добавляем на страницу новые карточки
function renderElements() {
  initialCards.forEach(function (item) {
      elementsList.prepend(createCard(item.name, item.link));
    });
}

// вызываем функцию добавления карточек
renderElements();

// добавление новой карточки пользователя
function submitFormCard (evt) {
  evt.preventDefault();
  elementsList.prepend(createCard(titleInput.value, linkInput.value));
  closePopup(popupTypeAdd);
}

// like card
function likeCard (evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('element__icon-like_active');
}

// delete card
function deleteCard (evt) {
  const eventTarget = evt.target;
  const elementDelete = eventTarget.closest('.element');
  elementDelete.remove();
}

// open popup image
function openPopupImage (link, title) {
  popupImage.src = link;
  popupImage.alt = title;
  popupImageSignature.textContent = title;
  openPopup(popupTypeImage);
}

// открытие попапа
function openPopup (popupType) {
  popupType.classList.add('popup_opened');
}

// закрытие попапа
function closePopup (popupType) {
  popupType.classList.remove('popup_opened');
  popupErrorList.forEach((popupError) => {
    popupError.textContent = "";
  });
  popupInputList.forEach((popupInput) => {
    popupInput.classList.remove('popup__input_type_error');
  });

}

// передаем данные профиля в инпуты попапа редактирования профиля
function editValuePopupTypeEdit () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup (popupTypeEdit);
}

// сохранение данных автора
function submitFormAuthor (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupTypeEdit);
}

// слушатели кнопок профиля
buttonEdit.addEventListener('click', editValuePopupTypeEdit);

// слушатели кнопок попапа редактирования профиля
formElementPopupTypeEdit.addEventListener('submit', submitFormAuthor);
buttonClosePopupTypeEdit.addEventListener('click', () => {
  closePopup(popupTypeEdit);
});

// слушатели кнопок попапа добавления карточки
buttonAdd.addEventListener('click', () => {
  openPopup(popupTypeAdd);
});
buttonClosePopupTypeAdd.addEventListener('click', () => {
  closePopup(popupTypeAdd);
});
formElementPopupTypeAdd.addEventListener('submit', submitFormCard);

// слушатели кнопок попапа изображения карточки
buttonClosePopupTypeImage.addEventListener('click', () => {
  closePopup(popupTypeImage);
});
