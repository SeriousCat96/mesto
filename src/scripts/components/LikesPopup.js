import Popup from './Popup.js';
import Section from './Section.js';
import { likePopupSelector, likeItemsSelector, likeTemplateSelector, likesTemplateSelector } from '../utils/constants.js';

export default class LikesPopup extends Popup {
  constructor(likeElement) {
    super(likePopupSelector);

    this._likeElement = likeElement;
    this._popupTemplate = document.querySelector(likesTemplateSelector);
    this._likeTemplate = document.querySelector(likeTemplateSelector);
  }

  open(likes) {
    const popupTemplate = this._createPopupFromTemplate();
    this._likeElement.appendChild(popupTemplate);
    
    this._items = new Section(
      {
        items: likes,
        renderCallback: (likeData) => this._addLikeItem(this._createLike(likeData))
      },
      likeItemsSelector);
      
    this._popupElement = document.querySelector(likePopupSelector);
    this._items.renderItems();
    this._checkCoordinates();
  }

  close() {
    this._popupElement.remove();
  }

  _addLikeItem(item) {
    this._items.appendItem(item);
  }

  _createLike(likeData) {
    const like = this._createLikeFromTemplate();
    
    like.querySelector('.like__photo').src = likeData.avatar;
    like.querySelector('.like__name-tooltip').textContent = likeData.name;

    return like;
  }

  _createLikeFromTemplate() {
    return this._likeTemplate
      .content
      .cloneNode(true);
  }

  _createPopupFromTemplate() {
    return this._popupTemplate
      .content
      .cloneNode(true);
  }

  _checkCoordinates() {
    const popupBounds = this._popupElement.getBoundingClientRect();
    const tooltips = this._likeElement.querySelectorAll('.like__name-tooltip');

    if (popupBounds.bottom > window.innerHeight) {
      this._popupElement.classList.add('likes-view_pos_top');
    } else {
      this._popupElement.classList.remove('likes-view_pos_top');
    }

    tooltips.forEach((tooltip) => {
      const tooltipBounds = tooltip.getBoundingClientRect();

      if (tooltipBounds.right > window.outerWidth) {
        tooltip.style.left = 0;
        tooltip.style.right = '-100%';
      }
    })
  }
} 