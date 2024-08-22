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
