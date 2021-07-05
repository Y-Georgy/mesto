class FormValidator {
  constructor (config, formElement) {
    this._formElement = formElement; // форма
    this._configForm = config; // объект с классами формы
  }

  // Показываю сообщение об ошибке
  _showErrorMessage = (inputElement) => {
    const error = this._formElement.querySelector(`.${inputElement.id}-error`);
    const errorMessage = inputElement.validationMessage;
    error.textContent = errorMessage;
    inputElement.classList.add(this._configForm.inputErrorClass);
    error.classList.add(this._configForm.errorClass);
  };
  // скрываю сообщение об ошибке
  _hideErrorMessage = (inputElement) => {
    const error = this._formElement.querySelector(`.${inputElement.id}-error`);
    error.textContent = "";
    inputElement.classList.remove(this._configForm.inputErrorClass);
    error.classList.remove(this._configForm.errorClass);
  }
  // проверяю валиден ли инпут
  _checkInputValidity = (inputElement) => {
    if (inputElement.validity.valid) {
      this._hideErrorMessage(inputElement);
    } else {
      this._showErrorMessage(inputElement);
    }
  }

  // активирую кнопку сабмит
  _activateButtonSubmit = (buttonElement) => {
    buttonElement.classList.add(this._configForm.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  }
  // дезактивирую кнопку сабмит
  _inactivateButtonSubmit = (buttonElement) => {
    buttonElement.classList.remove(this._configForm.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
  // проверка всех инпутов формы - true если хоть один из инпутов формы невалиден
  _checkInputsValid = (inputElements) => {
    return inputElements.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  // делаю кнопку submit активной/неактивной, проверяя валидацию инпутов
  _toggleButtonState = (inputElements) => {
    const buttonElement = this._formElement.querySelector(this._configForm.submitButtonSelector);
    if (this._checkInputsValid(inputElements)) {
      this._activateButtonSubmit(buttonElement);
    } else {
      this._inactivateButtonSubmit(buttonElement);
    }
  }

  // устанавливаю слушатели всех инпутов и запускаю методы
  _setInputListeners = () => {
    const inputElements = Array.from(this._formElement.querySelectorAll(this._configForm.inputSelector));
    this._toggleButtonState(inputElements); // до установки слушателей устанавливаю активность/неакт-ть кнопки submit
    inputElements.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputElements);
      });
    });
  };

  // публичный метод валидации всех форм
  enableValidation = () => {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setInputListeners();
  }
}

export default FormValidator;



