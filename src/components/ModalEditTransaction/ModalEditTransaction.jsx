import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import EditTransactionForm from "../EditTransactionForm/EditTransactionForm";
import styles from "./ModalEditTransaction.module.css";

const ModalEditTransaction = ({ onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>
        <EditTransactionForm onClose={onClose} />
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default ModalEditTransaction;

// import EditTransactionForm from "../EditTransactionForm/EditTransactionForm";

// const ModalEditTransaction = ({ transaction, onClose }) => {
//   return (
//     <div onClick={onClose}>
//       <div onClick={(e) => e.stopPropagation()}>
//         <EditTransactionForm transaction={transaction} onClose={onClose} />
//       </div>
//     </div>
//   );
// };

// export default ModalEditTransaction;
