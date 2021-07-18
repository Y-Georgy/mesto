import './index.css';
import Section from '../components/Section.js';
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
  popupTypeImage,
  popupImage,
  popupImageSignature,
  buttonClosePopupTypeImage,
  templateSelector,
  containerForCardsSelector
} from '../utils/constants.js';

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
  openPopup(popupTypeImage);
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
  closePopup(popupTypeAdd);
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

// 6 БЛОК ЗАКРЫТИЯ ПОПАПА ПО КЛИКУ НА ESC -------------------------------------------------------------------------------
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

// --------------------------------------------------------------------------------------------------------------------------

// 7 открытие попапа
function openPopup (popupType) {
  popupType.classList.add('popup_opened');
  setEscListener(); // устанавливаю слушатель ESC для закрытия попапа
}

// 8 закрытие попапа
function closePopup (popupType) {
  popupType.classList.remove('popup_opened');
  removeEscListener(); // удаляю слушатель ESC для закрытия попапа
}

// 9 ПОПАП АВТОРА --------------------------------------------------------------------------------------------------

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

// ПОПАП TYPE ADD ------------------------------------------------------------------------------------------
// слушатели кнопок попапа добавления карточки
buttonAdd.addEventListener('click', () => {
  formCardValidator.clearErrorsMessage();
  openPopup(popupTypeAdd);
});

buttonClosePopupTypeAdd.addEventListener('click', () => {
  closePopup(popupTypeAdd);
});

formElementPopupTypeAdd.addEventListener('submit', submitFormCard);

// ПОПАП ИЗОБРАЖЕНИЯ -------------------------------------------------------------------------------------------
// слушатели кнопок попапа изображения карточки
buttonClosePopupTypeImage.addEventListener('click', () => {
  closePopup(popupTypeImage);
});
