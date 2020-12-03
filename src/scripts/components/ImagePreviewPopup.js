import { Popup } from './Popup.js';
import { cardPreviewImageSelector, cardPreviewCaptionSelector } from '../utils/constants.js';

/**
 * Класс попапа предпросмотра изображения.
 */
export class ImagePreviewPopup extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image   = this._popupElement.querySelector(cardPreviewImageSelector);
    this._caption = this._popupElement.querySelector(cardPreviewCaptionSelector);
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
    this._image.src = url;
    this._caption.textContent = name;

    super.open();
  }
}
