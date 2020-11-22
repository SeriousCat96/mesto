import { cardPreviewCaption, cardPreviewImage, cardPreviewPopup, cardTemplate } from './constants.js'
import { Spinner } from './Spinner.js';

export class Card {
    constructor(cardData, cardTemplateSelector) {
      this._name = cardData.name;
      this._imageUrl  = cardData.url;
      this._cardTemplate = document.querySelector(cardTemplateSelector);
    }

    createElement() {
      this._cardElement = this._createFromTemplate(cardTemplate);
      this._cardSpinner = new Spinner(this._cardElement.querySelector('.card'));
      this._setEventListeners(this._cardElement);

      this._imgChangesObserver = new MutationObserver(
        (changes) => {
          changes.filter(
            (change) => {
              return change.attributeName.includes('src');
            })
          .forEach(
            () => {
              this._renderSpinner(true);
            })
        });
      this._imgChangesObserver.observe(this._cardImage, { attributes: true });

      this._cardCaption.textContent = this._name;
      this._cardImage.src = this._imageUrl;

      return this._cardElement;
    }

    _createFromTemplate() {
      return this._cardTemplate.content.cloneNode(true);
    }

    _setEventListeners(cardElement) {
      this._cardImage = cardElement.querySelector('.card__image');
      this._cardCaption = cardElement.querySelector('.card__caption');
      this._cardRemoveBtn = cardElement.querySelector('.card__remove-button');
      this._cardLikeBtn = cardElement.querySelector('.card__like-button');

      this._cardImage.addEventListener('load', () => this._cardSpinner.remove());
      this._cardImage.addEventListener('error', () => this._renderSpinner(false));
      this._cardImage.addEventListener('click', (e) => this._onCardImageClick(e.target));

      this._cardLikeBtn.addEventListener('click', (e) => this._onCardLikeButtonClick(e.target));
      this._cardRemoveBtn.addEventListener('click', (e) => this._onCardRemoveButtonClick(e.target));
    }

    _renderSpinner(isRender) {
      this._cardSpinner.render(isRender);
    }

    _onCardImageClick(cardImage) {
      const currentCard = cardImage.closest('.card');

      if(this._cardElement === currentCard) {
        const currentCardCaption = currentCard.querySelector('.card__caption');

        cardPreviewPopup.open();

        cardPreviewImage.src = cardImage.src;
        cardPreviewCaption.textContent = currentCardCaption.textContent;
      }
    }

    _onCardLikeButtonClick(likeBtn) {
      likeBtn.addEventListener('animationend', (e) => e.target.classList.remove('scaling'));
      likeBtn.classList.toggle('card__like-button_checked');
      likeBtn.classList.add('scaling');
    }

    _onCardRemoveButtonClick(removeButton) {
      removeButton.closest('li').remove();
    }
}
