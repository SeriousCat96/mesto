import { Popup } from './Popup.js';
import { formSelector } from '../utils/constants.js';

/**
 * Класс попапа с формой.
 */
export class FormPopup extends Popup {
  constructor(popupSelector, eventListeners) {
    super(popupSelector);
    this._form = this._popupElement.querySelector(formSelector);
    this._eventListeners = eventListeners;
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
   * Устанавливает слушатели событий.
   * 
   * @override
   */
  setEventListeners() {
    Object.keys(this._eventListeners).forEach(
      (eventType) => {
        const handleEvent = this._eventListeners[eventType].bind(this._form);
        this._form.addEventListener(eventType,
           (evt) => {
             evt.preventDefault();
             handleEvent(this._getInputValues());
             this._form.reset();
           });
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
}
