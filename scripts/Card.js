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
   * @param {Object} [eventListenersRepository] Репозиторий слушателей событий карточки.
   */
  constructor(cardData, cardTemplateSelector, eventListenersRepository) {
    this._name = cardData.name;
    this._imageUrl  = cardData.url;
    this._cardTemplate = document.querySelector(cardTemplateSelector);
    this._eventListenersRepository = eventListenersRepository ? eventListenersRepository : { };
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

    this._setEventHandlers();

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
   * Регистрирует обработчик события по заданному селектору.
   *
   * @private
   * @param {string} selector Селектор элемента источника события/
   * @param {Object} eventListener Слушатель события.
   *
   * @example
   *  this._registerEventListener('.card__image',
   *  {
   *    'click': (evt) => this._foo(evt.target, someParam)
   *  });
   * @
   */
  _registerEventListener(selector, eventListener) {
    const eventListeners = this._eventListenersRepository[selector];

    if (eventListeners) {
      eventListeners.push(eventListener);
    } else {
      this._eventListenersRepository[selector] = [ eventListener ];
    }
  }

  /**
   * Регистрирует обработчики по умолчанию.
   *
   * @private
   */
  _registerDefaultEventListeners() {
    this._registerEventListener('.card__image', { 'load': () => this._cardSpinner.remove() });
    this._registerEventListener('.card__image', { 'error': () => this._renderSpinner(false) });
    this._registerEventListener('.card__like-button', { 'click': (e) => this._onCardLikeButtonClick(e.target) });
    this._registerEventListener('.card__remove-button', { 'click': (e) => this._onCardRemoveButtonClick(e.target) });
  }

  /**
   * Выполняет подписку на зарегистрированные события.
   *
   * @private
   */
  _setEventHandlers() {
    this._registerDefaultEventListeners();

    Object
      .keys(this._eventListenersRepository)
      .forEach(
        (selector) => {
          const element = this._cardElement.querySelector(selector);

          if (element) {
            this._eventListenersRepository[selector].forEach(
              (eventListener) => {
                const event = Object.keys(eventListener)[0];
                const handler = eventListener[event];
                element.addEventListener(event, handler);
              });
          } else {
            console.warn(`Element with selector "${selector}" does not exist.`)
          }
        });
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
