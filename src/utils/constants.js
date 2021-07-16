// массив с данными карточек elements
export const initialCards = [
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

export const config = {
  // formSelector: '.popup__container', // формы
  inputSelector: '.popup__input', // инпуты
  inputErrorClass: 'popup__input_type_error', // красное подчеркивание ошибки
  submitButtonSelector: '.popup__submit-button', // кнопка submit
  inactiveButtonClass: 'popup__submit-button_disabled', // неактивная кнопка submit
  errorClass: 'popup__error_visible', // вывод ошибки
  errorSelector: '.popup__error' // селектор ошибок
};

export const popupList = Array.from(document.querySelectorAll('.popup'));

// профиль автора
const profile = document.querySelector('.profile');
export const profileTitle = profile.querySelector('.profile__title');
export const profileSubtitle = profile.querySelector('.profile__sublitle');
export const buttonEdit = profile.querySelector('.profile__edit-button');
export const buttonAdd = profile.querySelector('.profile__add-button');

// попап редактирования профиля
export const popupTypeEdit = document.querySelector('.popup_type_edit');
export const nameInput = popupTypeEdit.querySelector('.popup__input_type_name');
export const jobInput = popupTypeEdit.querySelector('.popup__input_type_job');
// кнопки попапа редактирования профиля
export const buttonClosePopupTypeEdit = popupTypeEdit.querySelector('.popup__icon-close');
export const formElementPopupTypeEdit = popupTypeEdit.querySelector('.popup__container');

// попап добавления карточки
export const popupTypeAdd = document.querySelector('.popup_type_add');
export const titleInput = popupTypeAdd.querySelector('.popup__input_type_title');
export const linkInput = popupTypeAdd.querySelector('.popup__input_type_link');
// кнопки попапа добавления карточки
export const buttonClosePopupTypeAdd = popupTypeAdd.querySelector('.popup__icon-close');
export const formElementPopupTypeAdd = popupTypeAdd.querySelector('.popup__container');
// export const buttonSubmitPopupTypeAdd = popupTypeAdd.querySelector('.popup__submit-button');

// попап изображения карточки
export const popupTypeImage = document.querySelector('.popup_type_image');
export const popupImage = popupTypeImage.querySelector('.popup__image');
export const popupImageSignature = popupTypeImage.querySelector('.popup__image-signature');
export const buttonClosePopupTypeImage = popupTypeImage.querySelector('.popup__icon-close');

// Берем блок ul.elements__list
export const elementsList = document.querySelector('.elements__list');
// Берем template
export const templateSelector = '.element-template';
