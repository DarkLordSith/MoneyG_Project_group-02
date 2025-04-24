// src/components/ButtonAddTransactions/ButtonAddTransactions.jsx
import React, { useState } from "react";
import styles from "./ButtonAddTransactions.module.css";

const ButtonAddTransactions = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    // В реальному додатку тут відкриватиметься модальне вікно
    // для додавання транзакції
    setShowModal(true);
    alert("В реальному додатку тут відкриватиметься ModalAddTransaction");
  };

  return (
    <button
      type="button"
      className={styles.addButton}
      onClick={handleClick}
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
  );
};

export default ButtonAddTransactions;
