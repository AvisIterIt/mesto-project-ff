import "../src/pages/index.css";
import { initialCards } from "./components/cards.js";
import {
  createCard,
  deleteCard,
  cardList,
  addCardForm,
  profileTitle,
  nameInput,
  profileDescription,
  jobInput,
} from "./components/card.js";
import {
  onOverlayClick,
  closeModal,
  openModal,
  cardModal,
  imagePopup,
  imageCaption,
} from "./components/modal.js";

const editButton = document.querySelector(".profile__edit-button"); // Кнопка редактирования имени и информации о себе
const addButton = document.querySelector(".profile__add-button"); // Кнопка добавления карточки
const editModal = document.querySelector(".popup_type_edit"); // Модальное окно редактирования
const addModal = document.querySelector(".popup_type_new-card"); // Модальное окно добавление карточки
const editformElement = editModal.querySelector(".popup__form"); // Попап форм
const cardNameInput = document.querySelector(".popup__input_type_card-name"); // Инпут 'Название'
const cardLinkInput = document.querySelector(".popup__input_type_url"); // Инпут 'Ссылка на картинку'

// Создание карточек

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard);
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

  const newCard = createCard({ name, link });
  addCard(newCard);
  addCardForm.reset();
  closeModal(addCardForm);
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
