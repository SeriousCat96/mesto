import Popup from './Popup.js';
import { formSelector, submitSelector, submitProcessDefaultText } from '../utils/constants.js';

/**
 * Класс попапа с формой.
 */
export default class FormPopup extends Popup {
  constructor(popupSelector, eventListeners) {
    super(popupSelector);
    this._form = this._popupElement.querySelector(formSelector);
    this._submitElement = this._form.querySelector(submitSelector);
    this._eventListeners = eventListeners;
    this._submitDefaultText = this._submitElement.textContent;
    this._submitProcessDefaultText = submitProcessDefaultText;
  }

  /**
   * Возвращает форму попапа.
   *
   * @returns форма попапа.
   */
  get form() {
    return this._form;
  }

  /**
   * Закрывает попап.
   * 
   * @override
   */
  close() {
    this._form.reset();

    super.close();
  }

  /**
   * Устанавливает слушатели событий.
   * 
   * @override
   */
  setEventListeners() {
    Object.keys(this._eventListeners).forEach(
      (eventType) => {
        const eventHandler = this._eventListeners[eventType].bind(this._form);

        this._form.addEventListener(eventType,
          (evt) => this._processEventListener(evt, eventHandler,
            () => this._submitElement.textContent = this._submitProcessDefaultText,
            () => this._submitElement.textContent = this._submitDefaultText));
      }
    );

    super.setEventListeners();
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.form-view__input');
    this._formValues = {};
  
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
  
    return this._formValues;
  }

  _processEventListener(evt, eventHandler, processCallback, finishCallback) {
    evt.preventDefault();
    var result = eventHandler(this._getInputValues());

    if (evt.type === 'submit' && result instanceof Promise) {
      processCallback();

      result
        .then(() => finishCallback())
        .then(() => this.close())
        .finally(() => this._form.reset());
    }
  }
}
