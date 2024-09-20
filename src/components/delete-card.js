export function deleteCard(e, id) {
  e.target.closest(".card").remove();

  deleteCardApi(id);
}

// Удаление карточки
function deleteCardApi(cardId) {
  fetch(`https://nomoreparties.co/v1/wff-cohort-23/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "98880455-a778-400c-9f69-6ddd0f45b45d",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error));
}
