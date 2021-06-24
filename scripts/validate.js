

function showErrorMassage(inputElement, errorMassage, configForms) {
  inputElement.classList.add(configForms.inputErrorClass);
};






function enableValidation (configForms) {
  const formList = Array.from(document.querySelectorAll(configForms.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  });
  //console.log(forms);
}

enableValidation({
  formSelector: '.popup__container', // формы

  inputSelector: '.popup__input', // инпуты
  inputErrorClass: 'popup__input_type_error', // красное подчеркивание ошибки

  submitButtonSelector: '.popup__submit-button', // кнопка submit
  inactiveButtonClass: 'popup__submit-button_disabled', // неактивная кнопка submit

  errorClass: 'popup__error_visible' // вывод ошибки
});

