import * as constants from '../utils/constants.js';
import { cards } from '../utils/data.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { FormPopup } from '../components/FormPopup.js';
import { ImagePreviewPopup } from '../components/ImagePreviewPopup.js';
import { FormValidator } from '../components/FormValidator.js';
import { UserInfo } from '../components/UserInfo.js';

function setEventListeners() {
  constants.editProfileBtn.addEventListener('click', () => editProfilePopup.open());
  constants.addCardBtn.addEventListener('click', () => addCardPopup.open());

  editProfilePopup.setEventListeners();
  addCardPopup.setEventListeners();
  cardPreviewPopup.setEventListeners();
}

function createCard(cardData) {
  return new Card(cardData, constants.cardTemplateSelector,
    () => {
      cardPreviewPopup.open(cardData);
    });
}

function addCardElement(cardData) {
  const card = createCard(cardData);
  cardItems.addItem(card.createElement());
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
  const { name, about } = userInformation.info;
  
  this.elements.name.value = name;
  this.elements.about.value = about;
}

function onEditProfileFormSubmit({ name, about }) {
  userInformation.info = { name, about };

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
const cardPreviewPopup = new ImagePreviewPopup(constants.cardPreviewPopupSelector);
const userInformation = new UserInfo(constants);
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
editProfilePopup.form.reset();

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

