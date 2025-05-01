import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import styles from "./ModalAddTransaction.module.css";
import AddTransactionForm from "../AddTransactionForm/AddTransactionForm";

const ModalAddTransaction = ({ closeModal }) => {
  const [isIncome, setIsIncome] = useState(false); // За замовчуванням тип "витрати" (expense)
  const modalRef = useRef(null);

  // Добавляем определение медиа-запросов
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isDesktop = useMediaQuery({ minWidth: 1280 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1279 });

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

  // Применяем классы на основе медиа-запросов
  const modalContainerClasses = [
    styles.modalContainer,
    !isIncome ? styles.expenseContainer : "",
    isMobile ? styles.modalContainerMobile : "",
    isTablet ? styles.modalContainerTablet : "",
    isDesktop ? styles.modalContainerDesktop : "",
  ]
    .filter(Boolean)
    .join(" ");

  const toggleContainerClasses = [
    styles.toggleContainer,
    isMobile ? styles.toggleContainerMobile : "",
  ]
    .filter(Boolean)
    .join(" ");

  const buttonsContainerClasses = [
    styles.buttonsContainer,
    isMobile ? styles.buttonsContainerMobile : "",
  ]
    .filter(Boolean)
    .join(" ");

  const cancelButtonClasses = [
    styles.cancelButton,
    isMobile ? styles.cancelButtonMobile : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={styles.modalOverlay}
      onClick={handleBackdropClick}
      ref={modalRef}
    >
      <div
        className={modalContainerClasses}
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
        <div className={toggleContainerClasses}>
          <div className={styles.toggleWrapper}>
            <div
              className={`${styles.toggleOption} ${isIncome ? styles.activeIncome : ""}`}
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
              className={`${styles.toggleOption} ${!isIncome ? styles.activeExpense : ""}`}
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
        <div className={buttonsContainerClasses}>
          <button className={cancelButtonClasses} onClick={closeModal}>
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddTransaction;
