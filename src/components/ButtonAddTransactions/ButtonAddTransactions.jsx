import React, { useState, useEffect } from "react";
import styles from "./ButtonAddTransactions.module.css";
import ModalAddTransaction from "../ModalAddTransaction/ModalAddTransaction";

const ButtonAddTransactions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Функція для відкриття модального вікна
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Функція для закриття модального вікна
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Обробник для клавіші Escape
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (isModalOpen) {
      // Додаємо слухач клавіатури, коли модальне вікно відкрите
      window.addEventListener("keydown", handleKeyDown);
    }

    // Очищаємо слухач при розмонтуванні компонента або закритті модального вікна
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <>
      <button
        type="button"
        className={styles.addButton}
        onClick={openModal}
        aria-label="Add transaction"
      >
        <svg
          className={styles.plusIcon}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 5v14M5 12h14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isModalOpen && <ModalAddTransaction closeModal={closeModal} />}
    </>
  );
};

export default ButtonAddTransactions;
