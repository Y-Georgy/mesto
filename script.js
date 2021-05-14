let profile = document.querySelector('.profile');

function openPopup () {
  let popup = profile.querySelector('.popup');
  let profileTitle = profile.querySelector('.profile__title');
  let profileSubtitle = profile.querySelector('.profile__sublitle');
  let nameInput = profile.querySelector('.popup__input-name');
  let jobInput = profile.querySelector('.popup__input-job');
  popup.classList.add('popup_opened');
  nameInput.setAttribute('value', profileTitle.textContent);
  jobInput.setAttribute('value', profileSubtitle.textContent);
}

function closePopup () {
  let popup = profile.querySelector('.popup');
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  let nameInput = profile.querySelector('.popup__input-name');
  let jobInput = profile.querySelector('.popup__input-job');
  let profileTitle = profile.querySelector('.profile__title');
  let profileSubtitle = profile.querySelector('.profile__sublitle');
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup ();
}

let editButton = profile.querySelector('.profile__edit-button');
editButton.addEventListener('click', openPopup);

let closeButton = profile.querySelector('.popup__icon-close');
closeButton.addEventListener('click', closePopup);

let formElement = profile.querySelector('.popup__submit-button');
formElement.addEventListener('click', formSubmitHandler);
