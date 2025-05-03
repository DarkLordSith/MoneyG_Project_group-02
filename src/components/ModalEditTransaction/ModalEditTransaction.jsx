import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react";
import css from "./ModalEditTransaction.module.css";
import { EditTransactionForm } from "../EditTransactionForm/EditTransactionForm";

const modalRoot = document.getElementById("modal-root");

export const ModalEditTransaction = ({ transaction, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    // Блокируем скролл body при открытии модального окна
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
      // Возвращаем скролл при закрытии
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return ReactDOM.createPortal(
    <div className={css.modalOverlay} onClick={handleBackdropClick}>
      <div
        className={`${css.modalContainer} ${
          transaction.type === "expense" ? css.expenseContainer : ""
        }`}
      >
        <div className={css.modalBackground} />
        <div className={css.closeButton}>
          <button onClick={onClose} className={css.closeButtonIcon}>
            <X className={css.closeIcon} />
          </button>
        </div>
        <div className={css.titleContainer}>
          <h2 className={css.title}>Edit transaction</h2>
        </div>

        {/* Форма редактирования транзакции */}
        <EditTransactionForm transaction={transaction} onClose={onClose} />

        {/* Кнопка отмены внизу модального окна */}
        <div className={css.buttonsContainer}>
          <button className={css.cancelButton} onClick={onClose}>
            CANCEL
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};
