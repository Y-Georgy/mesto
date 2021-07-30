export default class UserInfo {
  constructor({profileTitleSelector, profileSubtitleSelector, profileAvatarSelector}) {
    this._prifileTitle = document.querySelector(profileTitleSelector);
    this._prifileSubtitle = document.querySelector(profileSubtitleSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);
    this._profileId = '';
  }

  getUserInfo () {
    const userData = {
      name: this._prifileTitle.textContent,
      about: this._prifileSubtitle.textContent
    }
    return userData;
  }

  setUserInfo ({name, about, _id}) {
    this._prifileTitle.textContent = name;
    this._prifileSubtitle.textContent = about;
    this._profileId = _id;
  }

  updateAvatar(avatarLink) {
    this._profileAvatar.src = avatarLink;
  }

  getUserId() {
    return this._profileId;
  }
}
