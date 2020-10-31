function renderSpinner(spinnerElement, isVisible) {
  if(isVisible) {
    spinnerElement.classList.add('spinner_visible');
  }
  else {
    spinnerElement.classList.remove('spinner_visible');
  }
}

function createSpinnerElement() {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner', 'spinner_visible');

  return spinner;
}
