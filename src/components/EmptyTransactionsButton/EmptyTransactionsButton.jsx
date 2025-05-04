import React, { useState, useEffect } from "react";
import styles from "./EmptyTransactionsButton.module.css";
import ModalAddTransaction from "../ModalAddTransaction/ModalAddTransaction";

const EmptyTransactionsButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <div className={styles.emptyTransactionsContainer}>
      <p className={styles.emptyText}>No transaction found.</p>
      <button
        type="button"
        className={styles.addCenterButton}
        onClick={openModal}
        aria-label="Add transaction"
      >
        Add Transaction
      </button>

      {isModalOpen && <ModalAddTransaction closeModal={closeModal} />}
    </div>
  );
};

export default EmptyTransactionsButton;
