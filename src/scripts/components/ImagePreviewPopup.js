import { Popup } from './Popup.js';
import { cardPreviewImageSelector, cardPreviewCaptionSelector } from '../utils/constants.js';

/**
 * Класс попапа предпросмотра изображения.
 */
export class ImagePreviewPopup extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._caption = this._popupElement.querySelector(cardPreviewCaptionSelector);
    this._image = this._popupElement.querySelector(cardPreviewImageSelector);
  }

  /**
   * Возвращает DOM-элемент изображения попапа.
   *
   * @returns DOM-элемент изображение попапа.
   */
  get image() {
    return this._image;
  }

  /**
   * Возвращает DOM-элемент заголовка попапа.
   *
   * @returns DOM-элемент заголовка попапа.
   */
  get caption() {
    return this._caption;
  }

  /**
   * Открывает попап.
   * 
   * @override
   */
  open({ url, name }) {
    this._setImageAndCaption(url, name)
      .then(() => {
        console.debug(`loaded image url ${url}`);
        super.open();
      })
      .catch(() => {
        console.debug(`failed to load image url ${url}`)
      });
  }

  /**
   * Устанавливает слушатели событий.
   * 
   * @override
   */
  setEventListeners() {
    this._image.addEventListener('load', () => super.open());

    super.setEventListeners();
  }

  _setImageAndCaption(url, caption) {
    return new Promise((resolve, reject) => {
      this._caption.textContent = caption;
      this._image.src = url;
      this._image.onload = resolve;
      this._image.onerror = reject;
    });
  }
}
