import * as constants from '../utils/constants.js';
import { cards } from '../utils/data.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { FormPopup } from '../components/FormPopup.js';
import { ImagePreviewPopup } from '../components/ImagePreviewPopup.js';
import { FormValidator } from '../components/FormValidator.js';

function setEventListeners() {
  constants.editProfileBtn.addEventListener('click', () => editProfilePopup.open());
  constants.addCardBtn.addEventListener('click', () => addCardPopup.open());

  editProfilePopup.setEventListeners();
  addCardPopup.setEventListeners();
}

function createCard(cardData) {
  return new Card(cardData, constants.cardTemplateSelector, onCardClick);
}

function setCardPreviewData(url, caption) {
  constants.cardPreviewPopup.caption.textContent = caption;
  constants.cardPreviewPopup.image.src = url;
}

function addCardElement(cardData) {
  const card = createCard(cardData);
  cardItems.addItem(card.createElement());
}

function onCardClick(evt) {
  const url = evt.target.src;
  const caption = evt.target
    .closest('.card')
    .querySelector('.card__caption')
    .textContent;

  setCardPreviewData(url, caption);
  constants.cardPreviewPopup.open();
}

function onAddCardFormSubmit({ name, url }) {
  const cardData = {
    "name": name,
    "url": url
  };
  
  addCardElement(cardData);
  addCardPopup.close();
}

function onEditProfileFormReset() {
  this.elements.name.value = constants.profileName.textContent;
  this.elements.about.value = constants.profileAbout.textContent;
}

function onEditProfileFormSubmit({ name, about }) {
  constants.profileName.textContent = name;
  constants.profileAbout.textContent = about;

  editProfilePopup.close();
}

const editProfilePopup = new FormPopup(constants.editProfilePopupSelector,
  {
    'submit' : onEditProfileFormSubmit,
    'reset' : onEditProfileFormReset
  });
const addCardPopup = new FormPopup(constants.addCardPopupSelector,
  {
    'submit' : onAddCardFormSubmit
  });
const cardPreviewPopup = new ImagePreviewPopup(constants.addCardPopupSelector, onCardClick);
const editProfileFormValidator = new FormValidator(constants.validationConfig, editProfilePopup.form);
const addCardFormValidator = new FormValidator(constants.validationConfig, addCardPopup.form);

setEventListeners();

const cardItems = new Section(
  {
    items: cards,
    renderCallback: (cardData) => addCardElement(cardData)
  },
  constants.cardItemsSelector);

cardItems.renderItems();

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

