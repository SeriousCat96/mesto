const editBtn         = document.querySelector('.profile__button.profile__button_type_edit');
const profileTitle    = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popup           = document.querySelector('.popup');
const popupCloseBtn   = popup.querySelector('.popup__close-button');
const editProfileForm = popup.querySelector('.profile-edit');
const inputTitle      = popup.querySelector('.profile-edit__input-text#profile-title');
const inputSubtitle   = popup.querySelector('.profile-edit__input-text#profile-subtitle');

if (editBtn !== null) {
  editBtn.addEventListener('click', onEditButtonClick);
}
if (popupCloseBtn !== null) {
  popupCloseBtn.addEventListener('click', onPopupCloseButtonClick);
}
if (editProfileForm !== null) {
  editProfileForm.addEventListener('submit', onEditProfileFormSubmit);
}

function onEditButtonClick() {
  openPopup();
}

function onPopupCloseButtonClick() {
  closePopup();
}

function onEditProfileFormSubmit(evt) {
  evt.preventDefault();

  if (inputTitle.value !== '') {
    profileTitle.textContent = inputTitle.value;
  }
  if (inputSubtitle.value !== '') {
    profileSubtitle.textContent = inputSubtitle.value;
  }
}

function openPopup() {
  if (popup !== null) {
    popup.classList.add('popup_visible');

    if (inputTitle !== null && profileTitle !== null) {
      inputTitle.value = profileTitle.textContent;
    }
    if (inputSubtitle !== null && profileSubtitle !== null) {
      inputSubtitle.value = profileSubtitle.textContent;
    }
  }
}

function closePopup() {
  if (popup !== null) {
    popup.classList.remove('popup_visible');
  }
}
