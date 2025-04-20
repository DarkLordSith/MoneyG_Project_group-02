// src/components/Header/Header.jsx
import React from "react";
// import { useSelector } from 'react-redux';
import styles from "./Header.module.css";

const Header = ({ onLogout }) => {
  // Здесь будет логика получения имени пользователя из Redux store
  // В тестовой версии используем заглушку
  const email = "user@example.com"; // Это будет заменено на реальное значение из Redux
  const userName = email.split("@")[0]; // Берем часть email до @

  // Обработчик для кнопки выхода
  const handleExit = () => {
    // Вызываем колбэк из props
    onLogout();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Логотип и название */}
        <div className={styles.logoWrapper}>
          <div className={styles.logoContainer}>
            {/* SVG логотип Money Guard */}
            <svg
              width="19"
              height="23"
              viewBox="0 0 19 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.0684 3.08869C12.4051 2.69093 10.7418 1.89542 9.49425 0.702148C8.24674 1.89542 6.58339 2.69093 4.92004 3.08869C5.33588 6.6685 6.58339 9.05504 9.49425 11.0438C12.4051 9.05504 14.0684 6.6685 14.0684 3.08869Z"
                fill="#FFB627"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.405 17.8989L0.761597 4.77295V11.1371L9.91 21.081L12.405 17.8989Z"
                fill="#FBFBFB"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.6528 16.7058L18.6428 11.1372V5.1709L10.7419 13.9215L13.6528 16.7058Z"
                fill="#FBFBFB"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.0686 18.6948V22.2746L18.6428 17.1037V13.5239L14.0686 18.6948Z"
                fill="#FBFBFB"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.3358 18.6948L0.761597 13.5239V17.1037L5.3358 22.2746V18.6948Z"
                fill="#FBFBFB"
              />
            </svg>
          </div>
          <h1 className={styles.title}>Money Guard</h1>
        </div>

        {/* Имя пользователя и кнопка выхода */}
        <div className={styles.userSection}>
          <span className={styles.userName}>{userName}</span>
          <div className={styles.divider}></div>
          <button
            type="button"
            className={styles.exitButton}
            onClick={handleExit}
          >
            {/* Иконка выхода */}
            <span className={styles.exitIcon}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_53_345)">
                  <path
                    d="M11.2788 13.0708H12.6844V15.8818C12.6844 17.0443 11.7386 17.99 10.5761 17.99H2.10814C0.945786 17.99 0 17.0443 0 15.8818V2.10814C0 0.945786 0.945786 0 2.10814 0H10.5761C11.7386 0 12.6844 0.945786 12.6844 2.10814V4.91913H11.2788V2.10814C11.2788 1.72073 10.9637 1.40543 10.5761 1.40543H2.10814C1.72073 1.40543 1.40543 1.72073 1.40543 2.10814V15.8818C1.40543 16.2692 1.72073 16.5845 2.10814 16.5845H10.5761C10.9637 16.5845 11.2788 16.2692 11.2788 15.8818V13.0708ZM14.6872 5.68213L13.6934 6.67598L15.3096 8.29234H6.21922V9.69777H15.3096L13.6934 11.314L14.6872 12.3078L18 8.99506L14.6872 5.68213Z"
                    fill="white"
                    fill-opacity="0.6"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_53_345">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>
            <span className={styles.exitText}>Exit</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
