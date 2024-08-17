import "../pages/index.css";
import { initialCards } from "../scripts/cards";

// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

function createCard(data, deleteCallback) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const like = cardElement.querySelector(".card__like-button");

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  deleteButton.addEventListener("click", deleteCallback);

  cardImage.addEventListener("click", () => {
    openImage(data.link, data.name);
  });

  like.addEventListener("click", (e) => {
    if (e.target.classList.contains("card__like-button")) {
      likeCallback(e);
    }
  });

  return cardElement;
}

const cardList = document.querySelector(".places__list");

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard);
  cardList.append(cardElement);
});
// @todo: Функция удаления карточки

function deleteCard(e) {
  e.target.closest(".card").remove();
}

// @todo: Вывести карточки на страницу

// Открытие popup

const popup = document.querySelector(".popup");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const editModal = document.querySelector(".popup_type_edit");
const addModal = document.querySelector(".popup_type_new-card");
const cardModal = document.querySelector(".popup_type_image");

const openModal = (modal) => {
  modal.classList.add("popup_is-opened");
  modal.classList.add("popup_is-animated");
  document.addEventListener("keydown", closePopupEsc);
};

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

const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupEsc);
};

// Закрытие попапа кликом на оверлей

function onOverlayClick(e, modal) {
  if (e.currentTarget === e.target) {
    closeModal(modal);
  }
}

editModal.addEventListener("click", (e) => onOverlayClick(e, editModal));
addModal.addEventListener("click", (e) => onOverlayClick(e, addModal));
cardModal.addEventListener("click", (e) => onOverlayClick(e, cardModal));

// Закрытие через ESC

function closePopupEsc(e) {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
}

// Редактирование имени и информации о себе

const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
}

formElement.addEventListener("submit", handleFormSubmit);

// Добавление карточки

const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");
const addCardForm = document.querySelector('.popup__form[name="new-place"]');

function addCardSubmit(e) {
  e.preventDefault();
  const name = cardNameInput.value;
  const link = cardLinkInput.value;

  const newCard = createCard({ name, link });
  addCard(newCard);
  addCardForm.reset();
  closeModal(addCardForm);
}

function addCard(card) {
  cardList.prepend(card);
}

addCardForm.addEventListener("submit", addCardSubmit);

// Лайк карточки

function likeCallback(e) {
  e.target.classList.toggle("card__like-button_is-active");
}

// Открытие попапа с картинкой

const imagePopup = document.querySelector(".popup__image");
const imageCaption = document.querySelector(".popup__caption");

function openImage(link, name) {
  imagePopup.src = link;
  imageCaption.alt = name;
  imageCaption.textContent = name;
  openModal(cardModal);
}
