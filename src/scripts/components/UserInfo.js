import ImageRenderer from './ImageRenderer.js';

/**
 * Описывает информацию о пользователе.
 */
export default class UserInfo {
  constructor({ userNameSelector, aboutSelector, avatarSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._avatarRenderer = new ImageRenderer(
      {
        image: this._avatarElement,
        autoReload: true,
      });
  }

  /**
   * Возвращает информацию о пользователе.
   * 
   * @returns информация о пользователе.
   */
  get info() {
    return {
      _id : this._id,
      name : this._userNameElement.textContent,
      about : this._aboutElement.textContent,
      avatar : this._avatarElement.src
    };
  }

  /**
   * Устанавливает информацию о пользователе.
   * 
   * @param name Имя пользователя.
   * @param about Информация о себе.
   * @param avatar Ссылка на аватар.
   */
  set info({ _id ,name, about, avatar }) {
    this._id = _id;
    this._userNameElement.textContent = name;
    this._aboutElement.textContent = about;
    this._avatarRenderer.render(avatar);
  }
}