let profile = document.querySelector('.profile');

function openPopup () {
  let popup = profile.querySelector('.popup');
  let popupWindow = popup.querySelector('.popup__window');
  let profileTitle = profile.querySelector('.profile__title');
  let profileSubtitle = profile.querySelector('.profile__sublitle');
  let popupTitle = profile.querySelector('.popup__title');
  let popupSubtitle = profile.querySelector('.popup__subtitle');
  popup.classList.remove('popup_disabled');
  popupWindow.classList.remove('popup__window_disabled');
  popupTitle.textContent = profileTitle.textContent;
  popupSubtitle.textContent = profileSubtitle.textContent;
}

function closePopup () {
  let popup = profile.querySelector('.popup');
  let popupWindow = popup.querySelector('.popup__window');
  //if (popup.classList.contains('popup_disabled') === false) {
    popup.classList.add('popup_disabled');
    popupWindow.classList.add('popup__window_disabled');
  //}
}

function savePopupInfo () {
  let popupTitle = profile.querySelector('.popup__title');
  let popupSubtitle = profile.querySelector('.popup__subtitle');
  let profileTitle = profile.querySelector('.profile__title');
  let profileSubtitle = profile.querySelector('.profile__sublitle');
  profileTitle.textContent = popupTitle.textContent;
  profileSubtitle.textContent = popupSubtitle.textContent;
  closePopup ();
}

let editButton = profile.querySelector('.profile__edit-button');
editButton.addEventListener('click', openPopup);

let closeButton = profile.querySelector('.popup__icon-close');
closeButton.addEventListener('click', closePopup);

let popupButtonSave = profile.querySelector('.popup__button-save');
popupButtonSave.addEventListener('click', savePopupInfo);
