import './index.css';

import * as constants from '../scripts/utils/constants.js';
import { api } from '../scripts/utils/constants.js';
import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import FormPopup from '../scripts/components/FormPopup.js';
import RemoveFormPopup from '../scripts/components/RemoveFormPopup';
import ImagePreviewPopup from '../scripts/components/ImagePreviewPopup.js';
import FormValidator from '../scripts/components/FormValidator.js';
import UserInfo from '../scripts/components/UserInfo.js';

function fetchCards() {
  const cardsContainer = document.querySelector(constants.cardItemsSelector);

  return api
    .getInitialCards({ cardsContainer })
    .then(
      (cards) => {
        cardItems = new Section(
          {
            items: cards,
            renderCallback: (cardData) => addCardElement(cardData, (item) => cardItems.appendItem(item))
          },
          constants.cardItemsSelector);
        })
    .catch(() => console.error("Failed to fetch cards."));
}

function fetchUserInfo() {
  return api
    .getUserInfo()
    .then((userInfo) => setUserInfo(userInfo))
    .catch(() => console.error("Failed to set user info."));
}

function fetchUserAndCards() {
  Promise
    .all([fetchUserInfo(), fetchCards()])
    .then(() => cardItems.renderItems())
    .catch(() => console.error("Failed to render cards.")); 
}

function setEventListeners() {
  constants.editAvatarBtn.addEventListener('click', () => editAvatarPopup.open());
  constants.editProfileBtn.addEventListener('click', () => editProfilePopup.open());
  constants.addCardBtn.addEventListener('click', () => addCardPopup.open());

  editAvatarPopup.setEventListeners();
  editProfilePopup.setEventListeners();
  addCardPopup.setEventListeners();
  removeCardPopup.setEventListeners();
  cardPreviewPopup.setEventListeners();
}

function createCard(cardData) {
  return new Card(cardData, constants.cardTemplateSelector, userInformation,
    () => cardPreviewPopup.open(cardData),
    (cardElement) => removeCardPopup.open(cardElement));
}

function addCardElement(cardData, addCardFunction) {
  const card = createCard(cardData);
  addCardFunction(card.createElement());
}

function removeCardElement({ id, element }) {
  return api.deleteCard(id)
    .then(() => element.remove())
    .catch(() => console.error("Failed to remove card."));
}

function setUserInfo({ _id, name, about, avatar }) {
  userInformation.info = { _id, name, about, avatar };
  editProfilePopup.form.reset();
}

function onAddCardFormSubmit({ name, link }) {
  return api.addCard({ name, link })
    .then((card) => addCardElement(card, (item) => cardItems.prependItem(item)))
    .catch(() => console.error("Failed to add card."));
}

function onEditAvatarFormSubmit({ avatar }) {
  return api.setAvatar({ avatar })
    .then((info) => setUserInfo(info))
    .catch(() => console.error("Failed to edit avatar."));
}

function onEditProfileFormReset() {
  const { name, about } = userInformation.info;
  
  this.elements.name.value = name;
  this.elements.about.value = about;
}

function onEditProfileFormSubmit({ name, about }) {
  return api.setUserInfo({ name, about })
    .then((info) => setUserInfo(info))
    .catch(() => console.error("Failed to edit user info."));
}

const editProfilePopup = new FormPopup(constants.editProfilePopupSelector,
  {
    'submit' : onEditProfileFormSubmit,
    'reset' : onEditProfileFormReset
  });
const editAvatarPopup = new FormPopup(constants.editAvatarPopupSelector,
  {
    'submit' : onEditAvatarFormSubmit,
  });
const addCardPopup = new FormPopup(constants.addCardPopupSelector,
  {
    'submit' : onAddCardFormSubmit
  });
const removeCardPopup = new RemoveFormPopup(constants.removeCardPopupSelector,
  {
    'submit' : removeCardElement,
  });
const cardPreviewPopup = new ImagePreviewPopup(constants.cardPreviewPopupSelector);
const userInformation = new UserInfo(constants);
const editAvatarFormValidator = new FormValidator(constants.validationConfig, editAvatarPopup.form);
const editProfileFormValidator = new FormValidator(constants.validationConfig, editProfilePopup.form);
const addCardFormValidator = new FormValidator(constants.validationConfig, addCardPopup.form);

let cardItems = [];

fetchUserAndCards();
setEventListeners();

editAvatarFormValidator.enableValidation();
editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

