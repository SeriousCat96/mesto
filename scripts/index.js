const editProfileBtn = document.querySelector('.profile__button.profile__button_type_edit');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');

const editProfilePopup = document.querySelector('.popup#edit-profile');
const editProfileCloseBtn = editProfilePopup.querySelector('.popup__close-button');
const editProfileForm = document.forms.profile;
const nameInputTitle = editProfileForm.elements.name;
const aboutInputSubtitle = editProfileForm.elements.about;

const addCardBtn = document.querySelector('.profile__button.profile__button_type_add');

const addCardPopup = document.querySelector('.popup#add-card');
const addCardCloseBtn = addCardPopup.querySelector('.popup__close-button');
const addCardForm = document.forms.card;
const cardInputName = addCardForm.elements.name;
const cardInputUrl = addCardForm.elements.url;

const cardPreviewPopup = document.querySelector('.popup#card-preview');
const cardPreviewCloseBtn = cardPreviewPopup.querySelector('.popup__close-button');
const cardPreviewImage = cardPreviewPopup.querySelector('.picture-view__image');
const cardPreviewCaption = cardPreviewPopup.querySelector('.picture-view__caption');

const cardTemplate = document.querySelector('#card-template');
const cardItems = document.querySelector('.cards-grid__items');

function setDefaults() {
  resetCardItems();
  editProfileForm.reset();
}

function resetCardItems() {
  const defaultCardList = [
    {
      name: 'Архыз',
      url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  defaultCardList.forEach(cardData => addCardItem(createCardItem(cardData)));
}

function openPopup(popup) {
  popup.classList.add('popup_active');
  document.addEventListener('keyup', onPopupKeyUp)
}

function closePopup(popup) {
  popup.classList.remove('popup_active');
  document.removeEventListener('keyup', onPopupKeyUp);
}

function closePopupForm(popupForm) {
  popupForm.reset();
  resetFormValidation(popupForm, validationConfig);
  closePopup(popupForm.closest('.popup'));
}

function createFromTemplate(template) {
  return template.content.cloneNode(true);
}

function createCardItem(cardData) {
  const newCardItem = createFromTemplate(cardTemplate);

  const cardImage = newCardItem.querySelector('.card__image');
  const cardCaption = newCardItem.querySelector('.card__caption');
  const cardRemoveBtn = newCardItem.querySelector('.card__remove-button');
  const cardLikeBtn = newCardItem.querySelector('.card__like-button');

  cardCaption.textContent = cardData.name;
  cardImage.src = cardData.url;

  cardImage.addEventListener('click', e => {
    openPopup(cardPreviewPopup);

    const currentCard = e.target.closest('.card');
    const currentCardCaption = currentCard.querySelector('.card__caption');

    cardPreviewImage.src = e.target.src;
    cardPreviewCaption.textContent = currentCardCaption.textContent;
  });
  cardRemoveBtn.addEventListener('click', e => e.target.closest('li').remove());
  cardLikeBtn.addEventListener('click', e => {
    e.target.addEventListener('animationend', e => e.target.classList.remove('scaling'));
    e.target.classList.toggle('card__like-button_checked');
    e.target.classList.add('scaling');
  });

  return newCardItem;
}

function addCardItem(cardItem) {
  cardItems.append(cardItem);
}

function onEditProfileFormReset(evt) {
  evt.preventDefault();

  nameInputTitle.value = profileName.textContent;
  aboutInputSubtitle.value = profileAbout.textContent;
}

function onEditProfileFormSubmit() {
  profileName.textContent = nameInputTitle.value;
  profileAbout.textContent = aboutInputSubtitle.value;

  closePopup(editProfilePopup);
}

function onAddCardFormSubmit() {
  addCardItem(createCardItem({
    "name": cardInputName.value,
    "url": cardInputUrl.value
  }));

  closePopupForm(addCardForm);
}

function onPopupKeyUp(evt) {
  evt.preventDefault();

  const activePopup = document.querySelector('.popup_active');
  const activeForm  = activePopup.querySelector('.form-view__form');

  if(evt.key === 'Escape') {
    if(activeForm !== null) {
      closePopupForm(activeForm);
      return;
    }

    closePopup(activePopup);
  };
}

editProfileForm.addEventListener('submit', onEditProfileFormSubmit);
editProfileForm.addEventListener('reset', onEditProfileFormReset);
editProfileBtn.addEventListener('click', () => openPopup(editProfilePopup));
editProfileCloseBtn.addEventListener('click', () => closePopupForm(editProfileForm));

addCardForm.addEventListener('submit', onAddCardFormSubmit);
addCardBtn.addEventListener('click', () => openPopup(addCardPopup));
addCardCloseBtn.addEventListener('click', () => closePopupForm(addCardForm));

cardPreviewCloseBtn.addEventListener('click', () => closePopup(cardPreviewPopup));

setDefaults();
enableValidation(validationConfig);
