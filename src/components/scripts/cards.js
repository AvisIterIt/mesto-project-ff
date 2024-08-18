import {
  cardList,
  cardNameInput,
  cardLinkInput,
  addCardForm,
  profileTitle,
  nameInput,
  profileDescription,
  jobInput,
} from "../../index.js";
import { openImage, closeModal } from "./modal.js";

export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// Функция создания карточки

export function createCard(data, deleteCallback) {
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

// Функция удаления карточки

export function deleteCard(e) {
  e.target.closest(".card").remove();
}

// Добавление карточки

export function addCardSubmit(e) {
  e.preventDefault();
  const name = cardNameInput.value;
  const link = cardLinkInput.value;

  const newCard = createCard({ name, link });
  addCard(newCard);
  addCardForm.reset();
  closeModal(addCardForm);
}

export function addCard(card) {
  cardList.prepend(card);
}

// Лайк карточки

export function likeCallback(e) {
  e.target.classList.toggle("card__like-button_is-active");
}

// Редактирование имени и информации о себе

export function handleFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
}
