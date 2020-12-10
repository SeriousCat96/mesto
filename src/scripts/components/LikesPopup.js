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
} 