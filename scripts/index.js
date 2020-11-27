import * as constants from './constants.js';
import { defaultCards } from './data.js';
import { Card } from './Card.js';

function setEventListeners() {
  constants.editProfileForm.addEventListener('submit', onEditProfileFormSubmit);
  constants.editProfileForm.addEventListener('reset', onEditProfileFormReset);
  constants.editProfileBtn.addEventListener('click', () => constants.editProfilePopup.open());

  constants.addCardForm.addEventListener('submit', onAddCardFormSubmit);
  constants.addCardBtn.addEventListener('click', () => constants.addCardPopup.open());
}

function setDefaults() {
  resetCardItems();
  constants.editProfileForm.reset();
}

function resetCardItems() {
  defaultCards.forEach(
    cardData => {
      const card = createCard(cardData);
      addCardItem(card.createElement());
    });
}

function createCard(cardData) {
  return new Card(cardData, constants.cardTemplateSelector,
    {
      '.card__image' : [
        {
          'click' : () => {
            constants.cardPreviewPopup.image.src = '';
            constants.cardPreviewPopup.caption.textContent = '';

            openCardPopup(cardData);
          }
        }
      ]
    });
}

function addCardItem(cardItem) {
  constants.cardItems.prepend(cardItem);
}

function openCardPopup(cardData) {
  constants.cardPreviewPopup.caption.textContent = cardData.name;
  constants.cardPreviewPopup.image.src = cardData.url;

  constants.cardPreviewPopup.open();
}

function onAddCardFormSubmit(evt) {
  evt.preventDefault();

  const cardData = {
    "name": constants.cardInputName.value,
    "url": constants.cardInputUrl.value
  };
  const card = createCard(cardData);

  addCardItem(card.createElement());
  constants.addCardPopup.close();
}

function onEditProfileFormReset(evt) {
  evt.preventDefault();

  constants.nameInputTitle.value = constants.profileName.textContent;
  constants.aboutInputSubtitle.value = constants.profileAbout.textContent;
}

function onEditProfileFormSubmit(evt) {
  evt.preventDefault();

  constants.profileName.textContent = constants.nameInputTitle.value;
  constants.profileAbout.textContent = constants.aboutInputSubtitle.value;

  constants.editProfilePopup.close();
}

setEventListeners();
setDefaults();

constants.addCardFormValidator.enableValidation();
constants.editProfileFormValidator.enableValidation();

