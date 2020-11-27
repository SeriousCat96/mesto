import { FormPopup } from './FormPopup.js';
import { ImagePreviewPopup } from './ImagePreviewPopup.js';
import { FormValidator } from './FormValidator.js';

export const formSelector = '.form-view__form';
export const inputSelector = '.form-view__input';
export const submitSelector = '.form-view__submit';
export const cardTemplateSelector = '#card-template';
export const cardPreviewImageSelector = '.picture-view__image';
export const cardPreviewCaptionSelector = '.picture-view__caption';
export const popupCloseBtnSelector = '.popup__close-button';

export const inactiveSubmitClass = 'form-view__submit_disabled';
export const inputErrorClass = 'form-view__input_type_error';
export const errorClass = 'error_visible';
export const popupActiveClass = 'popup_active';
export const spinnerClass = 'spinner';
export const spinnerVisibleClass = 'spinner_visible';

export const editProfileBtn = document.querySelector('.profile__button.profile__button_type_edit');
export const profileName = document.querySelector('.profile__title');
export const profileAbout = document.querySelector('.profile__subtitle');

export const editProfilePopup = new FormPopup('.popup#edit-profile');
export const editProfileForm = editProfilePopup.form;
export const nameInputTitle = editProfileForm.elements.name;
export const aboutInputSubtitle = editProfileForm.elements.about;

export const addCardBtn = document.querySelector('.profile__button.profile__button_type_add');

export const addCardPopup = new FormPopup('.popup#add-card');
export const addCardForm = addCardPopup.form;
export const cardInputName = addCardForm.elements.name;
export const cardInputUrl = addCardForm.elements.url;


export const validationConfig = {
  formSelector,
  inputSelector,
  submitSelector,
  inactiveSubmitClass,
  inputErrorClass,
  errorClass
};
export const editProfileFormValidator = new FormValidator(validationConfig, editProfileForm);
export const addCardFormValidator = new FormValidator(validationConfig, addCardForm);

export const cardTemplate = document.querySelector(cardTemplateSelector);
export const cardItems = document.querySelector('.cards-grid__items');

export const cardPreviewPopup = new ImagePreviewPopup('.popup#card-preview');

