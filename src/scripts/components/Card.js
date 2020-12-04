import { Spinner } from './Spinner.js';

/**
 * Класс карточки.
 */
export class Card {
  /**
   * Создаёт карточку.
   *
   * @constructor
   * @param {Object} cardData Данные карточки.
   * @param {string} cardTemplateSelector Селектор шаблона карточки.
   * @param {any} onCardClick Обработчик события клика по карточке.
   */
  constructor(cardData, cardTemplateSelector, onCardClick) {
    this._name = cardData.name;
    this._imageUrl  = cardData.url;
    this._cardTemplate = document.querySelector(cardTemplateSelector);
    this._onCardClick = onCardClick;
  }

  /**
   * Создание DOM-элемента карточки.
   *
   * @returns {HTMLElement} созданный DOM-элемент карточки.
   */
  createElement() {
    this._cardElement = this._createFromTemplate();
    this._cardSpinner = new Spinner(this._cardElement.querySelector('.card'));
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._cardCaption = this._cardElement.querySelector('.card__caption');
    this._cardRemoveBtn = this._cardElement.querySelector('.card__remove-button');
    this._cardLikeBtn = this._cardElement.querySelector('.card__like-button');

    this._setEventListeners();
    this._getMutationObserver().observe(this._cardImage, { attributes: true });

    this._cardCaption.textContent = this._name;
    this._cardImage.src = this._imageUrl;

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
   * Выполняет подписку на события.
   *
   * @private
   */
  _setEventListeners() {
    this._cardImage.addEventListener('click', this._onCardClick);
    this._cardLikeBtn.addEventListener('click', this._onCardLikeButtonClick.bind(this));
    this._cardRemoveBtn.addEventListener('click', this._onCardRemoveButtonClick.bind(this));
  }

  /**
   * Выполняет отрисовку спиннера загрузки.
   *
   * @param {boolean} isRender флаг отрисовки спиннера.
   * @private
   */
  _renderSpinner(isRender) {
    this._cardSpinner.render(isRender);
  }

  /**
   * Создаёт MutationObserver.
   *
   * @private
   * @returns {MutationObserver} Созданый MutationObserver.
   */
  _getMutationObserver() {
    return new MutationObserver(
      (changes) => {
        changes.filter(
          (change) => {
            return change.attributeName.includes('src');
          })
        .forEach(
          () => {
            this._waitImgLoading()
              .then(() => {
                console.debug(`loaded image url ${this._imageUrl}`);
                this._cardSpinner.remove();
              })
              .catch(() => {
                console.debug(`failed to load image url ${this._imageUrl}`);
                this._renderSpinner(false);
              });
          })
      });
  }

  /**
   * Выполняет ожидание загрузки изображения карточки.
   *
   * @private
   * @returns {Promise} Promise ожидания загрузки изображения.
   */
  _waitImgLoading() {
    this._renderSpinner(true);

    return new Promise(
      (resolve, reject) => {
        this._cardImage.onload = resolve;
        this._cardImage.onerror = reject;
      });
  }

  /**
   * Обработчик события клика по кнопке "лайк".
   *
   * @private
   */
  _onCardLikeButtonClick() {
    this._cardLikeBtn.addEventListener('animationend', (e) => e.target.classList.remove('scaling'));
    this._cardLikeBtn.classList.toggle('card__like-button_checked');
    this._cardLikeBtn.classList.add('scaling');
  }

  /**
   * Обработчик события клика по кнопке "закрыть".
   *
   * @private
   */
  _onCardRemoveButtonClick() {
    this._cardRemoveBtn.closest('li').remove();
  }
}
