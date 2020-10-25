const editProfileBtn       = document.querySelector('.profile__button.profile__button_type_edit');
const profileTitle         = document.querySelector('.profile__title');
const profileSubtitle      = document.querySelector('.profile__subtitle');

const editProfilePopup     = document.querySelector('.popup#edit-profile');
const editProfileCloseBtn  = editProfilePopup.querySelector('.popup__close-button');
const editProfileForm      = editProfilePopup.querySelector('.form-view');
const profileInputTitle    = editProfilePopup.querySelector('.form-view__input#profile-title');
const profileInputSubtitle = editProfilePopup.querySelector('.form-view__input#profile-subtitle');

const addCardBtn           = document.querySelector('.profile__button.profile__button_type_add');

const addCardPopup         = document.querySelector('.popup#add-card');
const addCardCloseBtn      = addCardPopup.querySelector('.popup__close-button');
const addCardForm          = addCardPopup.querySelector('.form-view');
const cardInputName        = addCardPopup.querySelector('.form-view__input#card-name');
const cardInputUrl         = addCardPopup.querySelector('.form-view__input#card-url');

const cardPreviewPopup     = document.querySelector('.popup#card-preview');
const cardPreviewCloseBtn  = cardPreviewPopup.querySelector('.popup__close-button');
const cardPreviewImage     = cardPreviewPopup.querySelector('.picture-view__image');
const cardPreviewCaption   = cardPreviewPopup.querySelector('.picture-view__caption');

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

editProfileBtn.addEventListener('click', () => {
  openPopup(editProfilePopup);

  profileInputTitle.value    = profileTitle.textContent;
  profileInputSubtitle.value = profileSubtitle.textContent;
});
editProfileCloseBtn.addEventListener('click', () => closePopup(editProfilePopup));
editProfileForm.addEventListener('submit', onEditProfileFormSubmit);

addCardBtn.addEventListener('click', () => openPopup(addCardPopup));
addCardCloseBtn.addEventListener('click', () => closePopup(addCardPopup));
addCardForm.addEventListener('submit', onAddCardFormSubmit);

function openPopup(popupElement) {
  popupElement.classList.add('popup_active');
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_active');
  popupElement.querySelectorAll('.form-view__input').forEach(input => input.value = '');
}

function addCardElement(cardContext) {
  if(cardContext.name !== '' && cardContext.url !== '') {
    const newCardElement   = cardTemplate.cloneNode(true);
    const cardImageElement = newCardElement.querySelector('.card__image');

    cardImageElement.src = cardContext.url;
    cardImageElement.addEventListener('click', e => {
      openPopup(cardPreviewPopup);

      cardPreviewImage.src           = e.target.src;
      cardPreviewCaption.textContent = e.target.closest('.card').querySelector('.card__caption').textContent;
      cardPreviewCloseBtn.addEventListener('click', () => closePopup(cardPreviewPopup));
    });
    newCardElement.querySelector('.card__caption').textContent = cardContext.name;
    newCardElement.querySelector('.card__remove-button').addEventListener('click', e =>
      e.target.closest('li').remove())
    newCardElement.querySelector('.card__like-button').addEventListener('click', e => {
      e.target.addEventListener('animationend', e => e.target.classList.remove('scaling'));
      e.target.classList.toggle('card__like-button_checked');
      e.target.classList.add('scaling');
    });

    cardsContainer.append(newCardElement);
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

function onAddCardFormSubmit(evt) {
  evt.preventDefault();

  addCardElement({
    "name" : cardInputName.value,
    "url"  : cardInputUrl.value
  });
  closePopup(addCardPopup);
}
