
// Показываю сообщение об ошибке
function showErrorMessage(formElement, inputElement, configForms) {
  const error = formElement.querySelector(`.${inputElement.id}-error`);
  const errorMessage = inputElement.validationMessage;
  error.textContent = errorMessage;
  inputElement.classList.add(configForms.inputErrorClass);
  error.classList.add(configForms.errorClass);
};

// скрываю сообщение об ошибке
function hideErrorMessage(formElement, inputElement, configForms) {
  const error = formElement.querySelector(`.${inputElement.id}-error`);
  error.textContent = "";
  inputElement.classList.remove(configForms.inputErrorClass);
  error.classList.remove(configForms.errorClass);
}

// проверяю валиден ли инпут
function checkInputValidity(formElement, inputElement, configForms) {
  if (inputElement.validity.valid) {
    hideErrorMessage(formElement, inputElement, configForms);
  } else {
    showErrorMessage(formElement, inputElement, configForms);
  }
}

// true если хоть один из инпутов формы невалиден
function checkInputsValid(inputElements) {
  return inputElements.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// делаю кнопку submit активной/неактивной, проверяя валидацию инпутов
function toggleButtonState(formElement, inputElements, configForms) {
  const buttonElement = formElement.querySelector(configForms.submitButtonSelector);
  if (checkInputsValid(inputElements)) {
    activateButtonSubmit(buttonElement, configForms)
  } else {
    inactivateButtonSubmit(buttonElement, configForms)
  }
}

function activateButtonSubmit(buttonElement, configForms) {
  buttonElement.classList.add(configForms.inactiveButtonClass);
  buttonElement.setAttribute('disabled', 'disabled');
}

function inactivateButtonSubmit(buttonElement, configForms) {
  buttonElement.classList.remove(configForms.inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
}

// устанавливаю слушатели всех инпутов и запускаю функции
function setInputListeners(formElement, configForms) {
  const inputElements = Array.from(formElement.querySelectorAll(configForms.inputSelector));
  toggleButtonState(formElement, inputElements, configForms); // до установки слушателей устанавливаю активность/неакт-ть кнопки submit
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, configForms);
      toggleButtonState(formElement, inputElements, configForms);
    });
  });

};

// функция валидации всех форм
function enableValidation (configForms) {
  const formList = Array.from(document.querySelectorAll(configForms.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setInputListeners(formElement, configForms);
  });
}

// запускаю валидацию всех форм, передавая объект с нужными данными
enableValidation({
  formSelector: '.popup__container', // формы
  inputSelector: '.popup__input', // инпуты
  inputErrorClass: 'popup__input_type_error', // красное подчеркивание ошибки
  submitButtonSelector: '.popup__submit-button', // кнопка submit
  inactiveButtonClass: 'popup__submit-button_disabled', // неактивная кнопка submit
  errorClass: 'popup__error_visible' // вывод ошибки
});

