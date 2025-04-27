import React, { useEffect } from "react";
import styles from "./ModalLogOut.module.css";

const ModalLogOut = ({ isOpen, onClose, onLogout }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const confirmLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      onClose();
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.logoutModalContainer}>
        <div className={styles.logoutLogoContainer}>
          <img
            src="/MGlogo.svg"
            alt="Money Guard Logo"
            width="28"
            height="35"
            className={styles.logoutLogoIcon}
          />
          <h2 className={styles.logoutLogoText}>Money Guard</h2>
        </div>

        <p className={styles.logoutConfirmMessage}>
          Are you sure you want to log out?
        </p>

        <div className={styles.logoutButtonContainer}>
          <button
            type="button"
            className={styles.logoutButton}
            onClick={confirmLogout}
          >
            LOGOUT
          </button>
          <button
            type="button"
            className={styles.cancelLogoutButton}
            onClick={onClose}
          >
            CANCEL
          </button>
        </div>
      </div>
      {/* Backdrop */}
      <div className={styles.backdrop} onClick={onClose}></div>
    </div>
  );
};

export default ModalLogOut;
