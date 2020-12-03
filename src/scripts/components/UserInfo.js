/**
 * Описывает информацию о пользователе.
 */
export class UserInfo {
  constructor({ userNameSelector, aboutSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
  }

  /**
   * Возвращает информацию о пользователе.
   * 
   * @returns информация о пользователе.
   */
  get info() {
    return {
      name : this._userNameElement.textContent,
      about : this._aboutElement.textContent
    };
  }

  /**
   * Устанавливает информацию о пользователе.
   * 
   * @param name Имя пользователя.
   * @param about Информация о себе.
   */
  set info({ name, about }) {
    this._userNameElement.textContent = name;
    this._aboutElement.textContent = about;
  }
}