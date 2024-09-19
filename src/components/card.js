import { visibleLikes } from "../index";
// Функция создания карточки

export function createCard(data, deleteCallback, imgCallback, likeCallback) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-count");

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  // Если удалить то работает фун-ия доб-ия карточек, если оставить раб-т фун-ия отображения лайков
  likeCount.textContent = data.likes.length;

  deleteButton.addEventListener("click", deleteCallback);

  cardImage.addEventListener("click", () => imgCallback(data.link, data.name));

  likeButton.addEventListener("click", (e) => likeCallback(e, data, likeCount));

  return cardElement;
}

// Функция удаления карточки

export function deleteCard(e) {
  e.target.closest(".card").remove();
}

// Лайк карточки

export function likeCallback(e, cardData, likeCountElement) {
  const likeButton = e.target;
  likeButton.classList.toggle("card__like-button_is-active");

  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  let likesCount = cardData.likes.length;

  if (isLiked) {
    likesCount += 1;
  } else {
    likesCount -= 1;
  }

  likeCountElement.textContent = likesCount;

  visibleLikes(isLiked, cardData._id);
}
