const editProfileBtn       = document.querySelector('.profile__button.profile__button_type_edit');
const profileTitle         = document.querySelector('.profile__title');
const profileSubtitle      = document.querySelector('.profile__subtitle');

const editProfilePopup     = document.querySelector('.popup#edit-profile');
const editProfileCloseBtn  = editProfilePopup.querySelector('.popup__close-button');
const editProfileForm      = editProfilePopup.querySelector('.edit-form');
const profileInputTitle    = editProfilePopup.querySelector('.edit-form__input#profile-title');
const profileInputSubtitle = editProfilePopup.querySelector('.edit-form__input#profile-subtitle');

const addCardBtn           = document.querySelector('.profile__button.profile__button_type_add');

const addCardPopup         = document.querySelector('.popup#add-card');
const addCardCloseBtn      = addCardPopup.querySelector('.popup__close-button');
const addCardForm          = addCardPopup.querySelector('.edit-form');
const cardInputName        = addCardPopup.querySelector('.edit-form__input#card-name');
const cardInputUrl         = addCardPopup.querySelector('.edit-form__input#card-url');

const cardTemplate         = document.querySelector('#card-template').content;
const cardsContainer       = document.querySelector('.photo-grid__card-list');
const initialCards         = [
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

initialCards.forEach(context => addCardElement(context));

editProfileBtn.addEventListener('click', onEditProfileButtonClick);
editProfileCloseBtn.addEventListener('click', onEditProfileCloseButtonClick);
editProfileForm.addEventListener('submit', onEditProfileFormSubmit);

addCardBtn.addEventListener('click', onAddCardButtonClick);
addCardCloseBtn.addEventListener('click', onAddCardCloseButtonClick);
addCardForm.addEventListener('submit', onAddCardFormSubmit);

function openPopup(popupElement) {
  popupElement.classList.add('popup_active');
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_active');
  popupElement.querySelectorAll('.edit-form__input').forEach(input => input.value = '');
}

function addCardElement(cardContext) {
  if(cardContext.name !== '' && cardContext.url !== '') {
    let newCardElement = cardTemplate.cloneNode(true);

    newCardElement.querySelector('.card__caption').textContent = cardContext.name;
    newCardElement.querySelector('.card__image').src           = cardContext.url;
    newCardElement.querySelector('.card__remove-button').addEventListener('click', e =>
      removeCardElement(e.target.closest('li')));
    newCardElement.querySelector('.card__like-button').addEventListener('click', e => {
      e.target.classList.toggle('card__like-button_checked');
      e.target.classList.toggle('scaling');
    });

    cardsContainer.append(newCardElement);
  }
}

function removeCardElement(cardElement) {
  cardElement.remove();
}

function onEditProfileButtonClick() {
  openPopup(editProfilePopup);

  profileInputTitle.value    = profileTitle.textContent;
  profileInputSubtitle.value = profileSubtitle.textContent;
}

function onEditProfileCloseButtonClick() {
  closePopup(editProfilePopup);
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

function onAddCardButtonClick() {
  openPopup(addCardPopup);
}

function onAddCardCloseButtonClick() {
  closePopup(addCardPopup);
}

function onAddCardFormSubmit(evt) {
  evt.preventDefault();

  addCardElement({
    "name" : cardInputName.value,
    "url"  : cardInputUrl.value
  });
  closePopup(addCardPopup);
}
