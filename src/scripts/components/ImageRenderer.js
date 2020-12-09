import Spinner from './Spinner.js';

/**
 * Рендерер изображений.
 */
export default class ImageRenderer {
  /**
   * @constructor
   * @this {ImageRenderer}
   * @param {HTMLElement} image DOM-элемент картинки, которую нужно отрисовать.
   * @param {boolean} autoReload флаг автоматической перезагрузки картинки. 
   */
  constructor({ image, autoReload }) {
    this._image = image;
    this._autoReload = autoReload;
    this._spinner = new Spinner(image.parentElement);
    this._getMutationObserver().observe(image, { attributes: true });
  }

  /**
   * Отрисовывает изображение по указанному url
   * @param {*} url 
   */
  render(url) {
    this._image.src = url;
  }

  /**
   * Создаёт @see MutationObserver для отслеживания изменений src картинки.
   *
   * @private
   * @returns {MutationObserver} Созданый @see MutationObserver.
   */
  _getMutationObserver() {
    return new MutationObserver(
      (changes) => {
        changes.filter(
          (change) => {
            return change.attributeName.includes('src');
          })
        .forEach(
          () => {
            this._waitImgLoading()
              .then(() => {
                console.debug(`loaded image url ${this._image.src}`);
                this._spinner.remove();
              })
              .catch(() => {
                console.debug(`failed to load image url ${this._image.src}`);
                this._spinner.render(false);

                if (this._autoReload) {
                  setTimeout(() => this.render(this._image.src), 5000);
                }
              })
          })
      });
  }

  /**
   * Выполняет ожидание загрузки изображения карточки.
   *
   * @private
   * @returns {Promise} Promise ожидания загрузки изображения.
   */
  _waitImgLoading() {
    this._spinner.render(true);

    return new Promise(
      (resolve, reject) => {
        this._image.onload = resolve;
        this._image.onerror = reject;
      });
  }
}