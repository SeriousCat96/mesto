import { Popup } from './Popup.js';

const formSelector = '.form-view__form';

export class FormPopup extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(formSelector);
  }

  get form() {
    return this._form;
  }

  close() {
    this._form.reset();
    super.close();
  }
}
