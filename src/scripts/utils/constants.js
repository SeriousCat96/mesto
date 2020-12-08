export const editProfilePopupSelector = '.popup#edit-profile';
export const addCardPopupSelector = '.popup#add-card';
export const removeCardPopupSelector = '.popup#remove-card';
export const cardPreviewPopupSelector = '.popup#card-preview';
export const formSelector = '.form-view__form';
export const inputSelector = '.form-view__input';
export const submitSelector = '.form-view__submit';
export const cardTemplateSelector = '#card-template';
export const cardPreviewImageSelector = '.picture-view__image';
export const cardPreviewCaptionSelector = '.picture-view__caption';
export const popupCloseBtnSelector = '.popup__close-button';
export const cardItemsSelector = '.cards-grid__items';
export const userNameSelector = '.profile__title';
export const aboutSelector = '.profile__subtitle';


export const inactiveSubmitClass = 'form-view__submit_disabled';
export const inputErrorClass = 'form-view__input_type_error';
export const errorClass = 'error_visible';
export const popupActiveClass = 'popup_active';
export const spinnerClass = 'spinner';
export const spinnerVisibleClass = 'spinner_visible';

export const editProfileBtn = document.querySelector('.profile__button.profile__button_type_edit');
export const addCardBtn = document.querySelector('.profile__button.profile__button_type_add');

export const validationConfig = {
  formSelector,
  inputSelector,
  submitSelector,
  inactiveSubmitClass,
  inputErrorClass,
  errorClass
};

export const cardTemplate = document.querySelector(cardTemplateSelector);
