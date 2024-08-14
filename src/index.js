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

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  deleteButton.addEventListener("click", deleteCallback);

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
const cardImage = document.querySelector(".card__image");

const editModal = document.querySelector(".popup_type_edit");
const addModal = document.querySelector(".popup_type_new-card");
const cardModal = document.querySelector(".popup_type_image");

const openModal = (modal) => {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupEsc);
};

editButton.addEventListener("click", () => {
  openModal(editModal);
});
addButton.addEventListener("click", () => {
  openModal(addModal);
});
cardImage.addEventListener("click", () => {
  openModal(cardModal);
});

// Закрытие popup по крестику

const closeButton = document.querySelector(".popup__close");

const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupEsc);
};

closeButton.addEventListener("click", () => {
  closeModal(editModal);
});
closeButton.addEventListener("click", () => {
  closeModal(addModal);
});
closeButton.addEventListener("click", () => {
  closeModal(cardModal);
});

// Закрытие попапа кликом на оверлей

popup.addEventListener("click", (e) => {
  if (e.currentTarget === e.target) {
    closeModal(popup);
  }
});

// Закрытие через ESC

function closePopupEsc(e) {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
}

// Редактирование имени и информации о себе

// Находим форму в DOM
const formElement = document.querySelector(".popup__form");
// Находим поля формы в DOM
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value

  // Выберите элементы, куда должны быть вставлены значения полей

  // Вставьте новые значения с помощью textContent
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);
