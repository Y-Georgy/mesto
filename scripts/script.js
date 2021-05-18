let profile = document.querySelector('.profile');
let profileTitle = profile.querySelector('.profile__title');
let profileSubtitle = profile.querySelector('.profile__sublitle');
let popup = document.querySelector('.popup');
let nameInput = popup.querySelector('.popup__input-name');
let jobInput = popup.querySelector('.popup__input-job');
let editButton = profile.querySelector('.profile__edit-button');
let closeButton = popup.querySelector('.popup__icon-close');
let formElement = popup.querySelector('.popup__container');

function openPopup () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  popup.classList.add('popup_opened');
}

function closePopup () {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
