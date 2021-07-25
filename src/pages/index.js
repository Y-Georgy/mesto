import './index.css';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo';
import Api from '../components/Api.js';
import {popupTypeEditSelector,
  popupTypeAddSelector,
  popupTypeImageSelector,
  dataProfileSelectors,
  config,
  buttonEdit,
  buttonAdd,
  nameInput,
  jobInput,
  templateSelector,
  containerForCardsSelector,
  profileTitle,
  profileSubtitle,
  profileAvatar
} from '../utils/constants.js';

// ----------------------API данные профиля ----------------------
const api = new Api({
    url: 'https://nomoreparties.co/v1/cohort-26/users/me',
    headers: {
      authorization: 'ef9c4dff-4cef-417b-a4dd-85f6d4ba3fef'
    }
  });
const apiData = api.getData();

apiData.then(respons => {
  profileTitle.textContent = respons.name;
  profileSubtitle.textContent = respons.about;
  profileAvatar.src = respons.avatar;
});

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

// ДОБАВЛЯЕМ КАРТОЧКИ НА СТРАНИЦУ ПРИ ПЕРВОЙ ЗАГРУЗКЕ с API
function constructNewCard(data, templateSelector, handleCardClick) {
  const newCard = new Card(data, templateSelector, handleCardClick);
  return newCard.createCard();
}

const apiCards = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-26/cards',
  headers: {
    authorization: 'ef9c4dff-4cef-417b-a4dd-85f6d4ba3fef'
  }
});
apiCards.getData().then(respons => {
  const cardsList = new Section(
    {
      items: respons,
      renderer: (item) => {
        const newCard = constructNewCard(item, templateSelector, handleCardClick);
        cardsList.addItem(newCard);
      }
    },
    containerForCardsSelector
  );

  cardsList.rendererItems();
});

// ПОПАП ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ ПОЛЬЗОВАТЕЛЯ
const popupTypeAdd = new PopupWithForm (
  function handlerSubmitFormCard (dataCard) {
    const newCardApi = new Api({
      url: 'https://mesto.nomoreparties.co/v1/cohort-26/cards',
      method: 'POST',
      headers: {
        authorization: 'ef9c4dff-4cef-417b-a4dd-85f6d4ba3fef',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataCard)
    });
    const addNewServerCard = newCardApi.callToServer();
    addNewServerCard.then(respons => {
      const newCard = constructNewCard(respons, templateSelector, handleCardClick);
      const cardsList = new Section({},containerForCardsSelector);
      cardsList.addItem(newCard);
      popupTypeAdd.close();
      formCardValidator.toggleButtonState();
    });
  },
  popupTypeAddSelector);

// ПРОФИЛЬ АВТОРА
const userInfo = new UserInfo(dataProfileSelectors);

// ПОПАП АВТОРА API
const popupTypeEdit = new PopupWithForm (
  function handlerSubmitFormAuthor (dataAuthor) {
    const serverProfile = new Api({
      url: 'https://mesto.nomoreparties.co/v1/cohort-26/users/me',
      method: 'PATCH',
      headers: {
        authorization: 'ef9c4dff-4cef-417b-a4dd-85f6d4ba3fef',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataAuthor)
    });
    const editServerProfile = serverProfile.callToServer();
    editServerProfile.then(respons => {
      userInfo.setUserInfo(respons);
      popupTypeEdit.close();
    });
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

