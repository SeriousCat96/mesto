import { Card } from './Card.js';
import {
  editProfileBtn, profileName, profileAbout, editProfilePopup,
  editProfileForm, nameInputTitle, aboutInputSubtitle, addCardBtn,
  addCardPopup, addCardForm, cardInputName, cardInputUrl,
  editProfileFormValidator, addCardFormValidator, cardTemplateSelector, cardItems
} from './constants.js';
import { defaultCardList } from './data.js';
import { config as validationConfig } from './FormValidator.js';

function setEventListeners() {
  editProfileForm.addEventListener('submit', onEditProfileFormSubmit);
  editProfileForm.addEventListener('reset', onEditProfileFormReset);
  editProfileBtn.addEventListener('click', () => editProfilePopup.open());

  addCardForm.addEventListener('submit', onAddCardFormSubmit);
  addCardForm.addEventListener('reset', onAddCardFormReset);
  addCardBtn.addEventListener('click', () => addCardPopup.open());
}

function setDefaults() {
  resetCardItems();
  editProfileForm.reset();
}

function resetCardItems() {
  defaultCardList.forEach(
    cardData => {
      const card = new Card(cardData, cardTemplateSelector);
      addCardItem(card.createElement());
    });
}

function resetFormInputs(form) {
  Array
    .from(form.querySelectorAll(validationConfig.inputSelector))
    .forEach(
      (input) => {
        input.value = ''
      });
}

function addCardItem(cardItem) {
  cardItems.prepend(cardItem);
}

function onEditProfileFormReset(evt) {
  evt.preventDefault();

  nameInputTitle.value = profileName.textContent;
  aboutInputSubtitle.value = profileAbout.textContent;
}

function onEditProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInputTitle.value;
  profileAbout.textContent = aboutInputSubtitle.value;

  editProfilePopup.close();
}

function onAddCardFormReset(evt) {
  evt.preventDefault();
  resetFormInputs(addCardForm);
}

function onAddCardFormSubmit(evt) {
  evt.preventDefault();

  const cardData = {
    "name": cardInputName.value,
    "url": cardInputUrl.value
  };
  const card = new Card(cardData, cardTemplateSelector);

  addCardItem(card.createElement());
  addCardPopup.close();
}

setEventListeners();
setDefaults();

addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();

