import "../pages/index.css";
import {
  initialCards,
  createCard,
  deleteCard,
  addCardSubmit,
  handleFormSubmit,
} from "./components/scripts/cards";
import {
  onOverlayClick,
  closeModal,
  openModal,
} from "./components/scripts/modal";

export const cardList = document.querySelector(".places__list"); // Карточка
export const editButton = document.querySelector(".profile__edit-button"); // Кнопка редактирования имени и информации о себе
export const addButton = document.querySelector(".profile__add-button"); // Кнопка добавления карточки
export const editModal = document.querySelector(".popup_type_edit"); // Модальное окно редактирования
export const addModal = document.querySelector(".popup_type_new-card"); // Модальное окно добавление карточки
export const cardModal = document.querySelector(".popup_type_image"); // Модальное окно увеличенная картинка
export const formElement = document.querySelector(".popup__form"); // Попап форм
export const nameInput = document.querySelector(".popup__input_type_name"); // Инпут 'Имя'
export const jobInput = document.querySelector(
  ".popup__input_type_description"
); // Инпут 'Занятие'
export const profileTitle = document.querySelector(".profile__title"); // Поле, которое изменится 'Имя'
export const profileDescription = document.querySelector(
  ".profile__description"
); // Поле, которое изменится 'Занятие'
export const cardNameInput = document.querySelector(
  ".popup__input_type_card-name"
); // Инпут 'Название'
export const cardLinkInput = document.querySelector(".popup__input_type_url"); // Инпут 'Ссылка на картинку'
export const addCardForm = document.querySelector(
  '.popup__form[name="new-place"]'
); // Вся форма
export const imagePopup = document.querySelector(".popup__image"); // Картинка, которая вставляется в попап
export const imageCaption = document.querySelector(".popup__caption"); // Текст, который вставляется в попап

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

formElement.addEventListener("submit", handleFormSubmit);

// Добавление карточки

addCardForm.addEventListener("submit", addCardSubmit);
