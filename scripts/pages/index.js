import * as constants from '../utils/constants.js';
import { cards } from '../utils/data.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';

function setEventListeners() {
  constants.editProfileForm.addEventListener('submit', onEditProfileFormSubmit);
  constants.editProfileForm.addEventListener('reset', onEditProfileFormReset);
  constants.editProfileBtn.addEventListener('click', () => constants.editProfilePopup.open());

  constants.addCardForm.addEventListener('submit', onAddCardFormSubmit);
  constants.addCardBtn.addEventListener('click', () => constants.addCardPopup.open());
}

// function setDefaults() {
//   constants.editProfileForm.reset();
// }

function createCard(cardData) {
  return new Card(cardData, constants.cardTemplateSelector,
    () => {
      constants.cardPreviewPopup.image.src = '';
      constants.cardPreviewPopup.caption.textContent = '';

      openCardPopup(cardData); 
    });
}

function openCardPopup(cardData) {
  constants.cardPreviewPopup.caption.textContent = cardData.name;
  constants.cardPreviewPopup.image.src = cardData.url;

  constants.cardPreviewPopup.open();
}

function addCardElement(cardData) {
  const card = createCard(cardData);
  cardItems.addItem(card.createElement());
}

function onAddCardFormSubmit(evt) {
  evt.preventDefault();

  const cardData = {
    "name": constants.cardInputName.value,
    "url": constants.cardInputUrl.value
  };
  
  addCardElement(cardData);
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
// setDefaults();

const cardItems = new Section(
  {
    items: cards,
    renderCallback: (cardData) => addCardElement(cardData)
  },
  constants.cardItemsSelector);

cardItems.renderItems();

constants.addCardFormValidator.enableValidation();
constants.editProfileFormValidator.enableValidation();

