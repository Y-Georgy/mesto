import './index.css';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo';
import {
  popupTypeEditSelector,
  popupTypeAddSelector,
  popupTypeImageSelector,
  dataProfileSelectors,
  initialCards,
  config,
  buttonEdit,
  buttonAdd,
  nameInput,
  jobInput,
  templateSelector,
  containerForCardsSelector
} from '../utils/constants.js';

// ЖИВАЯ ВАЛИДАЦИЯ ФОРМ
const formAuthorValidator = new FormValidator(config, document.forms.formAuthor);
formAuthorValidator.enableValidation();

const formCardValidator = new FormValidator(config, document.forms.formCard);
formCardValidator.enableValidation();

// ОБРАБОТЧИК КЛИКА ПО ИЗОБРАЖЕНИЮ КАРТОЧКИ (открытие попапа)
function handleCardClick(data) {
  const popupTypeImage = new PopupWithImage (data, popupTypeImageSelector);
  popupTypeImage.open();
}

// ДОБАВЛЯЕМ КАРТОЧКИ НА СТРАНИЦУ ПРИ ПЕРВОЙ ЗАГРУЗКЕ
function constructNewCard(data, templateSelector, handleCardClick) {
  const newCard = new Card(data, templateSelector, handleCardClick);
  return newCard.createCard();
}

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

// ПОПАП ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ ПОЛЬЗОВАТЕЛЯ
const popupTypeAdd = new PopupWithForm (
  function handlerSubmitFormCard (dataCard) {
    const dataNewCard = {
      name: dataCard.cardTitle,
      link: dataCard.cardLink
    }
    const newCard = constructNewCard(dataNewCard, templateSelector, handleCardClick);
    cardsList.addItem(newCard);
    popupTypeAdd.close();
    formCardValidator.toggleButtonState();
  },
  popupTypeAddSelector);

// ПРОФИЛЬ АВТОРА
const userInfo = new UserInfo(dataProfileSelectors);

// ПОПАП АВТОРА
const popupTypeEdit = new PopupWithForm (
  function handlerSubmitFormAuthor (dataAuthor) {
    userInfo.setUserInfo(dataAuthor);
    popupTypeEdit.close();
  },
  popupTypeEditSelector);

// ОТКРЫТИЕ ПОПАПА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
function handlerClickButtonEdit () {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  formAuthorValidator.clearErrorsMessage();
  popupTypeEdit.open();
}
buttonEdit.addEventListener('click', handlerClickButtonEdit);

// ОТКРЫТИЕ ПОПАПА ДОБАВЛЕНИЯ КАРТОЧКИ
buttonAdd.addEventListener('click', () => {
  formCardValidator.clearErrorsMessage();
  popupTypeAdd.open();
});

