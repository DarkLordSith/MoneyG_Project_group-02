// ModalAddTransaction.js
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import AddTransactionForm from "./AddTransactionForm"; // Ваш компонент форми для додавання транзакції
import styles from "./ModalAddTransaction.module.css"; // Додайте стилі для модального вікна

const ModalAddTransaction = ({ onClose }) => {
  // Закрити модальне вікно при натисканні клавіші Escape
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose(); // Закрити модальне вікно при натисканні Escape
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  // Закрити модальне вікно при натисканні на backdrop
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose(); // Закрити при натисканні на фон
    }
  };

  return createPortal(
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>
        <AddTransactionForm /> {/* Ваш компонент для додавання транзакції */}
        <button className={styles.cancelButton} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>,
    document.getElementById("modal-root") // Переконайтесь, що у вас є div з id="modal-root" у HTML
  );
};

export default ModalAddTransaction;
