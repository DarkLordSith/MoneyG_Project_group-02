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
        {/* Фоновое изображение для десктоп/планшет будет добавлено через CSS */}
        {/* Фоновое изображение для мобильной версии будет добавлено через CSS */}

        <div className={styles.logoutLogoContainer}>
          <img
            src="/dashboard_images/dashboard.svg"
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
