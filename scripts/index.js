const editProfileBtn = document.querySelector('.profile__button.profile__button_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const editProfilePopup = document.querySelector('.popup#edit-profile');
const editProfileCloseBtn = editProfilePopup.querySelector('.popup__close-button');
const editProfileForm = editProfilePopup.querySelector('.form-view__form');
const profileInputTitle = editProfilePopup.querySelector('.form-view__input#profile-title');
const profileInputSubtitle = editProfilePopup.querySelector('.form-view__input#profile-subtitle');

const addCardBtn = document.querySelector('.profile__button.profile__button_type_add');

const addCardPopup = document.querySelector('.popup#add-card');
const addCardCloseBtn = addCardPopup.querySelector('.popup__close-button');
const addCardForm = addCardPopup.querySelector('.form-view__form');
const cardInputName = addCardPopup.querySelector('.form-view__input#card-name');
const cardInputUrl = addCardPopup.querySelector('.form-view__input#card-url');

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
}

function closePopup(popup) {
  popup.classList.remove('popup_active');
}

function createFromTemplate(template) {
  return template.content.cloneNode(true);
}

function createCardItem(cardData) {
  if(cardData.name !== '' && cardData.url !== '') {
    const newCardItem = createFromTemplate(cardTemplate);

    const cardImage = newCardItem.querySelector('.card__image');
    const cardCaption = newCardItem.querySelector('.card__caption');
    const cardRemoveBtn = newCardItem.querySelector('.card__remove-button');
    const cardLikeBtn = newCardItem.querySelector('.card__like-button');

    cardCaption.textContent = cardData.name;
    cardImage.src = cardData.url;

    cardImage.addEventListener('click', e => {
      openPopup(cardPreviewPopup);

      cardPreviewImage.src = e.target.src;
      cardPreviewCaption.textContent = e.target.closest('.card').querySelector('.card__caption').textContent;
    });
    cardRemoveBtn.addEventListener('click', e => e.target.closest('li').remove());
    cardLikeBtn.addEventListener('click', e => {
      e.target.addEventListener('animationend', e => e.target.classList.remove('scaling'));
      e.target.classList.toggle('card__like-button_checked');
      e.target.classList.add('scaling');
    });

    return newCardItem;
  }

  return null;
}

function addCardItem(cardItem) {
  if(cardItem !== null) {
    cardItems.append(cardItem);
  }
}

function onEditProfileFormSubmit(evt) {
  evt.preventDefault();

  if(profileInputTitle.value !== '') {
    profileTitle.textContent = profileInputTitle.value;
  }
  if(profileInputSubtitle.value !== '') {
    profileSubtitle.textContent = profileInputSubtitle.value;
  }

  closePopup(editProfilePopup);
}

function onEditProfileFormReset(evt) {
  evt.preventDefault();

  profileInputTitle.value = profileTitle.textContent;
  profileInputSubtitle.value = profileSubtitle.textContent;
}

function onAddCardFormSubmit(evt) {
  evt.preventDefault();

  addCardItem(createCardItem({
    "name": cardInputName.value,
    "url": cardInputUrl.value
  }));

  addCardForm.reset();
  closePopup(addCardPopup);
}

function onAddCardCloseButtonClick() {
  addCardForm.reset();
  closePopup(addCardPopup);
}

editProfileForm.addEventListener('submit', onEditProfileFormSubmit);
editProfileForm.addEventListener('reset', onEditProfileFormReset);
editProfileCloseBtn.addEventListener('click', () => closePopup(editProfilePopup));
editProfileBtn.addEventListener('click', () => openPopup(editProfilePopup));

addCardForm.addEventListener('submit', onAddCardFormSubmit);
addCardCloseBtn.addEventListener('click', onAddCardCloseButtonClick);
addCardBtn.addEventListener('click', () => openPopup(addCardPopup));

cardPreviewCloseBtn.addEventListener('click', () => closePopup(cardPreviewPopup));

setDefaults();
