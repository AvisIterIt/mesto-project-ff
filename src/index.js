import "../src/pages/index.css";
import { createCard, deleteCard, likeCallback } from "./components/card.js";
import { onOverlayClick, closeModal, openModal } from "./components/modal.js";
import { _enableValidation } from "./components/validation.js";

const editButton = document.querySelector(".profile__edit-button"); // Кнопка редактирования имени и информации о себе
const addButton = document.querySelector(".profile__add-button"); // Кнопка добавления карточки
const avatarButton = document.querySelector(".profile__image"); //
const editModal = document.querySelector(".popup_type_edit"); // Модальное окно редактирования
const addModal = document.querySelector(".popup_type_new-card"); // Модальное окно добавление карточки
const avatarModal = document.querySelector(".popup_type_avatar"); //
const editFormElement = editModal.querySelector(".popup__form"); // Попап форм
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

// Открытие popup

editButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editModal);
});

addButton.addEventListener("click", () => {
  openModal(addModal);
});

avatarButton.addEventListener("click", () => {
  openModal(avatarModal);
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

const avatarClose = avatarModal.querySelector(".popup__close");
avatarClose.addEventListener("click", () => {
  closeModal(avatarModal);
});

// Закрытие попапа кликом на оверлей

editModal.addEventListener("click", (e) => onOverlayClick(e, editModal));
addModal.addEventListener("click", (e) => onOverlayClick(e, addModal));
cardModal.addEventListener("click", (e) => onOverlayClick(e, cardModal));
avatarModal.addEventListener("click", (e) => onOverlayClick(e, avatarModal));

// Редактирование имени и информации о себе

function handleFormSubmit(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const about = jobInput.value;

  profileTitle.textContent = name;
  profileDescription.textContent = about;

  editingProfileApi(name, about);

  closeModal(editModal);
}

editFormElement.addEventListener("submit", handleFormSubmit);

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
  addCardApi(name, link);
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

// enableValidation()
_enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup_error_visible",
});

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

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

// Отображение картинок с сервера

function arrCard() {
  fetch("https://nomoreparties.co/v1/wff-cohort-23/cards", {
    headers: {
      authorization: "98880455-a778-400c-9f69-6ddd0f45b45d",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.forEach((cardData) => {
        const cardElement = createCard(
          cardData,
          deleteCard,
          openImage,
          likeCallback
        );
        cardList.append(cardElement);
      });
    });
}

arrCard();

// Редактирование профиля

function editingProfileApi(name, about) {
  fetch("https://nomoreparties.co/v1/wff-cohort-23/users/me", {
    method: "PATCH",
    headers: {
      authorization: "98880455-a778-400c-9f69-6ddd0f45b45d",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
}

// Аватар

function avatarImgApi(avatarUrl) {
  fetch("https://nomoreparties.co/v1/wff-cohort-23/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: "98880455-a778-400c-9f69-6ddd0f45b45d",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      // Обновляем аватар на странице
      const profileImage = document.querySelector(".profile__image");
      profileImage.style.backgroundImage = `url(${data.avatar})`;
    })
    .catch((error) => console.error("Error:", error));
}

const avatarPopup = document.querySelector(".popup_type_avatar");
const avatarForm = avatarPopup.querySelector(".popup__form");
const avatarInput = avatarForm.querySelector(".popup__input_type_url");

avatarForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const avatarUrl = avatarInput.value;

  // Отправляем запрос для обновления аватара
  avatarImgApi(avatarUrl);

  // Закрываем форму после успешного обновления
  closeModal(avatarModal);
});

// Добавление карточки

function addCardApi(name, link) {
  fetch("https://nomoreparties.co/v1/wff-cohort-23/cards", {
    method: "POST",
    headers: {
      authorization: "98880455-a778-400c-9f69-6ddd0f45b45d",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
}

// Удаление карточки

function deleteCardApi(cardId) {
  fetch(`https://nomoreparties.co/v1/wff-cohort-23/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "98880455-a778-400c-9f69-6ddd0f45b45d",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
}

// Отображение лайков / Постановка и снятие лайка

export function visibleLikes(isLiked, cardId) {
  const method = isLiked ? "PUT" : "DELETE";

  fetch(`https://nomoreparties.co/v1/wff-cohort-23/cards/likes/${cardId}`, {
    method: method,
    headers: {
      authorization: "98880455-a778-400c-9f69-6ddd0f45b45d",
    },
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .then((updatedCardData) => {
      const likeCountElement = document.querySelector(
        `.card[data-id="${cardId}"] .card__like-count`
      );
      likeCountElement.textContent = updatedCardData.likes.length;
    })
    .catch((error) => console.error("Error:", error));
}
