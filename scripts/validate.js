const inputErrorClass = 'popup__input_type_error';
const inputElement = document.forms.formAuthor.elements.authorName;
const form = document.forms.formAuthor;
const errorMassage = "Ошибка поля ввода";

function showErrorMassage(form, inputElement, inputErrorClass) {
  const error = form.querySelector(`.${inputElement.id}-error`);
  const errorMassage = inputElement.validationMessage;
  error.textContent = errorMassage;
  inputElement.classList.add(inputErrorClass);
  error.classList.add('popup__error_visible');
};

function hideErrorMassage(form, inputElement, inputErrorClass) {
  const error = form.querySelector(`.${inputElement.id}-error`);
  error.textContent = "";
  inputElement.classList.remove(inputErrorClass);
  error.classList.remove('popup__error_visible');
}

function checkInputValidity(inputElement) {
  if (inputElement.validity.valid) {
    hideErrorMassage(form, inputElement, inputErrorClass);
  } else {
    showErrorMassage(form, inputElement, inputErrorClass);
  }
}

function toggleButtonState(inputElement, buttonElement) {
  if (inputElement.validity.valid) {
    buttonElement.classList.remove('popup__submit-button_disabled');
    buttonElement.removeAttribute('disabled');
  } else {
    buttonElement.classList.add('popup__submit-button_disabled');
    buttonElement.setAttribute('disabled', 'disabled');
  }
}

function setInputListeners(form, inputElement, inputErrorClass) {
  const buttonElement = form.querySelector('.popup__submit-button');
  inputElement.addEventListener('input', () => {
    checkInputValidity(inputElement);
    toggleButtonState(inputElement, buttonElement);
  });
};

function enableValidation (form, inputElement, inputErrorClass) {
  // const formList = Array.from(document.querySelectorAll(configForms.formSelector));
  // formList.forEach((formElement) => {
  //   formElement.addEventListener('submit', (evt) => {
  //     evt.preventDefault();
  //   });

  // });
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  setInputListeners(form, inputElement, inputErrorClass);
}

enableValidation(form, inputElement, inputErrorClass);

// enableValidation({
//   formSelector: '.popup__container', // формы

//   inputSelector: '.popup__input', // инпуты
//   inputErrorClass: 'popup__input_type_error', // красное подчеркивание ошибки

//   submitButtonSelector: '.popup__submit-button', // кнопка submit
//   inactiveButtonClass: 'popup__submit-button_disabled', // неактивная кнопка submit

//   errorClass: 'popup__error_visible' // вывод ошибки
// });

