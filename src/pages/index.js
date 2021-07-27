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

// ---------- API -------------
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-26',
  headers: {
    authorization: 'ef9c4dff-4cef-417b-a4dd-85f6d4ba3fef',
    'Content-Type': 'application/json'
  }
});

// ОБРАБОТЧИК КЛИКА ПО ИЗОБРАЖЕНИЮ КАРТОЧКИ (открытие попапа)
const handlersCardClick = {
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
          .catch(rej => alert(rej));

      },
      popupTypeConfirmSelector);
    popupTypeConfirm.open();
  },
  // handleLikeClick: function(cardId, likeActive, setLikesInfo) {
  //   if (likeActive) {
  //     api.deleteLike(cardId)
  //       .then(res => setLikesInfo(res)) // newCard -> undefined // setLikesInfo(likes)
  //       //.catch(rej => alert(rej));
  //   } else {
  //     api.addLike(cardId)
  //       .then(res => {
  //         setLikesInfo(res); // newCard -> undefined
  //       });
  //       //.catch(rej => alert(rej));
  //   }
  // },
  handleLikeClick: function() {
    if (this.isLiked) {
      api.deleteLike(this.cardId)
        .then((res) => {
        this._likes = res.likes;
        console.log(this.isLiked());
        this.updateLike();
      })
      .catch(rej => console(rej));
    } else {
      api.addLike(this.cardId)
        .then((res) => {
          this._likes = res.likes;
          //console.log(this.isLiked());
          this.updateLike();
        })
        .catch(rej => console(rej));
    }
    //const like = this.isLiked ? api.deleteLike(this.cardId) : api.addLike(this.cardId);
    // console.log(`id в index ${this.cardId}`);

    // like.then((res) => {
    //       //this._likes = res.likes;
    //       console.log(res);
    //       this.updateLike();
    //       //this.setLikesInfo(res.likes);
    //       //console.log(res.likes);
    //     })
    //     .catch(rej => console(rej));
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
api.getCards()
  .then(respons => {
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
  })
  .catch(rej => alert(rej));

// ПОПАП ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ ПОЛЬЗОВАТЕЛЯ
const popupTypeAdd = new PopupWithForm(
  function handlerSubmitFormCard(dataCard) {
    api.addCard(dataCard)
      .then(respons => {
        const newCard = constructNewCard(respons, templateSelector, handlersCardClick);
        const cardsList = new Section({}, containerForCardsSelector);
        cardsList.addItemToTop(newCard);
        popupTypeAdd.close();
        formCardValidator.toggleButtonState();
      })
      .catch(rej => alert(rej));
  },
  popupTypeAddSelector);

// ----------------- ПРОФИЛЬ АВТОРА ---------------------
const userInfo = new UserInfo(dataProfileSelectors);

// Получаем API данные профиля
api.getProfile()
  .then(respons => {
    userInfo.setUserInfo(respons);
    profileAvatar.src = respons.avatar;
  })
  .catch(rej => alert(rej));


// ПОПАП АВТОРА API
const popupTypeEdit = new PopupWithForm(
  function handlerSubmitFormAuthor(dataAuthor) {
    api.addProfile(dataAuthor)
      .then(respons => {
        userInfo.setUserInfo(respons);
        popupTypeEdit.close();
      })
      .catch(rej => alert(rej));

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


// ПЕРЕНЕСТИ ВСЕ .CATCH ИЗ КЛАССА API В INDEX.JS И ПОСТАВИТЬ ПОСЛЕ ПОСЛЕДНЕГО .THEN!!!
// ПРОПИСАТЬ ВСЕМ FETCH`ам FINALLY - ТО ЧТО ВЫПОЛНИТСЯ В КОНЦЕ НЕ ЗАВИСИМО ОТ РЕЗУЛЬТАТА
// Объявить переменную с ID пользователя в глобальной видимости, а внутри функций переназначать этот id и тогда он будет доступен в глобальной области
// 1231231
