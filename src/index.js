import "../src/pages/index.css";
import { createCard, likeCallback } from "./components/card.js";
import { cohort, myId } from "./components/constants.js";
import { deleteCard } from "./components/delete-card.js";
import { loadProfile } from "./components/load-profile.js";
import { onOverlayClick, closeModal, openModal } from "./components/modal.js";
import { enableValidation } from "./components/validation.js";
import {
  editingProfileApi,
  avatarImgApi,
  addCardApi,
} from "./components/api.js";

const editButton = document.querySelector(".profile__edit-button"); // Кнопка редактирования имени и информации о себе
const addButton = document.querySelector(".profile__add-button"); // Кнопка добавления карточки
const avatarButton = document.querySelector(".profile__image"); //
const editModal = document.querySelector(".popup_type_edit"); // Модальное окно редактирования
const addModal = document.querySelector(".popup_type_new-card"); // Модальное окно добавление карточки
const avatarModal = document.querySelector(".popup_type_avatar"); //
const editFormElement = editModal.querySelector(".popup__form"); // Попап форм
const cardNameInput = document.querySelector(".popup__input_type_card-name"); // Инпут 'Название'
const cardLinkInput = document.querySelector(".popup__input_type_url"); // Инпут 'Ссылка на картинку'
export const cardList = document.querySelector(".places__list"); // Карточка
const nameInput = document.querySelector(".popup__input_type_name"); // Инпут 'Имя'
const jobInput = document.querySelector(".popup__input_type_description"); // Инпут 'Занятие'
const addCardForm = document.querySelector('.popup__form[name="new-place"]'); // Вся форма
const profileTitle = document.querySelector(".profile__title"); // Поле, которое изменяет 'Имя'
const profileDescription = document.querySelector(".profile__description"); // Поле, которое изменяет 'Занятие'
const cardModal = document.querySelector(".popup_type_image"); // Модальное окно увеличенная картинка
const imagePopup = document.querySelector(".popup__image"); // Картинка, которая вставляется в попап
const imageCaption = document.querySelector(".popup__caption"); // Текст, который вставляется в попап
export const saveButton = document.querySelector(".button");
const avatarPopup = document.querySelector(".popup_type_avatar");
const avatarForm = avatarPopup.querySelector(".popup__form");
const avatarInput = avatarForm.querySelector(".popup__input_type_url");

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

  saveButton.textContent = "Сохранение...";
  saveButton.disabled = true;

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

  saveButton.textContent = "Сохранение...";
  saveButton.disabled = true;

  const newCard = createCard(
    {
      name,
      link,
      likes: [],
      owner: {
        name: profileTitle.textContent,
        about: profileDescription.textContent,
        _id: myId,
        cohort: cohort,
        avatar: "",
      },
    },
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

export function openImage(link, name) {
  imagePopup.src = link;
  imageCaption.alt = name;
  imageCaption.textContent = name;
  openModal(cardModal);
}

addCardForm.addEventListener("submit", addCardSubmit);

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup_error_visible",
});

// Отображение аватарки

avatarForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const avatarUrl = avatarInput.value;

  avatarImgApi(avatarUrl);
  closeModal(avatarModal);
});

loadProfile();
