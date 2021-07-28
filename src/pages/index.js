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

// ------------- ЖИВАЯ ВАЛИДАЦИЯ ФОРМ -------------
const formAuthorValidator = new FormValidator(config, document.forms.formAuthor);
formAuthorValidator.enableValidation();

const formCardValidator = new FormValidator(config, document.forms.formCard);
formCardValidator.enableValidation();

const formAvatarValidator = new FormValidator(config, document.forms.formAvatar);
formAvatarValidator.enableValidation();

// ---------------------- API ---------------------
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
  headers: {
    authorization: 'ef9c4dff-4cef-417b-a4dd-85f6d4ba3fef',
    'Content-Type': 'application/json'
  }
});

// ------------ ОБЪЕКТ С ОБРАБОТЧИКАМИ -------------
const handlersCardClick = {

  // обработчик удаления карточки
  handleDeleteClick: (cardId, cardElement) => {
    const popupTypeConfirm = new PopupWithSubmit(
      function handlerSubmitForm() {
        api.deleteCard(cardId)
          .then(res => {
            if (res.message === "Пост удалён") {
              cardElement.remove();
              popupTypeConfirm.close();
            }
          })
          .catch(rej => console.log(rej))
          .finally(() => {
            popupTypeConfirm.close();
          });
      },
      popupTypeConfirmSelector);
    popupTypeConfirm.open();
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
    const popupTypeImage = new PopupWithImage(data, popupTypeImageSelector);
    popupTypeImage.open();
  }
}

// конструктор карточек
function constructNewCard(data, templateSelector, handlersCardClick) {
  const userId = userInfo.getUserId();
  console.log(userId);
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
    const cardsList = new Section({
      items: cardsInfo,
      renderer: (item) => {
        const newCard = constructNewCard(item, templateSelector, handlersCardClick);
        cardsList.addItem(newCard);
      }
    }, containerForCardsSelector);
    cardsList.rendererItems();

    // ----- ПОПАП ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ ПОЛЬЗОВАТЕЛЯ -----
    const popupTypeAdd = new PopupWithForm(
      function handlerSubmitFormCard(dataCard) {
        formCardValidator.changeButtonText('Создание...');
        api.addCard(dataCard)
          .then(respons => {
            const newCard = constructNewCard(respons, templateSelector, handlersCardClick);
            const cardsList = new Section({}, containerForCardsSelector);
            cardsList.addItemToTop(newCard);
          })
          .catch(rej => console.log(rej))
          .finally(() => {
            popupTypeAdd.close();
            formCardValidator.toggleButtonState();
            formCardValidator.changeButtonText('Создать');
          });
      },
      popupTypeAddSelector);

    // --------------------- ПОПАП АВТОРА ------------------------
    const popupTypeEdit = new PopupWithForm(
      function handlerSubmitFormAuthor(dataAuthor) {
        formAuthorValidator.changeButtonText('Сохранение...');
        api.addProfile(dataAuthor)
          .then(respons => {
            userInfo.setUserInfo(respons);
          })
          .catch(rej => console.log(rej))
          .finally(() => {
            popupTypeEdit.close();
            formAuthorValidator.changeButtonText('Сохранить');
          });
      },
      popupTypeEditSelector);

    // -------------------- ПОПАП АВАТАРКИ ------------------------
    const popupTypeAvatar = new PopupWithForm(
      function handlerSubmitFormAvatar(avatar) {
        formAvatarValidator.changeButtonText('Сохранение...');
        api.updateAvatar(avatar)
          .then(({avatar}) => {
            userInfo.updateAvatar(avatar);
          })
          .catch(rej => console.log(rej))
          .finally(() => {
            popupTypeAvatar.close();
            formAvatarValidator.changeButtonText('Сохранить');
          });
      },
      popupTypeAvatarSelector);

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
.catch(rej => console.log(rej));
