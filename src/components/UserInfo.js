export default class UserInfo {
  constructor({profileTitleSelector, profileSubtitleSelector}) {
    this._prifileTitle = document.querySelector(profileTitleSelector);
    this._prifileSubtitle = document.querySelector(profileSubtitleSelector);
  }

  getUserInfo () {
    const userData = {
      name: this._prifileTitle.textContent,
      job: this._prifileSubtitle.textContent
    }
    return userData;
  }

  setUserInfo ({authorName: name, authorJob: job}) {
    this._prifileTitle.textContent = name;
    this._prifileSubtitle.textContent = job;
  }

}