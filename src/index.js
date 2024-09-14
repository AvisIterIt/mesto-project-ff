import "../src/pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, deleteCard, likeCallback } from "./components/card.js";
import { onOverlayClick, closeModal, openModal } from "./components/modal.js";

const editButton = document.querySelector(".profile__edit-button"); // Кнопка редактирования имени и информации о себе
const addButton = document.querySelector(".profile__add-button"); // Кнопка добавления карточки
const editModal = document.querySelector(".popup_type_edit"); // Модальное окно редактирования
const addModal = document.querySelector(".popup_type_new-card"); // Модальное окно добавление карточки
const editformElement = editModal.querySelector(".popup__form"); // Попап форм
const cardNameInput = document.querySelector(".popup__input_type_card-name"); // Инпут 'Название'
const cardLinkInput = document.querySelector(".popup__input_type_url"); // Инпут 'Ссылка на картинку'
const cardList = document.querySelector(".places__list"); // Карточка
const nameInput = document.querySelector(".popup__input_type_name"); // Инпут 'Имя'
const jobInput = document.querySelector(".popup__input_type_description"); // Инпут 'Занятие'
const addCardForm = document.querySelector('.popup__form[name="new-place"]'); // Вся форма
const profileTitle = document.querySelector(".profile__title"); // Поле, которое изменяет 'Имя'
const profileDescription = document.querySelector(".profile__description"); // Поле, которое изменяет 'Занятие'
const cardModal = document.querySelector(".popup_type_image"); // Модальное окно увеличенная картинка
const imagePopup = document.querySelector(".popup__image"); // Картинка, которая вставляется в попап
const imageCaption = document.querySelector(".popup__caption"); // Текст, который вставляется в попап

// Создание карточек

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard, openImage, likeCallback);
  cardList.append(cardElement);
});

// Открытие popup

editButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editModal);
});

addButton.addEventListener("click", () => {
  openModal(addModal);
});

// Закрытие popup по крестику

const editClose = editModal.querySelector(".popup__close");
editClose.addEventListener("click", () => {
  closeModal(editModal);
});

const addClose = addModal.querySelector(".popup__close");
addClose.addEventListener("click", () => {
  closeModal(addModal);
});

const cardClose = cardModal.querySelector(".popup__close");
cardClose.addEventListener("click", () => {
  closeModal(cardModal);
});

// Закрытие попапа кликом на оверлей

editModal.addEventListener("click", (e) => onOverlayClick(e, editModal));
addModal.addEventListener("click", (e) => onOverlayClick(e, addModal));
cardModal.addEventListener("click", (e) => onOverlayClick(e, cardModal));

// Редактирование имени и информации о себе

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editModal);
}

editformElement.addEventListener("submit", handleFormSubmit);

// Добавление карточки

function addCardSubmit(e) {
  e.preventDefault();
  const name = cardNameInput.value;
  const link = cardLinkInput.value;

  const newCard = createCard(
    { name, link },
    deleteCard,
    () => {
      openImage(link, name);
    },
    likeCallback
  );
  addCard(newCard);
  addCardForm.reset();
  closeModal(addModal);
}

function addCard(card) {
  cardList.prepend(card);
}

function openImage(link, name) {
  imagePopup.src = link;
  imageCaption.alt = name;
  imageCaption.textContent = name;
  openModal(cardModal);
}

addCardForm.addEventListener("submit", addCardSubmit);

// Формы error

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error-active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add("popup__error-active");
  errorElement.textContent = "";
};

function isValid(formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".button");
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

enableValidation();

// Кнопка

// Функция принимает массив полей

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("form__submit_inactive");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("form__submit_inactive");
  }
};

// API

// function api() {
//   return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-23/cards", {
//     headers: {
//       authorization: "98880455-a778-400c-9f69-6ddd0f45b45d",
//     },
//   })
//     .then((res) => res.json())
//     .then((result) => {
//       console.log(result);
//     });
// }

// api();

// function getPerson() {
//   return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-23/users/me", {
//     headers: {
//       authorization: "98880455-a778-400c-9f69-6ddd0f45b45d",
//     },
//   })
//     .then((res) => res.json())
//     .then((result) => {
//       console.log(result);
//     });
// }

// getPerson();

function arr() {
  return fetch("https://nomoreparties.co/v1/wff-cohort-23/cards", {
    headers: {
      authorization: "98880455-a778-400c-9f69-6ddd0f45b45d",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

arr();
