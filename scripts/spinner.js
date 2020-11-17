const config = {
  spinnerClass : 'spinner',
  spinnerVisibleClass : 'spinner_visible'
};

export class Spinner {
  constructor(ownerElement) {
    this._config = config;
    this._createElement(ownerElement);
  }

  render(isVisible) {
    if (this.spinnerElement) {
      if (isVisible) {
        this.spinnerElement.classList.add(this._config.spinnerVisibleClass);
      } else {
        this.spinnerElement.classList.remove(this._config.spinnerVisibleClass);
      }
    }
  }

  remove() {
    this.spinnerElement.remove();
    this.spinnerElement = null;
  }

  _createElement(ownerElement) {
    this.spinnerElement = document.createElement('div');
    this.spinnerElement.classList.add(this._config.spinnerClass, this._config.spinnerVisibleClass);

    ownerElement.appendChild(this.spinnerElement);
  }
}
