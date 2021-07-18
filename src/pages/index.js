import './index.css';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {
  popupTypeEditSelector,
  popupTypeAddSelector,
  popupTypeImageSelector,
  initialCards,
  config,
  popupList,
  profileTitle,
  profileSubtitle,
  buttonEdit,
  buttonAdd,
  nameInput,
  jobInput,
  buttonClosePopupTypeEdit,
  formElementPopupTypeEdit,
  titleInput,
  linkInput,
  buttonClosePopupTypeAdd,
  formElementPopupTypeAdd,
  popupImage,
  popupImageSignature,
  buttonClosePopupTypeImage,
  templateSelector,
  containerForCardsSelector
} from '../utils/constants.js';

// ПОПАПЫ ------------------------------------------------------------------------------------------------------------------------
const popupTypeEdit = new Popup (popupTypeEditSelector);
const popupTypeAdd = new Popup (popupTypeAddSelector);
const popupTypeImage = new Popup (popupTypeImageSelector);

// 1 и 2 new ЖИВАЯ ВАЛИДАЦИЯ ФОРМ ------------------------------------------------------------------------------------------------
const formAuthorValidator = new FormValidator(config, document.forms.formAuthor);
formAuthorValidator.enableValidation();

const formCardValidator = new FormValidator(config, document.forms.formCard);
formCardValidator.enableValidation();

// 3 new ДОБАВЛЯЕМ КАРТОЧКИ НА СТРАНИЦУ ПРИ ПЕРВОЙ ЗАГРУЗКЕ -----------------------------------------------------------------
// open popup image
const openPopupImage = (link, title) => {
  popupImage.src = link;
  popupImage.alt = title;
  popupImageSignature.textContent = title;
  popupTypeImage.open();
}

function constructNewCard(data, templateSelector, openPopupImage) {
  const newCard = new Card(data, templateSelector, openPopupImage);
  return newCard.createCard();
}

// добавляем карточки из массива на страницу
const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const newCard = constructNewCard(item, templateSelector, openPopupImage);
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
  const newCard = constructNewCard(dataNewCard, templateSelector, openPopupImage);
  cardsList.addItem(newCard);
  popupTypeAdd.close();
  formElementPopupTypeAdd.reset();
  formCardValidator.toggleButtonState();
}



// 5 БЛОК ЗАКРЫТИЯ ПОПАПА ПО КЛИКУ НА ОВЕРЛЕЙ -------------------------------------------------------------------------------------
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

// слушатели кнопок попапа редактирования профиля
formElementPopupTypeEdit.addEventListener('submit', submitFormAuthor);
buttonClosePopupTypeEdit.addEventListener('click', () => {
  popupTypeEdit.close();
});

// ПОПАП TYPE ADD ------------------------------------------------------------------------------------------
// слушатели кнопок попапа добавления карточки
buttonAdd.addEventListener('click', () => {
  formCardValidator.clearErrorsMessage();
  popupTypeAdd.open();
});

buttonClosePopupTypeAdd.addEventListener('click', () => {
  popupTypeAdd.close();
});

formElementPopupTypeAdd.addEventListener('submit', submitFormCard);

// ПОПАП ИЗОБРАЖЕНИЯ -------------------------------------------------------------------------------------------
// слушатели кнопок попапа изображения карточки
buttonClosePopupTypeImage.addEventListener('click', () => {
  popupTypeImage.close();
});
