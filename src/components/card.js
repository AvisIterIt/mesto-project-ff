export const cardList = document.querySelector(".places__list"); // Карточка
export const nameInput = document.querySelector(".popup__input_type_name"); // Инпут 'Имя'
export const jobInput = document.querySelector(
  ".popup__input_type_description"
); // Инпут 'Занятие'
export const addCardForm = document.querySelector(
  '.popup__form[name="new-place"]'
); // Вся форма
export const profileTitle = document.querySelector(".profile__title"); // Поле, которое изменяет 'Имя'
export const profileDescription = document.querySelector(
  ".profile__description"
); // Поле, которое изменяет 'Занятие'

// Функция создания карточки

export function createCard(data, deleteCallback, imgCallback, likeCallback) {
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

  cardImage.addEventListener("click", imgCallback);

  like.addEventListener("click", likeCallback);

  return cardElement;
}

// Функция удаления карточки

export function deleteCard(e) {
  e.target.closest(".card").remove();
}

// Лайк карточки

export function likeCallback(e) {
  if (e.target.classList.contains("card__like-button")) {
    e.target.classList.toggle("card__like-button_is-active");
  }
}
