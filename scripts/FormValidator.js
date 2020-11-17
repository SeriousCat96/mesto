export const config = {
  formSelector: '.form-view__form',
  inputSelector: '.form-view__input',
  submitSelector: '.form-view__submit',
  inactiveSubmitClass: 'form-view__submit_disabled',
  inputErrorClass: 'form-view__input_type_error',
  errorClass: 'error_visible'
};

export class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputList = Array.from(form.querySelectorAll(config.inputSelector));
    this._submitElement = form.querySelector(config.submitSelector);
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => evt.preventDefault());
    this._form.addEventListener('reset', () => this._resetValidation());
    this._setEventListeners();
  };

  _resetValidation() {
    this._inputList.forEach(
      (inputElement) => {
        this._hideInputError(inputElement);
      });
    this._toggleSubmitState();
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput() {
    return this._inputList.some(
      (inputElement) => {
        return !inputElement.validity.valid;
      });
  }

  _toggleSubmitState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._submitElement.classList.add(this._config.inactiveSubmitClass);
      this._submitElement.disabled = true;
    } else {
      this._submitElement.classList.remove(this._config.inactiveSubmitClass);
      this._submitElement.disabled = false;
    }
  };

  _setEventListeners() {
    this._toggleSubmitState();

    this._inputList.forEach(
      (inputElement) => {
        inputElement.addEventListener('input',
          (e) => {
            this._applyValidation(e.target)
          });
      });
  };

  _applyValidation(inputElement) {
    this._checkInputValidity(inputElement);
    this._toggleSubmitState();
  }
}
