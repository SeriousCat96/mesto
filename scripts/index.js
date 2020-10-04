const editBtn         = document.querySelector('.profile__button.profile__button_type_edit');
const profileTitle    = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popup           = document.querySelector('.popup');
const popupCloseBtn   = popup.querySelector('.popup__close-button');
const editProfileForm = popup.querySelector('.profile-edit');
const inputTitle      = popup.querySelector('.profile-edit__input-text#profile-title');
const inputSubtitle   = popup.querySelector('.profile-edit__input-text#profile-subtitle');

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
