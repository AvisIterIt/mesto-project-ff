import { updateVisibleLikes, deleteCardApi } from "../components/api";

// Функция создания карточки
export function createCard(
  data,
  deleteCallback,
  imgCallback,
  likeCallback,
  myId
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  if (data.likes.some((like) => like._id === myId)) {
    likeButton.classList.add("card__like-button_is-active");
  }
  const likeCount = cardElement.querySelector(".card__like-count");

  if (data.owner._id !== myId) {
    deleteButton.remove();
  }

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  likeCount.textContent = data.likes.length;

  deleteButton.addEventListener("click", (e) => deleteCallback(e, data._id));
  cardImage.addEventListener("click", () => imgCallback(data.link, data.name));
  likeButton.addEventListener("click", (e) => likeCallback(e, data, likeCount));

  return cardElement;
}

// Удаление карточки

export function deleteCard(e, id) {
  deleteCardApi(id)
    .then(() => {
      e.target.closest(".card").remove();
    })
    .catch((error) => {
      console.error(error);
    });
}

// Лайк карточки

export function likeCallback(e, cardData, likeCountElement) {
  const likeButton = e.target;
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  updateVisibleLikes(isLiked ? "remove" : "add", cardData._id)
    .then((response) => {
      likeButton.classList.toggle("card__like-button_is-active");
      likeCountElement.textContent = response.likes.length;
    })
    .catch((error) => {
      console.error(error);
    });
}
