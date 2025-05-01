// components/ModalEditTransaction/ModalEditTransaction.jsx
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react";
import css from "./ModalEditTransaction.module.css";
import { EditTransactionForm } from "../EditTransactionForm/EditTransactionForm";
import { IoClose } from "react-icons/io5";

const modalRoot = document.getElementById("modal-root");

export const ModalEditTransaction = ({ transaction, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // if (!transaction || transaction.amount === undefined) return null;

  return ReactDOM.createPortal(
    <div className={css.modalOverlay} onClick={handleBackdropClick}>
      <div
        className={`${css.modalContainer} ${transaction.type === "expense" ? css.expenseContainer : ""}`}
      >
        <div className={css.modalBackground} />
        <div className={css.closeButton}>
          <button onClick={onClose}>
            <X className={css.closeIcon} />
          </button>
        </div>
        <div className={css.titleContainer}>
          <h2 className={css.title}>Edit transaction</h2>
        </div>
        <EditTransactionForm transaction={transaction} onClose={onClose} />
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
