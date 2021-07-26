import './index.css';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo';
import Api from '../components/Api.js';
import {
  popupTypeEditSelector,
  popupTypeAddSelector,
  popupTypeImageSelector,
  popupTypeConfirmSelector,
  dataProfileSelectors,
  config,
  buttonEdit,
  buttonAdd,
  templateSelector,
  containerForCardsSelector,
  profileAvatar
} from '../utils/constants.js';

// ЖИВАЯ ВАЛИДАЦИЯ ФОРМ
const formAuthorValidator = new FormValidator(config, document.forms.formAuthor);
formAuthorValidator.enableValidation();

const formCardValidator = new FormValidator(config, document.forms.formCard);
formCardValidator.enableValidation();

// ОБРАБОТЧИК КЛИКА ПО ИЗОБРАЖЕНИЮ КАРТОЧКИ (открытие попапа)

const handlersCardClick = {
  handleDeleteClick: (cardId, cardElement) => {
    const popupTypeConfirm = new PopupWithSubmit(
      function handlerSubmitForm () {
        const deleteCard = new Api({
          url: `https://mesto.nomoreparties.co/v1/cohort-26/cards/${cardId}`,
          headers: {
            authorization: 'ef9c4dff-4cef-417b-a4dd-85f6d4ba3fef',
          },
        });
        deleteCard.deleteCardFromServer();
        cardElement.remove();
        popupTypeConfirm.close();
      },
      popupTypeConfirmSelector);
    popupTypeConfirm.open();
  },
  handleLikeClick: (cardId, likeActive) => {
    const likeCard = new Api({
      url: `https://mesto.nomoreparties.co/v1/cohort-26/cards/likes/${cardId}`,
      headers: {
        authorization: 'ef9c4dff-4cef-417b-a4dd-85f6d4ba3fef',
      },
    });
    if (likeActive) {
      likeCard.LikeCardApi('DELETE')
        .then(res => newCard.test(res));
    } else {
      likeCard.LikeCardApi('PUT')
        .then(res => newCard.test(res));
    }
  },
  handleImgClick: (data) => {
    const popupTypeImage = new PopupWithImage(data, popupTypeImageSelector);
    popupTypeImage.open();
  }
}

// ДОБАВЛЯЕМ КАРТОЧКИ НА СТРАНИЦУ ПРИ ПЕРВОЙ ЗАГРУЗКЕ с API
function constructNewCard(data, templateSelector, handlersCardClick) {
  const newCard = new Card(data, templateSelector, handlersCardClick);
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
        const newCard = constructNewCard(item, templateSelector, handlersCardClick);
        cardsList.addItem(newCard);
      }
    },
    containerForCardsSelector
  );

  cardsList.rendererItems();
});

// ПОПАП ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ ПОЛЬЗОВАТЕЛЯ
const popupTypeAdd = new PopupWithForm(
  function handlerSubmitFormCard(dataCard) {
    const newCardApi = new Api({
      url: 'https://mesto.nomoreparties.co/v1/cohort-26/cards',
      headers: {
        authorization: 'ef9c4dff-4cef-417b-a4dd-85f6d4ba3fef',
        'Content-Type': 'application/json'
      },
    });
    const addNewServerCard = newCardApi.addCardToServer(dataCard);
    addNewServerCard.then(respons => {
      const newCard = constructNewCard(respons, templateSelector, handlersCardClick);
      const cardsList = new Section({}, containerForCardsSelector);
      cardsList.addItem(newCard);
      popupTypeAdd.close();
      formCardValidator.toggleButtonState();
    });
  },
  popupTypeAddSelector);

// ----------------- ПРОФИЛЬ АВТОРА ---------------------
const userInfo = new UserInfo(dataProfileSelectors);

// Получаем API данные профиля
const getProfileInfoApi = new Api({
  url: 'https://nomoreparties.co/v1/cohort-26/users/me',
  headers: {
    authorization: 'ef9c4dff-4cef-417b-a4dd-85f6d4ba3fef'
  }
});
getProfileInfoApi.getData()
  .then(respons => {
    userInfo.setUserInfo(respons);
    profileAvatar.src = respons.avatar;
  });

// ПОПАП АВТОРА API
const popupTypeEdit = new PopupWithForm(
  function handlerSubmitFormAuthor(dataAuthor) {
    const serverProfile = new Api({
      url: 'https://mesto.nomoreparties.co/v1/cohort-26/users/me',
      headers: {
        authorization: 'ef9c4dff-4cef-417b-a4dd-85f6d4ba3fef',
        'Content-Type': 'application/json'
      }
    });
    const editServerProfile = serverProfile.addProfileInfoToServer(dataAuthor);
    editServerProfile.then(respons => {
      userInfo.setUserInfo(respons);
      popupTypeEdit.close();
    });
  },
  popupTypeEditSelector);

// ОТКРЫТИЕ ПОПАПА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
function handlerClickButtonEdit() {
  popupTypeEdit.setInputValues(userInfo.getUserInfo());
  formAuthorValidator.clearErrorsMessage();
  popupTypeEdit.open();
}
buttonEdit.addEventListener('click', handlerClickButtonEdit);

// ОТКРЫТИЕ ПОПАПА ДОБАВЛЕНИЯ КАРТОЧКИ
buttonAdd.addEventListener('click', () => {
  formCardValidator.clearErrorsMessage();
  popupTypeAdd.open();
});
