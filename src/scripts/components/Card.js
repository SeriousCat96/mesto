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

    this._imgChangesObserver = new MutationObserver(
      (changes) => {
        changes.filter(
          (change) => {
            return change.attributeName.includes('src');
          })
        .forEach(
          () => {
            this._renderSpinner(true);
          })
      });
    this._imgChangesObserver.observe(this._cardImage, { attributes: true });

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
    this._cardImage.addEventListener('load', () => this._cardSpinner.remove());
    this._cardImage.addEventListener('error', () => this._renderSpinner(false));
    this._cardImage.addEventListener('click', () => this._onCardClick());
    this._cardLikeBtn.addEventListener('click', (e) => this._onCardLikeButtonClick(e.target));
    this._cardRemoveBtn.addEventListener('click', (e) => this._onCardRemoveButtonClick(e.target));
  }


  _renderSpinner(isRender) {
    this._cardSpinner.render(isRender);
  }

  _onCardLikeButtonClick(target) {
    target.addEventListener('animationend', (e) => e.target.classList.remove('scaling'));
    target.classList.toggle('card__like-button_checked');
    target.classList.add('scaling');
  }

  _onCardRemoveButtonClick(target) {
    target.closest('li').remove();
  }
}
