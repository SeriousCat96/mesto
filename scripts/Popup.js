const popupActiveClass = 'popup_active';
const popupActiveSelector = '.' + popupActiveClass;
const popupCloseBtnSelector = '.popup__close-button';

export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popup
      .querySelector(popupCloseBtnSelector)
      .addEventListener('click', () => this.close());

    this._onDocumentKeyUp = (evt) => {
      evt.preventDefault();

      if (this && evt.key === 'Escape') {
        this.close();
      }

      console.log('closed');
    };
    this._onPopupOverlayMouseDown = (evt) => {
      if (this && evt.target === evt.currentTarget) {
        this.close();
      }

      console.log('closed');
    };
  }

  open() {
    this._popup.classList.add(popupActiveClass);
    this._setEventListeners();
  }

  close() {
    this._popup.classList.remove(popupActiveClass);
    this._removeEventListeners();
  }

  _setEventListeners () {
    this._popup.addEventListener('mousedown', this._onPopupOverlayMouseDown);
    document.addEventListener('keyup', this._onDocumentKeyUp);
  }

  _removeEventListeners () {
    this._popup.removeEventListener('mousedown', this._onPopupOverlayMouseDown);
    document.removeEventListener('keyup', this._onDocumentKeyUp);
  }
}
