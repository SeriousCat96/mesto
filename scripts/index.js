const editBtn             = document.querySelector('.profile__button.profile__button_type_edit');
const profileTitle        = document.querySelector('.profile__title');
const profileSubtitle     = document.querySelector('.profile__subtitle');
const popup               = document.querySelector('.popup');
const popupCloseBtn       = popup.querySelector('.popup__close-button');
const editProfileForm     = popup.querySelector('.profile-edit');
const inputTitle          = popup.querySelector('.profile-edit__input-text#profile-title');
const inputSubtitle       = popup.querySelector('.profile-edit__input-text#profile-subtitle');
const cardTemplate        = document.querySelector('#card-template').content;
const cardsContainer      = document.querySelector('.photo-grid__card-list');
const initialCards        = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initCards(initialCards);

editBtn.addEventListener('click', openPopup);
popupCloseBtn.addEventListener('click', closePopup);
editProfileForm.addEventListener('submit', onEditProfileFormSubmit);

function openPopup() {
  popup.classList.add('popup_visible');

  inputTitle.value    = profileTitle.textContent;
  inputSubtitle.value = profileSubtitle.textContent;
}

function closePopup() {
  popup.classList.remove('popup_visible');
}

function initCards(initialCards) {
  initialCards.forEach(card => addCardElement(card));
}

function addCardElement(card) {
  let newCardElement = cardTemplate.cloneNode(true);

  newCardElement.querySelector('.card__caption').textContent = card.name;
  newCardElement.querySelector('.card__image').src           = card.link;

  cardsContainer.append(newCardElement);
}

function removeCardElement(card) {

}

function onEditProfileFormSubmit(evt) {
  evt.preventDefault();

  if (inputTitle.value !== '') {
    profileTitle.textContent = inputTitle.value;
  }
  if (inputSubtitle.value !== '') {
    profileSubtitle.textContent = inputSubtitle.value;
  }

  closePopup();
}
