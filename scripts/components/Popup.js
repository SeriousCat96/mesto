
import { popupActiveClass, popupCloseBtnSelector } from '../utils/constants.js';

/**
 * Базовый класс всплывающего окна (попап).
 */
export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._onDocumentKeyUp =
      (evt) => {
        evt.preventDefault();

        if (this && evt.key === 'Escape') {
          this.close();
        }
      };
    this._onPopupOverlayMouseDown =
      (evt) => {
        if (this && evt.target === evt.currentTarget) {
          this.close();
        }
      };
  }

  /**
   * Открывает попап.
   */
  open() {
    this._popupElement.classList.add(popupActiveClass);
    this._popupElement.addEventListener('mousedown', this._onPopupOverlayMouseDown);
    document.addEventListener('keyup', this._onDocumentKeyUp);
  }

  /**
   * Закрывает попап.
   */
  close() {
    this._popupElement.classList.remove(popupActiveClass);
    this._popupElement.removeEventListener('mousedown', this._onPopupOverlayMouseDown);
    document.removeEventListener('keyup', this._onDocumentKeyUp);
  }

  /**
   * Устанавливает слушатели событий.
   */
  setEventListeners() {
    this._popupElement
      .querySelector(popupCloseBtnSelector)
      .addEventListener('click', () => this.close());
  }
}
