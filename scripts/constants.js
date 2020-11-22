import { FormPopup } from './FormPopup.js';
import { FormValidator, config as validationConfig } from './FormValidator.js';


export const popupActiveClass = 'popup_active';
export const popupCloseBtnSelector = '.popup__close-button';
export const formSelector = '.form-view__form';

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

export const editProfileFormValidator = new FormValidator(validationConfig, editProfileForm);
export const addCardFormValidator = new FormValidator(validationConfig, addCardForm);

export const cardTemplateSelector = '#card-template';
export const cardTemplate = document.querySelector(cardTemplateSelector);
export const cardItems = document.querySelector('.cards-grid__items');

export const cardPreviewPopup = document.querySelector('.popup#card-preview');
export const cardPreviewImage = cardPreviewPopup.querySelector('.picture-view__image');
export const cardPreviewCaption = cardPreviewPopup.querySelector('.picture-view__caption');

