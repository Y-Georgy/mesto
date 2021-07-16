import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {
  initialCards,
  config,
  popupList,
  profileTitle,
  profileSubtitle,
  buttonEdit,
  buttonAdd,
  popupTypeEdit,
  nameInput,
  jobInput,
  buttonClosePopupTypeEdit,
  formElementPopupTypeEdit,
  popupTypeAdd,
  titleInput,
  linkInput,
  buttonClosePopupTypeAdd,
  formElementPopupTypeAdd,
  //buttonSubmitPopupTypeAdd,
  popupTypeImage,
  popupImage,
  popupImageSignature,
  buttonClosePopupTypeImage
} from '../utils/constants.js';

// ЖИВАЯ ВАЛИДАЦИЯ ФОРМ


const formAuthorValidator = new FormValidator(config, document.forms.formAuthor);
formAuthorValidator.enableValidation();

const formCardValidator = new FormValidator(config, document.forms.formCard);
formCardValidator.enableValidation();
// ------------------------------------------------------------------------------------


// ДОБАВЛЯЕМ КАРТОЧКИ НА СТРАНИЦУ ПРИ ПЕРВОЙ ЗАГРУЗКЕ
// Берем блок ul.elements__list
const elementsList = document.querySelector('.elements__list');
// Берем template
const templateSelector = '.element-template';

// open popup image
const openPopupImage = (link, title) => {
  popupImage.src = link;
  popupImage.alt = title;
  popupImageSignature.textContent = title;
  openPopup(popupTypeImage);
}

function constructNewCard(data, templateSelector, openPopupImage) {
  const newCard = new Card(data, templateSelector, openPopupImage);
  return newCard.createCard();
}

// проходим по массиву и добавляем на страницу новые карточки
function renderElements(initialCards, elementsList) {
  initialCards.forEach(function (item) {
    elementsList.prepend(constructNewCard(item, templateSelector, openPopupImage));
  });
}

// вызываем функцию добавления карточек
renderElements(initialCards, elementsList);

// ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ ПОЛЬЗОВАТЕЛЯ
function submitFormCard (evt) {
  evt.preventDefault();
  const dataNewCard = {
    name: titleInput.value,
    link: linkInput.value
  }
  elementsList.prepend(constructNewCard(dataNewCard, templateSelector, openPopupImage));
  closePopup(popupTypeAdd);
  formElementPopupTypeAdd.reset();
  formCardValidator.toggleButtonState();
}

// БЛОК ЗАКРЫТИЯ ПОПАПА ПО КЛИКУ НА ОВЕРЛЕЙ
// функция установки слушателя по оверлею
function setListenerOverlayClick(popup) {
  popup.addEventListener('click', (evt) => {
    checkContainsClassOverlay(evt);
  });
}

// проверка содержания класса оверлея
function checkContainsClassOverlay (evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup (evt.target);
  }
}

function setListenersToAllPopups (popupList) {
  popupList.forEach((popupElem) => {
    setListenerOverlayClick(popupElem);
  })
}

setListenersToAllPopups(popupList);

// БЛОК ЗАКРЫТИЯ ПОПАПА ПО КЛИКУ НА ESC
function setEscListener() {
  document.addEventListener('keydown', checkPressEscKey);
};

function removeEscListener() {
  document.removeEventListener('keydown', checkPressEscKey);
};

function checkPressEscKey (evt) {
  if (evt.key === 'Escape') {
    const openedPopupNow = document.querySelector('.popup_opened');
    closePopup(openedPopupNow);
  }
}

// открытие попапа
function openPopup (popupType) {
  popupType.classList.add('popup_opened');
  setEscListener(); // устанавливаю слушатель ESC для закрытия попапа
}

// закрытие попапа
function closePopup (popupType) {
  popupType.classList.remove('popup_opened');
  removeEscListener(); // удаляю слушатель ESC для закрытия попапа
}

// передаем данные профиля в инпуты попапа редактирования профиля
function editValuePopupTypeEdit () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  formAuthorValidator.clearErrorsMessage();
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
  formCardValidator.clearErrorsMessage();
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
