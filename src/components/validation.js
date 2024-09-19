// {
//     formSelector: "",
//     inputSelector: "",
//     submitButtonSelector: "",
//     inactiveButtonClass: "",
//     inputErrorClass: "",
//     errorClass: "",
// }

function isValid(pattern, text) {
    return pattern.test(text)
}

function isEmpty(text) {
    return text.length === 0
}

export function _enableValidation(options) {
    const forms = document.querySelectorAll(options.formSelector)

    forms.forEach((form) => {
        const inputs = form.querySelectorAll(options.inputSelector)
        const submitButton = form.querySelector(options.submitButtonSelector)

        inputs.forEach((input) => {
            const errorElement = form.querySelector(`.${input.id}-error`)

            input.addEventListener("input", () => {
                const text = input.value
                if (isEmpty(text) || !isValid(new RegExp(input.pattern), text)) {
                    const errorMessage = isEmpty(text)
                        ? "Вы пропустили это поле."
                        : input.getAttribute("data-error-message")

                    input.classList.add(options.inputErrorClass)
                    submitButton.classList.add(options.inactiveButtonClass)
                    errorElement.classList.add(options.errorClass)
                    errorElement.textContent = errorMessage
                } else {
                    submitButton.classList.remove(options.inactiveButtonClass)
                    input.classList.remove(options.inputErrorClass)
                    errorElement.classList.remove(options.errorClass)
                    errorElement.textContent = ""
                }
            })
        })
    })
}
