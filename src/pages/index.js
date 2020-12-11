import './index.css';

import * as constants from '../scripts/utils/constants.js';
import { api } from '../scripts/components/Api.js';
import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import FormPopup from '../scripts/components/FormPopup.js';
import RemoveFormPopup from '../scripts/components/RemoveFormPopup';
import ImagePreviewPopup from '../scripts/components/ImagePreviewPopup.js';
import LikesPopup from '../scripts/components/LikesPopup.js';
import FormValidator from '../scripts/components/FormValidator.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Spinner from '../scripts/components/Spinner';

function fetchCards() {
  const spinner = new Spinner(constants.cardsContainer);

  spinner.render(true);
  return api
    .getCards()
    .then(
      (cards) => {
        cardItems = new Section(
          {
            items: cards,
            renderCallback: (cardData) => handleAddCardElement(cardData, (item) => cardItems.appendItem(item))
          },
          constants.cardItemsSelector);

          console.debug(cards);
        })
    .catch(() => console.error("Failed to fetch cards."))
    .finally(() => spinner.remove());
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

function setUserInfo({ _id, name, about, avatar }) {
  userInformation.info = { _id, name, about, avatar };
  editProfilePopup.form.reset();
}

function createCard(cardData) {
  return new Card(cardData, constants.cardTemplateSelector, userInformation,
    () => cardPreviewPopup.open(cardData),
    (cardElement) => removeCardPopup.open(cardElement),
    handleShowLikes,
    handleHideLikes,
    api.like.bind(api),
    api.unlike.bind(api));
}

function handleAddCardElement(cardData, addCardFunction) {
  const card = createCard(cardData);
  addCardFunction(card.createElement());
}

function handleRemoveCardElement({ id, element }) {
  return api.deleteCard(id)
    .then(() => element.remove())
    .catch(() => console.error("Failed to remove card."));
}

function handleShowLikes(element, likes) {
  if (likesPopup) {
    handleHideLikes();
  }
  if (likes.length > 0) {
    likesPopup = new LikesPopup(element);
    likesPopup.open(likes);
  }
}

function handleHideLikes() {
  if (likesPopup) {
    likesPopup.close();
    likesPopup = null;
  }
}

function handleAddCardFormSubmit({ name, link }) {
  return api.addCard({ name, link })
    .then((card) => handleAddCardElement(card, (item) => cardItems.prependItem(item)))
    .catch(() => console.error("Failed to add card."));
}

function handleEditAvatarFormSubmit({ avatar }) {
  return api.setAvatar({ avatar })
    .then((info) => setUserInfo(info))
    .catch(() => console.error("Failed to edit avatar."));
}

function handleEditProfileFormReset() {
  const { name, about } = userInformation.info;
  
  this.elements.name.value = name;
  this.elements.about.value = about;
}

function handleEditProfileFormSubmit({ name, about }) {
  return api.setUserInfo({ name, about })
    .then((info) => setUserInfo(info))
    .catch(() => console.error("Failed to edit user info."));
}

const editProfilePopup = new FormPopup(constants.editProfilePopupSelector,
  {
    'submit' : handleEditProfileFormSubmit,
    'reset' : handleEditProfileFormReset
  });
const editAvatarPopup = new FormPopup(constants.editAvatarPopupSelector,
  {
    'submit' : handleEditAvatarFormSubmit,
  });
const addCardPopup = new FormPopup(constants.addCardPopupSelector,
  {
    'submit' : handleAddCardFormSubmit
  });
const removeCardPopup = new RemoveFormPopup(constants.removeCardPopupSelector,
  {
    'submit' : handleRemoveCardElement,
  });
const cardPreviewPopup = new ImagePreviewPopup(constants.cardPreviewPopupSelector);
const userInformation = new UserInfo(constants);
const editAvatarFormValidator = new FormValidator(constants.validationConfig, editAvatarPopup.form);
const editProfileFormValidator = new FormValidator(constants.validationConfig, editProfilePopup.form);
const addCardFormValidator = new FormValidator(constants.validationConfig, addCardPopup.form);

let cardItems = [];
let likesPopup = null;

fetchUserAndCards();
setEventListeners();

editAvatarFormValidator.enableValidation();
editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
