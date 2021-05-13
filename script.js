let profile = document.querySelector('.profile');

function openPopup () {
  let popup = profile.querySelector('.popup');
  let popupWindow = popup.querySelector('.popup__window');
  let profileTitle = profile.querySelector('.profile__title');
  let profileSubtitle = profile.querySelector('.profile__sublitle');
  let popupInputTitle = profile.querySelector('.popup__input-title');
  let popupInputSubtitle = profile.querySelector('.popup__input-subtitle');
  popup.classList.remove('popup_disabled');
  popupWindow.classList.remove('popup__window_disabled');
  popupInputTitle.setAttribute('value', profileTitle.textContent);
  popupInputSubtitle.setAttribute('value', profileSubtitle.textContent);
}

function closePopup () {
  let popup = profile.querySelector('.popup');
  let popupWindow = popup.querySelector('.popup__window');
  popup.classList.add('popup_disabled');
  popupWindow.classList.add('popup__window_disabled');
}

function savePopupInfo () {
  let popupInputTitle = profile.querySelector('.popup__input-title');
  let popupInputSubtitle = profile.querySelector('.popup__input-subtitle');
  let profileTitle = profile.querySelector('.profile__title');
  let profileSubtitle = profile.querySelector('.profile__sublitle');
  profileTitle.textContent = popupInputTitle.value;
  profileSubtitle.textContent = popupInputSubtitle.value;
  console.log(popupInputTitle.value);
  console.log(popupInputSubtitle.value);
  closePopup ();
}

let editButton = profile.querySelector('.profile__edit-button');
editButton.addEventListener('click', openPopup);

let closeButton = profile.querySelector('.popup__icon-close');
closeButton.addEventListener('click', closePopup);

let popupButtonSave = profile.querySelector('.popup__button-save');
popupButtonSave.addEventListener('click', savePopupInfo);
