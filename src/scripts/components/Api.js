import Spinner from "./Spinner";

const cardsUrl ='/cards/';
const userInfoUrl = '/users/me/';
const avatarUrl = userInfoUrl + 'avatar/';
const likeUrl = '/cards/likes/';

/**
 * Класс для работы с API.
 */
export default class Api {
  constructor({ baseUri, headers }) {
    this._baseUri = baseUri;
    this._headers = headers;
  }
  
  /**
   * Добавить карточку.
   * 
   * @param {Object} cardData Данные карточки.
   * @returns {Promise} Результат запроса.
   */
  addCard(cardData) {
    const headers = { ...this._headers, "Content-Type": "application/json" };
   
    return this
      ._sendJson(cardsUrl, "POST", headers, JSON.stringify(cardData))
      .catch(() => console.error('Failed to add card.'));
  }

  /**
   * 
   * @param {string} cardId Id карточки.
   * @returns {Promise} Результат запроса.
   */
  deleteCard(cardId) {
    return this
      ._sendJson(cardsUrl + cardId, "DELETE", this._headers)
      .catch(() => console.error('Failed to delete card.'));
  }

  /**
   * Получить карточки с сервера.
   * 
   * @param {HTMLElement} контейнер с карточками.
   * @returns {Promise} Результат запроса.
   */
  getInitialCards({ cardsContainer }) {
    const spinner = new Spinner(cardsContainer);

    spinner.render(true);
    return this
      ._sendJson(cardsUrl, "GET", this._headers)
      .catch(() => console.error('Failed to get cards'))
      .finally(() => spinner.remove());
  }

  /**
   * Получить информацию о текущем пользователе.
   * 
   * @returns {Promise} Результат запроса.
   */
  getUserInfo() {
    return this
      ._sendJson(userInfoUrl, "GET", this._headers)
      .catch(() => console.error('Failed to get user info.'));
  }

  /**
   * Обновить аватар.
   * 
   * @param {Object} avatar Данные аватара.
   * @returns {Promise} Результат запроса.
   */
  setAvatar(avatar) {
    const headers = { ...this._headers, "Content-Type": "application/json" };

    return this
      ._sendJson(avatarUrl, "PATCH", headers, JSON.stringify(avatar))
      .catch(() => console.error('Failed to set avatar.'));
  }

  /**
   * Обновить информацию о текущем пользователе.
   * 
   * @returns {Promise} Результат запроса.
   */
  setUserInfo(userInfo) {
    const headers = { ...this._headers, "Content-Type": "application/json" };

    return this
      ._sendJson(userInfoUrl, "PATCH", headers, JSON.stringify(userInfo))
      .catch(() => console.error('Failed to set user info.'));
  }

  /**
   * Поставить лайк карточке
   * 
   * @param {string} cardId Id карточки.
   * @returns {Promise} Результат запроса.
   */
  like(cardId) {
    return this
      ._sendJson(likeUrl + cardId, "PUT", this._headers)
      .catch(() => console.error(`Failed to like card id=${cardId}.`));
  }

  /**
   * Убрать лайк у карточки.
   * 
   * @param {string} cardId Id карточки.
   * @returns {Promise} Результат запроса.
   */
  unlike(cardId) {
    return this
      ._sendJson(likeUrl + cardId, "DELETE", this._headers)
      .catch(() => console.error(`Failed to unlike card id=${cardId}.`));
  }

  _sendJson(url, method, headers, body) {
    const uri = this._baseUri + url;

    return fetch(uri, { method, headers, body })
      .then(
        (response) => {
          console.debug(`${method} ${uri} status: ${response.status}`);

          if(response.ok) {
            return response.json();
          }
          
          return Promise.reject();
        })
      .catch((info) => console.error(`Failed to fetch json data from ${uri}. Info: ${info}`));
  }
}