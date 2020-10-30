const validationConfig = {
  formSelector: '.form-view__form',
  inputSelector: '.form-view__input',
  submitSelector: '.form-view__submit',
  inactiveSubmitClass: 'form-view__submit_disabled',
  inputErrorClass: 'form-view__input_type_error',
  errorClass: 'error_visible'
};

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => evt.preventDefault());
    setEventListeners(formElement, config);
  });
};

function showInputError(formElement, inputElement, errorMessage, { inputErrorClass, errorClass }) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

function hideInputError(formElement, inputElement, { inputErrorClass, errorClass }) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

function checkInputValidity(formElement, inputElement, errorClasses) {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, errorClasses);
  }
  else {
    hideInputError(formElement, inputElement, errorClasses);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some(inputElement => !inputElement.validity.valid);
}

function toggleSubmitState(inputList, submitElement, inactiveSubmitClass) {
  if(hasInvalidInput(inputList)) {
    submitElement.classList.add(inactiveSubmitClass);
    submitElement.disabled = true;
  }
  else {
    submitElement.classList.remove(inactiveSubmitClass);
    submitElement.disabled = false;
  }
};

function setEventListeners(formElement, {inputSelector, submitSelector, inactiveSubmitClass}) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitElement = formElement.querySelector(submitSelector);

  toggleSubmitState(inputList, submitElement, inactiveSubmitClass);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', e => applyValidation(formElement, e.target, inputList, submitElement, validationConfig));
  });
};

function applyValidation(formElement, inputElement, inputList, submitElement, { inactiveSubmitClass, inputErrorClass, errorClass }) {
  checkInputValidity(formElement, inputElement, { inputErrorClass, errorClass });
  toggleSubmitState(inputList, submitElement, inactiveSubmitClass);
}

function resetFormValidation(formElement, { inputSelector, submitSelector, inactiveSubmitClass, inputErrorClass, errorClass }) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitElement = formElement.querySelector(submitSelector);

  toggleSubmitState(inputList, submitElement, inactiveSubmitClass);
  inputList.forEach(inputElement => hideInputError(formElement, inputElement, { inputErrorClass, errorClass }));
}
