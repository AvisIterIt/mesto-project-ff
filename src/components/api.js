import { createCard, likeCallback } from "../components/card";
import { deleteCard } from "../components/delete-card";
import { openImage, cardList } from "../index";
import { saveButton } from "../index";
// API

// Отображение картинок с сервера

export function arrCard() {
  fetch("https://nomoreparties.co/v1/wff-cohort-23/cards", {
    headers: {
      authorization: "98880455-a778-400c-9f69-6ddd0f45b45d",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      data.forEach((cardData) => {
        const cardElement = createCard(
          cardData,
          deleteCard,
          openImage,
          likeCallback
        );
        cardList.append(cardElement);
      });
    });
}

arrCard();

// Редактирование профиля

export function editingProfileApi(name, about) {
  fetch("https://nomoreparties.co/v1/wff-cohort-23/users/me", {
    method: "PATCH",
    headers: {
      authorization: "98880455-a778-400c-9f69-6ddd0f45b45d",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .finally(() => {
      // Возвращаем текст кнопки и её активное состояние после загрузки
      saveButton.textContent = "Сохранить";
      saveButton.disabled = false;
    });
}

// Аватар

export function avatarImgApi(avatarUrl) {
  fetch("https://nomoreparties.co/v1/wff-cohort-23/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: "98880455-a778-400c-9f69-6ddd0f45b45d",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      // Обновляем аватар на странице
      const profileImage = document.querySelector(".profile__image");
      profileImage.style.backgroundImage = `url(${data.avatar})`;
    })
    .catch((error) => console.error("Error:", error));
}

// Добавление карточки

export function addCardApi(name, link) {
  fetch("https://nomoreparties.co/v1/wff-cohort-23/cards", {
    method: "POST",
    headers: {
      authorization: "98880455-a778-400c-9f69-6ddd0f45b45d",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .finally(() => {
      saveButton.textContent = "Сохранить";
      saveButton.disabled = false;
    });
}

// Отображение лайков / Постановка и снятие лайка

export function updateVisibleLikes(isLiked, cardId) {
  const method = isLiked ? "PUT" : "DELETE";

  fetch(`https://nomoreparties.co/v1/wff-cohort-23/cards/likes/${cardId}`, {
    method: method,
    headers: {
      authorization: "98880455-a778-400c-9f69-6ddd0f45b45d",
    },
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => console.error("Error:", error));
}
