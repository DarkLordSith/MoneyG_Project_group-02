import React, { useState } from "react";
import styles from "./ButtonAddTransactions.module.css";

// Компонент для модального вікна
const ModalAddTransaction = ({ closeModal }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Додати транзакцію</h2>
        <button onClick={closeModal} className={styles.closeButton}>
          Закрити
        </button>
        {/* Тут можна додати форму для додавання транзакції */}
      </div>
    </div>
  );
};

const ButtonAddTransactions = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    // В реальному додатку тут відкриватиметься модальне вікно
    setShowModal(true);
    alert("В реальному додатку тут відкриватиметься ModalAddTransaction");
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
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

      {/* Умовно рендеримо ModalAddTransaction, якщо showModal true */}
      {showModal && <ModalAddTransaction closeModal={closeModal} />}
    </div>
  );
};

export default ButtonAddTransactions;

// const ButtonAddTransaction = () => {
//   const openModal = () => {
//     console.log("Open ModalAddTransaction");
//   };

//   return (
//     <button onClick={openModal} aria-label="Add transaction">
//       +
//     </button>
//   );
// };

// export default ButtonAddTransaction;
