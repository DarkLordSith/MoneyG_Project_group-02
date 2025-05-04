import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react";
import css from "./ModalEditTransaction.module.css";
import { EditTransactionForm } from "../EditTransactionForm/EditTransactionForm";
import useMedia from "../../hooks/useMedia";

const modalRoot = document.getElementById("modal-root");

export const ModalEditTransaction = ({ transaction, onClose }) => {
  const { isMobile, isTablet, isDesktop } = useMedia();
  const getClasses = (baseClass, mobileClass, tabletClass, desktopClass) => {
    const classes = [baseClass];
    if (isMobile && mobileClass) classes.push(mobileClass);
    if (isTablet && tabletClass) classes.push(tabletClass);
    if (isDesktop && desktopClass) classes.push(desktopClass);
    return classes.filter(Boolean).join(" ");
  };
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
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

        <EditTransactionForm transaction={transaction} onClose={onClose} />

        <div
          className={getClasses(
            css.buttonsContainer,
            css.buttonsContainerMobile,
            css.buttonsContainerTablet,
            css.buttonsContainerDesktop
          )}
        >
          <button
            className={getClasses(
              css.cancelButton,
              css.cancelButtonMobile,
              css.cancelButtonTablet,
              css.cancelButtonDesktop
            )}
            onClick={onClose}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};
