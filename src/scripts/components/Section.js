/**
 * Отрисовывает элементы на странице.
 */
export default class Section {
  /**
   * Создаёт Section.
   * @param {Array} items Данные, которые нужно добавить на страницу при инициализации контейнера.
   * @param {any} renderCallback Коллбэк, который отрисовывет данные.
   * @param {string} containerSelector Селектор контейнера, в который нужно добавить элементы.
   */
  constructor({ items, renderCallback }, containerSelector ) {
    this._items = items;
    this._renderCallback = renderCallback;
    this._container = document.querySelector(containerSelector);
  }

  clear() {
    this._container.innerHTML = '';
  }

  /**
   * Добавляет элемент на страницу в конец контейнера.
   * 
   * @param {HTMLElement} item Элемент, который нужно добавить.
   */
  appendItem(item) {
    this._container.append(item);
  }

  /**
   * Добавляет элемент на страницу в начало контейнера.
   * 
   * @param {HTMLElement} item Элемент, который нужно добавить.
   */
  prependItem(item) {
    this._container.prepend(item);
  }
  
  /**
   * Отрисовывает элементы.
   */
  renderItems() {
    this.clear();

    this._items.forEach(
      (item) => {
        this._renderCallback(item);
      });
  }
}