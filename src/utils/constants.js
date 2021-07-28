// конфиг для валидации форм
export const config = {
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  errorClass: 'popup__error_visible',
  errorSelector: '.popup__error'
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
