export const cardModal = document.querySelector(".popup_type_image"); // Модальное окно увеличенная картинка
export const imagePopup = document.querySelector(".popup__image"); // Картинка, которая вставляется в попап
export const imageCaption = document.querySelector(".popup__caption"); // Текст, который вставляется в попап

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
