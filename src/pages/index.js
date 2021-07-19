import './index.css';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
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
  templateSelector,
  containerForCardsSelector
} from '../utils/constants.js';

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

// ДОБАВЛЯЕМ КАРТОЧКИ НА СТРАНИЦУ ПРИ ПЕРВОЙ ЗАГРУЗКЕ -----------------------------------------------------------------
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

// ПОПАП ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ ПОЛЬЗОВАТЕЛЯ --------------------------------------------------------------------------------------
const popupTypeAdd = new PopupWithForm (
  function submitFormCard (evt) {
    evt.preventDefault();
    const dataCard = popupTypeAdd.getInputValues();
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

// ПОПАП АВТОРА --------------------------------------------------------------------------------------------------
const popupTypeEdit = new PopupWithForm (
  function submitFormAuthor (evt) {
    evt.preventDefault();
    const dataAuthor = popupTypeEdit.getInputValues();
    profileTitle.textContent = dataAuthor.authorName;
    profileSubtitle.textContent = dataAuthor.authorJob;
    popupTypeEdit.close();
  },
  popupTypeEditSelector);

// КНОПКИ -----------------------------------------------------------------
// передаем данные профиля в инпуты попапа редактирования профиля
function handlerClickButtonEdit () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  formAuthorValidator.clearErrorsMessage();
  popupTypeEdit.open();
}
// слушатель кнопки редактирования профиля
buttonEdit.addEventListener('click', handlerClickButtonEdit);

// слушатель кнопки добавления карточки
buttonAdd.addEventListener('click', () => {
  formCardValidator.clearErrorsMessage();
  popupTypeAdd.open();
});

