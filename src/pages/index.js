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
  popupTypeAvatarSelector,
  avatarOverlay,
  dataProfileSelectors,
  config,
  buttonEdit,
  buttonAdd,
  templateSelector,
  containerForCardsSelector
} from '../utils/constants.js';

// -------------- ВАЛИДАЦИЯ ФОРМ LIVE--------------
const formAuthorValidator = new FormValidator(config, document.forms.formAuthor);
const formCardValidator = new FormValidator(config, document.forms.formCard);
const formAvatarValidator = new FormValidator(config, document.forms.formAvatar);

// ---------------------- API ---------------------
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
  headers: {
    authorization: 'ef9c4dff-4cef-417b-a4dd-85f6d4ba3fef',
    'Content-Type': 'application/json'
  }
});

// ПОПАП С ИЗОБРАЖЕНИЕМ КАРТОЧКИ
const popupTypeImage = new PopupWithImage(popupTypeImageSelector);
popupTypeImage.setEventListeners();

// ПОПАП С ПОДТВЕРЖДЕНИЕМ УДАЛЕНИЯ КАРТОЧКИ
const popupTypeConfirm = new PopupWithSubmit(
  function handlerSubmitForm(card) {
    //console.log(card.cardId);
    api.deleteCard(card.cardId)
      .then(res => {
        if (res.message === "Пост удалён") {
          card.removeCard();
          popupTypeConfirm.close();
        }
      })
      .catch(rej => console.log(rej));
  },
  popupTypeConfirmSelector);
popupTypeConfirm.setEventListeners();

// ------------ ОБЪЕКТ С ОБРАБОТЧИКАМИ -------------
const handlersCardClick = {

  // обработчик удаления карточки
  handleDeleteClick: function() {
    popupTypeConfirm.open(this);
  },

  // обработчик лайка
  handleLikeClick: function() {
    const like = this.isLiked() ? api.deleteLike(this.cardId) : api.addLike(this.cardId);
    like.then((res) => {
      this.likes = res.likes;
      this.updateQuantityLike();
      this.toggleLikeIcon();
    })
    .catch(rej => console(rej));
  },

  // обработчик клика по изображению карточки
  handleImgClick: (data) => {
    popupTypeImage.open(data);
  }
}

// конструктор карточек
function constructNewCard(data, templateSelector, handlersCardClick) {
  const userId = userInfo.getUserId();
  const newCard = new Card(data, templateSelector, handlersCardClick, userId);
  return newCard.createCard();
}

// профиль
const userInfo = new UserInfo(dataProfileSelectors);

//-------------------- ЗАГРУЗКА ИНФОРМАЦИИ -----------------------
Promise.all([api.getProfile(), api.getCards()])
  .then(([profileInfo, cardsInfo]) => {

    // заполнение профиля
    userInfo.setUserInfo(profileInfo);
    userInfo.updateAvatar(profileInfo.avatar)

    // заполнение карточками
    const cardsList = new Section(
      function renderer(item) {
        const newCard = constructNewCard(item, templateSelector, handlersCardClick);
        cardsList.addItem(newCard);
      },
      containerForCardsSelector);
    cardsList.rendererItems(cardsInfo);

    // ----- ПОПАП ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ ПОЛЬЗОВАТЕЛЯ -----
    const popupTypeAdd = new PopupWithForm(
      function handlerSubmitFormCard(dataCard) {
        formCardValidator.changeButtonText('Создание...');
        api.addCard(dataCard)
          .then(respons => {
            const newCard = constructNewCard(respons, templateSelector, handlersCardClick);
            cardsList.addItemToTop(newCard);
            popupTypeAdd.close();
            formCardValidator.toggleButtonState();
            formCardValidator.changeButtonText('Создать');
          })
          .catch(rej => console.log(rej));
      },
      popupTypeAddSelector);
    popupTypeAdd.setEventListeners();


    // --------------------- ПОПАП АВТОРА ------------------------
    const popupTypeEdit = new PopupWithForm(
      function handlerSubmitFormAuthor(dataAuthor) {
        formAuthorValidator.changeButtonText('Сохранение...');
        api.addProfile(dataAuthor)
          .then(respons => {
            userInfo.setUserInfo(respons);
            popupTypeEdit.close();
            formAuthorValidator.changeButtonText('Сохранить');
          })
          .catch(rej => console.log(rej));
      },
      popupTypeEditSelector);
    popupTypeEdit.setEventListeners();


    // -------------------- ПОПАП АВАТАРКИ ------------------------
    const popupTypeAvatar = new PopupWithForm(
      function handlerSubmitFormAvatar(avatar) {
        formAvatarValidator.changeButtonText('Сохранение...');
        api.updateAvatar(avatar)
          .then(({avatar}) => {
            userInfo.updateAvatar(avatar);
            popupTypeAvatar.close();
            formAvatarValidator.changeButtonText('Сохранить');
          })
          .catch(rej => console.log(rej));
      },
      popupTypeAvatarSelector);
    popupTypeAvatar.setEventListeners();

    // ---------- ОТКРЫТИЕ ПОПАПА РЕДАКТИРОВАНИЯ ПРОФИЛЯ -----------
    function handlerClickButtonEdit() {
      popupTypeEdit.setInputValues(userInfo.getUserInfo());
      formAuthorValidator.clearErrorsMessage();
      popupTypeEdit.open();
    }
    buttonEdit.addEventListener('click', handlerClickButtonEdit);

    // ------------ ОТКРЫТИЕ ПОПАПА ДОБАВЛЕНИЯ КАРТОЧКИ -------------
    buttonAdd.addEventListener('click', () => {
      formCardValidator.clearErrorsMessage();
      popupTypeAdd.open();
    });

    //  ----------------- ОТКРЫТИЕ ПОПАПА АВАТАРКИ ------------------
    avatarOverlay.addEventListener('click', () => {
      formAvatarValidator.clearErrorsMessage();
      formAvatarValidator.toggleButtonState();
      popupTypeAvatar.open();
    });
  })
.catch(rej => console.log(rej))
.finally(() => {
  // запуск валидации
  formCardValidator.enableValidation();
  formAuthorValidator.enableValidation();
  formAvatarValidator.enableValidation();
});
