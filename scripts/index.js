import { defaultCards } from './data.js';
import { Card } from './Card.js';
import {
  editProfileBtn, profileName, profileAbout, editProfilePopup,
  editProfileForm, nameInputTitle, aboutInputSubtitle, addCardBtn,
  addCardPopup, addCardForm, cardInputName, cardInputUrl, validationConfig,
  editProfileFormValidator, addCardFormValidator, cardTemplateSelector, cardItems
} from './constants.js';

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
  defaultCards.forEach(
    cardData => {
      const card = new Card(cardData, cardTemplateSelector);
      addCardItem(card.createElement());
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

  Array
    .from(addCardForm.querySelectorAll(validationConfig.inputSelector))
    .forEach(
      (input) => {
        input.value = ''
      });
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

