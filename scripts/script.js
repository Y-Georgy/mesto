// профиль автора
const profile = document.querySelector('.profile');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__sublitle');

// попап для ввода данных автора
const popup = document.querySelector('.popup');
const nameInput = popup.querySelector('.popup__input-name');
const jobInput = popup.querySelector('.popup__input-job');

// кнопки
const editButton = profile.querySelector('.profile__edit-button');
const closeButton = popup.querySelector('.popup__icon-close');
const formElement = popup.querySelector('.popup__container');


// массив с данными карточек elements
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Берем блок template element
const elementTemplate = document.querySelector('.element-template').content;

// Берем блок ul.elements__list
const elementsList = document.querySelector('.elements__list');

// проходимся по массиву, берем и добавляем данные в новый массив и выводим на страницу
initialCards.forEach( item => {
  const userElement = elementTemplate.querySelector('.element').cloneNode(true); // клонируем
  userElement.querySelector('.element__img').src = item.link;
  userElement.querySelector('.element__img').alt = item.name;
  userElement.querySelector('.element__title').textContent = item.name;
  elementsList.append(userElement);
});

// открытие попапа
function openPopup () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  popup.classList.add('popup_opened');
}

// закрытие попапа
function closePopup () {
  popup.classList.remove('popup_opened');
}

// сохранение данных автора
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup();
}

// слушатели
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
