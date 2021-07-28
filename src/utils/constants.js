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
  profileSubtitleSelector: '.profile__subtitle',
  profileAvatarSelector: '.profile__avatar'
}
// аватар
export const avatarOverlay = document.querySelector('.profile__overlay-avatar');

// кнопки
export const buttonEdit = profile.querySelector('.profile__edit-button');
export const buttonAdd = profile.querySelector('.profile__add-button');

// попапы
export const popupTypeEditSelector = '.popup_type_edit';
export const popupTypeAddSelector = '.popup_type_add';
export const popupTypeImageSelector = '.popup_type_image';
export const popupTypeConfirmSelector = '.popup_type_confirm';
export const popupTypeAvatarSelector = '.popup_type_avatar';

// контейнер для карточек
export const containerForCardsSelector = '.elements__list';

// template
export const templateSelector = '.element-template';
