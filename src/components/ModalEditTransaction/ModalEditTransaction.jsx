// components/ModalEditTransaction/ModalEditTransaction.jsx
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
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

  return ReactDOM.createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button type="button" className={css.closeBtn} onClick={onClose}>
          <IoClose size={24} />
        </button>
        <EditTransactionForm transaction={transaction} onClose={onClose} />
      </div>
    </div>,
    modalRoot
  );
};
