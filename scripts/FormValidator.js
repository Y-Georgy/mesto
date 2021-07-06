class FormValidator {
  constructor (config, formElement) {
    this._formElement = formElement; // форма
    this._buttonElement = formElement.querySelector(config.submitButtonSelector); // кнопка сабмит
    this._inputElements = Array.from(formElement.querySelectorAll(config.inputSelector)); // все инпуты
    this._configForm = config; // объект с классами формы
    this._popupErrorList = Array.from(this._formElement.querySelectorAll(config.errorSelector)); // массив всех ошибок
    this._popupInputList = Array.from(this._formElement.querySelectorAll(config.inputSelector)); // массив всех инпутов
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
  _activateButtonSubmit = () => {
    this._buttonElement.classList.add(this._configForm.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', 'disabled');
  }
  // дезактивирую кнопку сабмит
  _inactivateButtonSubmit = () => {
    this._buttonElement.classList.remove(this._configForm.inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  }

  // проверка всех инпутов формы - true если хоть один из инпутов формы невалиден
  _checkInputsValid = () => {
    return this._inputElements.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  // делаю кнопку submit активной/неактивной, проверяя валидацию инпутов
  toggleButtonState = () => {
    if (this._checkInputsValid()) {
      this._activateButtonSubmit();
    } else {
      this._inactivateButtonSubmit();
    }
  }

  // устанавливаю слушатели всех инпутов и запускаю методы
  _setInputListeners = () => {
    //
    this.toggleButtonState(); // до установки слушателей устанавливаю активность/неакт-ть кнопки submit
    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
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

  // функция очистки ошибок валидации
  clearErrorsMessage = () => {
    this._popupErrorList.forEach((popupError) => {
      popupError.textContent = "";
    });
    this._popupInputList.forEach((popupInput) => {
      popupInput.classList.remove(this._configForm.inputErrorClass);
    });
  }
}

export default FormValidator;



