export default class UserInfo {
  constructor({profileTitleSelector, profileSubtitleSelector, profileAvatarSelector}) {
    this._prifileTitle = document.querySelector(profileTitleSelector);
    this._prifileSubtitle = document.querySelector(profileSubtitleSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);
  }

  getUserInfo () {
    const userData = {
      name: this._prifileTitle.textContent,
      about: this._prifileSubtitle.textContent
    }
    return userData;
  }

  setUserInfo ({name, about}) {
    this._prifileTitle.textContent = name;
    this._prifileSubtitle.textContent = about;
  }

  updateAvatar(avatarLink) {
    this._profileAvatar.src = avatarLink;
  }

}
