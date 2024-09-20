function isValid(pattern, text) {
  return pattern.test(text);
}

function isEmpty(text) {
  return text.length === 0;
}

export function enableValidation(options) {
  const forms = document.querySelectorAll(options.formSelector);

  forms.forEach((form) => {
    const inputs = form.querySelectorAll(options.inputSelector);
    const submitButton = form.querySelector(options.submitButtonSelector);

    inputs.forEach((input) => {
      const errorElement = form.querySelector(`.${input.id}-error`);

      input.addEventListener("input", () => {
        const text = input.value;

        let errorMessage = "";

        if (isEmpty(text)) errorMessage = "Вы пропустили это поле.";
        else if (text.length < 2)
          errorMessage = "Длина должна быть больше 1 символа";
        else if (!isValid(new RegExp(input.pattern), text))
          errorMessage = input.getAttribute("data-error-message");

        if (errorMessage) {
          input.classList.add(options.inputErrorClass);
          submitButton.classList.add(options.inactiveButtonClass);
          errorElement.classList.add(options.errorClass);
          errorElement.textContent = errorMessage;
        } else {
          submitButton.classList.remove(options.inactiveButtonClass);
          input.classList.remove(options.inputErrorClass);
          errorElement.classList.remove(options.errorClass);
          errorElement.textContent = "";
        }
      });
    });
  });
}
