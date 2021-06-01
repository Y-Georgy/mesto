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
const buttonClosePopupTypeAdd = popupTypeAdd.querySelector('.popup__icon-close')
const formElementPopupTypeAdd = popupTypeAdd.querySelector('.popup__container');


// массив с данными карточек elements
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Берем блок template element
const elementTemplate = document.querySelector('.element-template').content;

// Берем блок ul.elements__list
const elementsList = document.querySelector('.elements__list');

// проходимся по массиву, берем и добавляем данные в новый массив и выводим на страницу
initialCards.forEach( item => {
  const userElement = elementTemplate.querySelector('.element').cloneNode(true); // клонируем
  userElement.querySelector('.element__img').src = item.link;
  userElement.querySelector('.element__img').alt = item.name;
  userElement.querySelector('.element__title').textContent = item.name;
  elementsList.append(userElement);
});

// добавление новой карточки
function submitFormCard (evt) {
  evt.preventDefault();
  const userElement = elementTemplate.querySelector('.element').cloneNode(true); // клонируем
  userElement.querySelector('.element__img').src = linkInput.value;
  userElement.querySelector('.element__img').alt = titleInput.value;
  userElement.querySelector('.element__title').textContent = titleInput.value;
  elementsList.prepend(userElement);
  closePopup(popupTypeAdd);
}

// открытие попапа
function openPopup (popupType) {
  popupType.classList.add('popup_opened');
}

// закрытие попапа
function closePopup (popupType) {
  popupType.classList.remove('popup_opened');
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
