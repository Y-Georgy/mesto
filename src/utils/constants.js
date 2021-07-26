// массив с данными карточек elements
// export const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ];

export const config = {
  inputSelector: '.popup__input', // инпуты
  inputErrorClass: 'popup__input_type_error', // красное подчеркивание ошибки
  submitButtonSelector: '.popup__submit-button', // кнопка submit
  inactiveButtonClass: 'popup__submit-button_disabled', // неактивная кнопка submit
  errorClass: 'popup__error_visible', // вывод ошибки
  errorSelector: '.popup__error' // селектор ошибок
};

// профиль автора
const profile = document.querySelector('.profile');
export const dataProfileSelectors = {
  profileTitleSelector: '.profile__title',
  profileSubtitleSelector: '.profile__subtitle'
}
// аватар
export const profileAvatar = document.querySelector('.profile__avatar');

// кнопки
export const buttonEdit = profile.querySelector('.profile__edit-button');
export const buttonAdd = profile.querySelector('.profile__add-button');

// попап редактирования профиля
export const popupTypeEditSelector = '.popup_type_edit';

// попап добавления карточки
export const popupTypeAddSelector = '.popup_type_add';

// попап изображения карточки
export const popupTypeImageSelector = '.popup_type_image';

// контейнер для карточек
export const containerForCardsSelector = '.elements__list';

// template
export const templateSelector = '.element-template';
