import FormPopup from './FormPopup.js';
import { submitProcessRemoveText } from '../utils/constants.js'

/**
 * Класс попапа с формой.
 */
export default class RemoveFormPopup extends FormPopup {
  constructor(popupSelector, eventListeners) {
    super(popupSelector, eventListeners);

    this._submitProcessDefaultText = submitProcessRemoveText;
  }

  open(element) {
    this._element = element;
    super.open();
  }
  
  _getInputValues() {
    return this._element;
  }
}