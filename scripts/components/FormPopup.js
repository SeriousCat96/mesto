import { Popup } from './Popup.js';
import { formSelector } from '../utils/constants.js';

/**
 * Класс попапа с формой.
 */
export class FormPopup extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(formSelector);
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
}
