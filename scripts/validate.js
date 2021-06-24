
// Показываю сообщение об ошибке
function showErrorMassage(formElement, inputElement, configForms) {
  const error = formElement.querySelector(`.${inputElement.id}-error`);
  const errorMassage = inputElement.validationMessage;
  error.textContent = errorMassage;
  inputElement.classList.add(configForms.inputErrorClass);
  error.classList.add(configForms.errorClass);
};

// скрываю сообщение об ошибке
function hideErrorMassage(formElement, inputElement, configForms) {
  const error = formElement.querySelector(`.${inputElement.id}-error`);
  error.textContent = "";
  inputElement.classList.remove(configForms.inputErrorClass);
  error.classList.remove(configForms.errorClass);
}

function checkInputValidity(formElement, inputElement, configForms) {
  if (inputElement.validity.valid) {
    hideErrorMassage(formElement, inputElement, configForms);
  } else {
    showErrorMassage(formElement, inputElement, configForms);
  }
}

function checkInputsValid(inputElements) {
  return inputElements.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(formElement, inputElements, configForms) {
  const buttonElement = formElement.querySelector(configForms.submitButtonSelector);
  if (checkInputsValid(inputElements)) {
    buttonElement.classList.add(configForms.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove(configForms.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

function setInputListeners(formElement, configForms) {
  const inputElements = Array.from(formElement.querySelectorAll(configForms.inputSelector));
  toggleButtonState(formElement, inputElements, configForms);
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, configForms);
      toggleButtonState(formElement, inputElements, configForms);
    });
  });

};

function enableValidation (configForms) {
  const formList = Array.from(document.querySelectorAll(configForms.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setInputListeners(formElement, configForms);
  });
}


enableValidation({
  formSelector: '.popup__container', // формы
  inputSelector: '.popup__input', // инпуты
  inputErrorClass: 'popup__input_type_error', // красное подчеркивание ошибки
  submitButtonSelector: '.popup__submit-button', // кнопка submit
  inactiveButtonClass: 'popup__submit-button_disabled', // неактивная кнопка submit
  errorClass: 'popup__error_visible' // вывод ошибки
});

