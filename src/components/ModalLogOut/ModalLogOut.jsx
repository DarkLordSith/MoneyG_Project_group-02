// src/components/ModalLogOut/ModalLogOut.jsx
import React, { useEffect } from "react";
import styles from "./ModalLogOut.module.css";

const ModalLogOut = ({ isOpen, onClose, onLogout }) => {
  // Обработка нажатия клавиши Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Блокируем прокрутку body при открытом модальном окне
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  // Если модальное окно не открыто, не рендерим его
  if (!isOpen) return null;

  // Функция подтверждения выхода
  const confirmLogout = () => {
    // Используем переданную функцию для логаута
    if (onLogout) {
      onLogout();
    } else {
      // Для совместимости со старым кодом
      onClose();
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.logoutModalContainer}>
        <div className={styles.logoutLogoContainer}>
          <svg
            width="28"
            height="35"
            viewBox="0 0 28 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.683 3.94514C18.1372 3.30829 15.5914 2.03458 13.6821 0.124023C11.7728 2.03458 9.22704 3.30829 6.68127 3.94514C7.31771 9.67683 9.22704 13.4979 13.6821 16.6822C18.1372 13.4979 20.683 9.67683 20.683 3.94514Z"
              fill="#FFC727"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.1367 27.6578L0.316406 6.6416V16.8313L14.3181 32.7526L18.1367 27.6578Z"
              fill="#FBFBFB"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.0463 25.7471L27.6836 16.8311V7.27832L15.5912 21.2891L20.0463 25.7471Z"
              fill="#FBFBFB"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.6827 28.9314V34.6631L27.6836 26.384V20.6523L20.6827 28.9314Z"
              fill="#FBFBFB"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.31725 28.9314L0.316406 20.6523V26.384L7.31725 34.6631V28.9314Z"
              fill="#FBFBFB"
            />
          </svg>
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
