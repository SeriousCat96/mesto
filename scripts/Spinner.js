import { spinnerClass, spinnerVisibleClass } from './constants.js';

/**
 * Класс для виджета "спиннер" (отрисовывается при загрузке элемента).
 */
export class Spinner {
  constructor(ownerElement) {
    this._createElement(ownerElement);
  }

  /**
   * Отрисовывает виджет
   * @param {boolean} isVisible - флаг видимости виджета
   */
  render(isVisible) {
    if (this.spinnerElement) {
      if (isVisible) {
        this.spinnerElement.classList.add(spinnerVisibleClass);
      } else {
        this.spinnerElement.classList.remove(spinnerVisibleClass);
      }
    }
  }

  /**
   * Удаляет DOM-элемент виджета
   */
  remove() {
    this.spinnerElement.remove();
    this.spinnerElement = null;
  }

  _createElement(ownerElement) {
    this.spinnerElement = document.createElement('div');
    this.spinnerElement.classList.add(spinnerClass, spinnerVisibleClass);
    
    ownerElement.appendChild(this.spinnerElement);
  }
}