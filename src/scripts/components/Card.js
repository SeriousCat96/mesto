import ImageRenderer from './ImageRenderer.js';
import UserInfo from './UserInfo.js';
import { api } from '../utils/constants.js';

/**
 * Класс карточки.
 */
export default class Card {
  /**
   * @constructor
   * Создаёт карточку.
   *
   * @param {string} _id Id карточки.
   * @param {string} name Название карточки.
   * @param {string} link ссылка на изображение карточки.
   * @param {Array} likes "лайки" карточки.
   * @param {Object} owner создатель карточки.
   * @param {string} createdAt дата и время создания карточки.
   * @param {Object} cardData Данные карточки.
   * @param {string} cardTemplateSelector Селектор шаблона карточки.
   * @param {UserInfo} currentUser Информация о текущем пользователе.
   * @param {any} onCardClick Обработчик события клика по карточке.
   * @param {any} onCardRemoveButtonClick Обработчик события нажатия кнопки удаления карточки.
   */
  constructor({ _id, name, link, likes, owner, createdAt }, cardTemplateSelector, currentUser, onCardClick, onCardRemoveButtonClick) {
    this._id = _id;
    this._name = name;
    this._imageUrl = link;
    this._likes = likes ?? [];
    this._owner = owner;
    this._createdAt = createdAt;
    this._cardTemplate = document.querySelector(cardTemplateSelector);
    this._currentUser = currentUser;
    this._onCardClick = onCardClick;
    this._onCardRemoveButtonClick = onCardRemoveButtonClick;
  }

  /**
   * Создание DOM-элемента карточки.
   *
   * @returns {HTMLElement} созданный DOM-элемент карточки.
   */
  createElement() {
    this._cardElement = this._createFromTemplate();
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._cardCaption = this._cardElement.querySelector('.card__caption');
    this._cardRemoveBtn = this._cardElement.querySelector('.card__remove-button');
    this._cardLikeBtn = this._cardElement.querySelector('.card__like-button');
    this._cardLikeCount = this._cardElement.querySelector('.card__like-count');
    this._cardImageRenderer = new ImageRenderer(
      {
        image: this._cardImage,
        autoReload: true
      });
    this._userLiked = this._checkLike();
    
    this._renderLike();
    this._setEventListeners();

    this._cardCaption.textContent = this._name;
    this._cardImageRenderer.render(this._imageUrl);

    return this._cardElement;
  }

  /**
   * Создаёт элемент карточки из шаблона.
   *
   * @private
   * @returns {HTMLElement} созданный из шаблона DOM-элемент карточки.
   */
  _createFromTemplate() {
    return this._cardTemplate
      .content
      .cloneNode(true);
  }

  /**
   * Проверяет принадлежит ли карточка текущему пользователю.
   * @private
   * @returns {boolean} true, если карточка принадлежит текущему пользователю, иначе – false.
   */
  _checkCardOwner() {
    return this._owner._id === this._currentUser.info._id;
  }
  
  /**
   * Проверяет наличие лайка текущего пользователя у текущей карточки.
   * @private
   * @returns {boolean} true, если стоит лайк от текущего пользователя, иначе – false.
   */
  _checkLike() {
    return this._likes.some((like) => like._id === this._currentUser.info._id);
  }

  /**
   * Отрисовать лайк.
   * 
   * @private
   */
  _renderLike() {
    this._cardLikeBtn.onanimationend = (e) => e.target.classList.remove('scaling');
    this._cardLikeBtn.classList.add('scaling');
    
    if (this._userLiked) {
      this._cardLikeBtn.classList.add('card__like-button_checked');
    } else {
      this._cardLikeBtn.classList.remove('card__like-button_checked');
    }

    this._cardLikeCount.textContent = this._likes.length;
  }

  /**
   * Устанавливает лайки для карточки.
   * 
   * @private
   * @param {Array} likes Обновлённый массив лайков.
   */
  _setLikes(likes) {
    this._likes = likes;
    this._userLiked = !this._userLiked;
    this._renderLike();
  }

  /**
   * Выполняет подписку на события.
   *
   * @private
   */
  _setEventListeners() {
    this._cardImage.addEventListener('click', this._onCardClick);
    this._cardLikeBtn.addEventListener('click', this._onCardLikeButtonClick.bind(this));

    if (this._checkCardOwner()) {
      this._cardRemoveBtn.addEventListener('click', () => this._onCardRemoveButtonClick(
        {
          id: this._id,
          element: this._cardRemoveBtn.closest('li')
        }));
    } else {
      this._cardRemoveBtn.remove();
    }
  }

  /**
   * Обработчик события клика по кнопке "лайк".
   *
   * @private
   */
  _onCardLikeButtonClick() {
    if (this._userLiked) {
      api.unlike(this._id)
        .then(({ likes }) => this._setLikes(likes));
    } else {
      api.like(this._id)
        .then(({ likes }) => this._setLikes(likes));
    }
  }
}
