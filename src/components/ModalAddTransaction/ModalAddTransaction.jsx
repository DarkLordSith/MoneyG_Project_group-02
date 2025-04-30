// import AddTransactionForm from "../AddTransactionForm/AddTransactionForm";

// const ModalAddTransaction = ({ onClose }) => {
//   return (
//     <div onClick={onClose}>
//       <div onClick={(e) => e.stopPropagation()}>
//         <AddTransactionForm onClose={onClose} />
//       </div>
//     </div>
//   );
// };

// export default ModalAddTransaction;

import React, { useState, useEffect } from "react";
import { Calendar, X } from "lucide-react";
import styles from "./ModalAddTransaction.module.css";

const ModalAddTransaction = ({ isOpen, onClose }) => {
  const [isIncome, setIsIncome] = useState(true);
  const [amount, setAmount] = useState("0.00");
  const [date, setDate] = useState("07.07.2023");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const toggleTransactionType = () => {
    setIsIncome(!isIncome);
  };

  return (
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Overlay background */}
        <div className={styles.modalBackground}></div>

        {/* Close button */}
        <div className={styles.closeButton}>
          <button onClick={onClose}>
            <X className={styles.closeIcon} />
          </button>
        </div>

        {/* Title */}
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>Add transaction</h2>
        </div>

        {/* Toggle between Income and Expense */}
        <div className={styles.toggleContainer}>
          <div className={styles.toggleWrapper}>
            <div
              className={`${styles.toggleOption} ${isIncome ? styles.activeOption : ""}`}
              onClick={() => setIsIncome(true)}
            >
              Income
            </div>

            <div className={styles.toggleSwitch}>
              <div
                className={`${styles.toggleSlider} ${isIncome ? "" : styles.sliderRight}`}
                onClick={toggleTransactionType}
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

        {/* Amount and Date Inputs */}
        <div className={styles.inputRowContainer}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={styles.amountInput}
            />
            <div className={styles.inputUnderline}></div>
          </div>

          <div className={styles.inputWrapper}>
            <div className={styles.dateInputContainer}>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={styles.dateInput}
              />
              <Calendar className={styles.calendarIcon} />
            </div>
            <div className={styles.inputUnderline}></div>
          </div>
        </div>

        {/* Comment input */}
        <div className={styles.commentContainer}>
          <input
            type="text"
            placeholder="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className={styles.commentInput}
          />
          <div className={styles.inputUnderline}></div>
        </div>

        {/* Action buttons */}
        <div className={styles.buttonsContainer}>
          <button className={styles.addButton}>ADD</button>
          <button className={styles.cancelButton} onClick={onClose}>
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddTransaction;
