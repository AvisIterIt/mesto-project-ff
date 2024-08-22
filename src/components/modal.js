// Открытие модального окна

export const openModal = (modal) => {
  modal.classList.add("popup_is-opened");
  modal.classList.add("popup_is-animated");
  document.addEventListener("keydown", closePopupEsc);
};

// Закрытие через ESC

export function closePopupEsc(e) {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
}

// Закрытие модальных окон

export const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupEsc);
};

// Закрытие по оверлей

export function onOverlayClick(e, modal) {
  if (e.currentTarget === e.target) {
    closeModal(modal);
  }
}
