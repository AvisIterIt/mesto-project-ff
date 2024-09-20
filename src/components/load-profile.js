function fetchProfile() {
  return fetch("https://nomoreparties.co/v1/wff-cohort-23/users/me", {
    method: "get",
    headers: {
      authorization: "98880455-a778-400c-9f69-6ddd0f45b45d",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

export function loadProfile() {
  const title = document.querySelector(".profile__title");
  const description = document.querySelector(".profile__description");
  const avatar = document.querySelector(".profile__image");

  fetchProfile().then((data) => {
    title.textContent = data.name;
    description.textContent = data.about;
    avatar.style.backgroundImage = `url(${data.avatar})`;
  });
}
