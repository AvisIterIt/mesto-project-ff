import "../src/pages/index.css";
import { createCard, likeCallback, deleteCard } from "./components/card.js";
import { cohort } from "./components/constants.js";
import { onOverlayClick, closeModal, openModal } from "./components/modal.js";
import {
  enableValidation,
  clearValidationErrors,
} from "./components/validation.js";
import {
  editingProfileApi,
  avatarImgApi,
  addCardApi,
  fetchProfile,
  getCards,
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
const avatarForm = avatarModal.querySelector(".popup__form");
const avatarInput = avatarForm.querySelector(".popup__input_type_url");
export const errorMessageEdit = editModal.querySelectorAll(".popup__error");

let myId;

// Открытие popup

editButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editModal);
  clearValidationErrors(errorMessageEdit);
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

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const about = jobInput.value;
  const editSaveButton = editModal.querySelector(".button");
  editSaveButton.textContent = "Сохранение...";

  editingProfileApi(name, about)
    .then(() => {
      profileTitle.textContent = name;
      profileDescription.textContent = about;
      closeModal(editModal);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      editSaveButton.textContent = "Сохранить";
    });
}

editFormElement.addEventListener("submit", handleProfileFormSubmit);

// Добавление карточки

function addCardSubmit(e, inactiveButtonClass) {
  e.preventDefault();
  const name = cardNameInput.value;
  const link = cardLinkInput.value;
  const addSaveButton = addModal.querySelector(".button");
  addSaveButton.textContent = "Сохранение...";

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
    likeCallback,
    myId
  );

  addCardApi(name, link)
    .then(() => {
      addCard(newCard);
      addSaveButton.classList.add(inactiveButtonClass);
      addCardForm.reset();
      closeModal(addModal);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      addSaveButton.textContent = "Сохранить";
    });
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

addCardForm.addEventListener("submit", (e) =>
  addCardSubmit(e, "popup__button_disabled")
);

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
  const avatarSaveButton = avatarModal.querySelector(".button");
  avatarSaveButton.textContent = "Сохранение...";
  const avatarUrl = avatarInput.value;

  avatarImgApi(avatarUrl)
    .then((data) => {
      const profileImage = document.querySelector(".profile__image");
      profileImage.style.backgroundImage = `url(${data.avatar})`;
      closeModal(avatarModal);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      avatarSaveButton.textContent = "Сохранить";
    });
});

function loadProfile(profile) {
  const title = document.querySelector(".profile__title");
  const description = document.querySelector(".profile__description");
  const avatar = document.querySelector(".profile__image");

  title.textContent = profile.name;
  description.textContent = profile.about;
  avatar.style.backgroundImage = `url(${profile.avatar})`;
}

// Отображение карточек
function renderCards(cards, myId) {
  cards.forEach((cardData) => {
    const cardElement = createCard(
      cardData,
      deleteCard,
      openImage,
      likeCallback,
      myId
    );
    cardList.append(cardElement);
  });
}

Promise.all([fetchProfile(), getCards()])
  .then(([profileRes, cardsRes]) => {
    myId = profileRes._id;

    renderCards(cardsRes, myId);
    loadProfile(profileRes);
  })
  .catch((error) => {
    console.error(error);
  });
