import './index.css';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {
  popupTypeEditSelector,
  popupTypeAddSelector,
  popupTypeImageSelector,
  initialCards,
  config,
  profileTitle,
  profileSubtitle,
  buttonEdit,
  buttonAdd,
  nameInput,
  jobInput,
  formElementPopupTypeEdit,
  titleInput,
  linkInput,
  formElementPopupTypeAdd,
  templateSelector,
  containerForCardsSelector
} from '../utils/constants.js';

// ПОПАПЫ ------------------------------------------------------------------------------------------------------------------------
const popupTypeEdit = new Popup (popupTypeEditSelector);
const popupTypeAdd = new Popup (popupTypeAddSelector);

// 1 и 2 new ЖИВАЯ ВАЛИДАЦИЯ ФОРМ ------------------------------------------------------------------------------------------------
const formAuthorValidator = new FormValidator(config, document.forms.formAuthor);
formAuthorValidator.enableValidation();

const formCardValidator = new FormValidator(config, document.forms.formCard);
formCardValidator.enableValidation();

// ---------------------------------------------------------------------------------------------------------------------------------
// Обработчик клика по изображению карточки (открытие попапа)
function handleCardClick(data) {
  const popupTypeImage = new PopupWithImage (data, popupTypeImageSelector);
  popupTypeImage.open();
}

// 3 new ДОБАВЛЯЕМ КАРТОЧКИ НА СТРАНИЦУ ПРИ ПЕРВОЙ ЗАГРУЗКЕ -----------------------------------------------------------------

function constructNewCard(data, templateSelector, handleCardClick) {
  const newCard = new Card(data, templateSelector, handleCardClick);
  return newCard.createCard();
}

// добавляем карточки из массива на страницу
const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const newCard = constructNewCard(item, templateSelector, handleCardClick);
      cardsList.addItem(newCard);
    }
  },
  containerForCardsSelector
);

cardsList.rendererItems();

// 4 new ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ ПОЛЬЗОВАТЕЛЯ --------------------------------------------------------------------------------------

function submitFormCard (evt) {
  evt.preventDefault();
  const dataNewCard = {
    name: titleInput.value,
    link: linkInput.value
  }
  const newCard = constructNewCard(dataNewCard, templateSelector, handleCardClick);
  cardsList.addItem(newCard);
  popupTypeAdd.close();
  formElementPopupTypeAdd.reset();
  formCardValidator.toggleButtonState();
}

// 9 ПОПАП АВТОРА --------------------------------------------------------------------------------------------------

// передаем данные профиля в инпуты попапа редактирования профиля
function editValuePopupTypeEdit () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  formAuthorValidator.clearErrorsMessage();
  popupTypeEdit.open();
}

// сохранение данных автора
function submitFormAuthor (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  popupTypeEdit.close();
}

// слушатели кнопок профиля
buttonEdit.addEventListener('click', editValuePopupTypeEdit);

// слушатель кнопок попапа редактирования профиля
formElementPopupTypeEdit.addEventListener('submit', submitFormAuthor);

// ПОПАП TYPE ADD ------------------------------------------------------------------------------------------
// слушатели кнопок попапа добавления карточки
buttonAdd.addEventListener('click', () => {
  formCardValidator.clearErrorsMessage();
  popupTypeAdd.open();
});

formElementPopupTypeAdd.addEventListener('submit', submitFormCard);
