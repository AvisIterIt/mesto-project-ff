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

  cardImage.addEventListener("click", () => imgCallback(data.link, data.name));

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
