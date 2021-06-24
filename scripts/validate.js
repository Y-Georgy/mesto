// const inputErrorClass = 'popup__input_type_error';
// const inputElement = document.forms.formAuthor.elements.authorName;
// const form = document.forms.formAuthor;
// const errorMassage = "Ошибка поля ввода";

function showErrorMassage(form, inputElement, configForms) {
  const error = form.querySelector(`.${inputElement.id}-error`);
  const errorMassage = inputElement.validationMessage;
  error.textContent = errorMassage;
  inputElement.classList.add(configForms.inputErrorClass);
  error.classList.add(configForms.errorClass);
};

function hideErrorMassage(form, inputElement, configForms) {
  const error = form.querySelector(`.${inputElement.id}-error`);
  error.textContent = "";
  inputElement.classList.remove(configForms.inputErrorClass);
  error.classList.remove(configForms.errorClass);
}

function checkInputValidity(form, inputElement, configForms) {
  if (inputElement.validity.valid) {
    hideErrorMassage(form, inputElement, configForms);
  } else {
    showErrorMassage(form, inputElement, configForms);
  }
}

function checkInputsValid(inputElements) {
  return inputElements.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(form, inputElements, configForms) {
  const buttonElement = form.querySelector(configForms.submitButtonSelector);
  console.log(checkInputsValid(inputElements));
  if (checkInputsValid(inputElements)) {
    buttonElement.classList.add(configForms.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove(configForms.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

function setInputListeners(form, configForms) {
  const inputElements = Array.from(form.querySelectorAll(configForms.inputSelector));
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(form, inputElement, configForms);
      toggleButtonState(form, inputElements, configForms);
    });
  });

};

function enableValidation (configForms) {
  // const formList = Array.from(document.querySelectorAll(configForms.formSelector));
  // formList.forEach((formElement) => {
  //   formElement.addEventListener('submit', (evt) => {
  //     evt.preventDefault();
  //   });

  // });
  const form = document.querySelector(configForms.formSelector);
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  setInputListeners(form, configForms);
}

// enableValidation(form, inputElement, inputErrorClass);

enableValidation({
  formSelector: '.popup__container[name="formAuthor"]', // формы

  inputSelector: '.popup__input', // инпуты
  inputErrorClass: 'popup__input_type_error', // красное подчеркивание ошибки

  submitButtonSelector: '.popup__submit-button', // кнопка submit
  inactiveButtonClass: 'popup__submit-button_disabled', // неактивная кнопка submit

  errorClass: 'popup__error_visible' // вывод ошибки
});

