import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import styles from "./ModalAddTransaction.module.css";
import AddTransactionForm from "../AddTransactionForm/AddTransactionForm";

const ModalAddTransaction = ({ closeModal }) => {
  const [isIncome, setIsIncome] = useState(false); // За замовчуванням тип "витрати" (expense)
  const modalRef = useRef(null);

  useEffect(() => {
    // Блокуємо прокрутку body, коли модальне вікно відкрите
    document.body.style.overflow = "hidden";

    // Добавляем обработчик клавиши Escape
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEscKey);

    // Повертаємо прокрутку при закритті модального вікна
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [closeModal]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const toggleTransactionType = () => {
    setIsIncome(!isIncome);
  };

  return (
    <div
      className={styles.modalOverlay}
      onClick={handleBackdropClick}
      ref={modalRef}
    >
      <div
        className={`${styles.modalContainer} ${!isIncome ? styles.expenseContainer : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Фон модального вікна */}
        <div className={styles.modalBackground}></div>

        {/* Кнопка закриття */}
        <div className={styles.closeButton}>
          <button onClick={closeModal}>
            <X className={styles.closeIcon} />
          </button>
        </div>

        {/* Заголовок */}
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>Add transaction</h2>
        </div>

        {/* Перемикач між доходом і витратою */}
        <div className={styles.toggleContainer}>
          <div className={styles.toggleWrapper}>
            <div
              className={`${styles.toggleOption} ${isIncome ? styles.activeOption : ""}`}
              onClick={() => setIsIncome(true)}
            >
              Income
            </div>

            <div
              className={styles.toggleSwitch}
              onClick={toggleTransactionType}
            >
              <div
                className={`${styles.toggleSlider} ${isIncome ? "" : styles.sliderRight}`}
              ></div>
            </div>

            <div
              className={`${styles.toggleOption} ${!isIncome ? styles.activeOption : ""}`}
              onClick={() => setIsIncome(false)}
            >
              Expense
            </div>
          </div>
        </div>

        {/* Форма всегда видима */}
        <AddTransactionForm
          closeModal={closeModal}
          transactionType={isIncome ? "income" : "expense"}
        />

        {/* Кнопка Cancel */}
        <div className={styles.buttonsContainer}>
          <button className={styles.cancelButton} onClick={closeModal}>
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddTransaction;
