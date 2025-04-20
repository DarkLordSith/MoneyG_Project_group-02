// src/pages/DashboardPage/DashboardPage.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useMediaQuery } from "react-responsive";

// Импорты компонентов
// import Loader from "../../components/Loader/Loader";
import Header from "../../components/Header/Header";
// import Navigation from '../../components/Navigation/Navigation';
// import Balance from '../../components/Balance/Balance';
// import Currency from '../../components/Currency/Currency';
import ModalLogOut from "../../components/ModalLogOut/ModalLogOut";
// import ModalEditTransaction from '../../components/ModalEditTransaction/ModalEditTransaction';
// import ModalAddTransaction from '../../components/ModalAddTransaction/ModalAddTransaction';
// import ButtonAddTransactions from '../../components/ButtonAddTransactions/ButtonAddTransactions';

// Импорт Redux операций (используем существующие)
import { logout } from "../../redux/auth/operations";

// Импорт стилей
import styles from "./DashboardPage.module.css";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Состояние для модальных окон
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  // Состояние для индикатора загрузки
  const [isLoading, setIsLoading] = useState(false);

  // Используем useMediaQuery для адаптивности
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isDesktop = useMediaQuery({ minWidth: 1280 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1279 });

  // Обработчик для открытия модального окна выхода
  const handleOpenLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  // Обработчик для закрытия модального окна выхода
  const handleCloseLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  // Функция для выхода из системы
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      // Используем существующую операцию logout
      await dispatch(logout()).unwrap();

      // После успешного выхода
      handleCloseLogoutModal();
      // Редирект на страницу логина
      navigate("/login");
    } catch (error) {
      // Обработка ошибки
      console.error("Ошибка при выходе из системы:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Индикатор загрузки */}
      {isLoading && <Loader />}

      {/* Toaster для уведомлений */}
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

      {/* Фоновые элементы для визуальных эффектов */}
      <div className={styles.backgroundElements}>
        <div className={styles.purpleGradient1}></div>
        <div className={styles.purpleGradient2}></div>
        <div className={styles.purpleGradient3}></div>
        <div className={styles.purpleGradient4}></div>
        <div className={styles.purpleGradient5}></div>
        {isMobile && <div className={styles.blueGlow}></div>}
      </div>

      <div className={styles.dashboardPage}>
        {/* Header - отображается на всех устройствах */}
        <div className={styles.header}>
          <Header onLogout={handleOpenLogoutModal} />
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.sidebar}>
            <div className={styles.dashboardData}>
              {/* Навигация */}
              <div className={styles.navigation}>
                {/* <Navigation /> */}
                <p>Navigation Placeholder</p>
              </div>

              {isTablet || isDesktop ? (
                <>
                  {/* Баланс - отображается на планшете и десктопе */}
                  <div className={styles.balance}>
                    {/* <Balance /> */}
                    <p>Balance Placeholder</p>
                  </div>

                  {/* Валюта - отображается на планшете и десктопе */}
                  <div className={styles.currency}>
                    {/* <Currency /> */}
                    <p>Currency Placeholder</p>
                  </div>
                </>
              ) : null}
            </div>
          </div>

          {/* Разделительная линия для десктопа */}
          {isDesktop && <div className={styles.divider}></div>}

          <div className={styles.mainContent}>
            {/* Плейсхолдер для дочерних компонентов */}
            <Outlet />

            {/* Кнопка добавления транзакций */}
            {/* <ButtonAddTransactions /> */}
          </div>
        </div>
      </div>

      {/* Модальное окно выхода */}
      {isLogoutModalOpen && (
        <ModalLogOut
          isOpen={isLogoutModalOpen}
          onClose={handleCloseLogoutModal}
          onLogout={handleLogout}
        />
      )}

      {/* Другие модальные окна */}
      {/* <ModalAddTransaction /> */}
      {/* <ModalEditTransaction /> */}
    </div>
  );
};

export default DashboardPage;
