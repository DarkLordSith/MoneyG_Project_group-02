// src/pages/DashboardPage/DashboardPage.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import useMedia from "../../hooks/useMedia";

// Компоненти
import Loader from "../../components/Loader/Loader";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import Balance from "../../components/Balance/Balance";
import Currency from "../../components/Currency/Currency";
import ModalLogOut from "../../components/ModalLogOut/ModalLogOut";

// Операції
import { logout } from "../../redux/auth/operations";
import { fetchBalance } from "../../redux/finance/operations";

import styles from "./DashboardPage.module.css";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Отримуємо дані про авторизацію для перевірки перед запитом балансу
  const { token, isLoggedIn } = useSelector((state) => state.auth);

  // Стани
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Використовуємо кастомний хук для медіа-запитів
  const { isMobile, isDesktop, isTablet } = useMedia();

  // Автоматично отримуємо баланс при завантаженні сторінки
  useEffect(() => {
    if (isLoggedIn && token) {
      dispatch(fetchBalance());
    }
  }, [dispatch, isLoggedIn, token]);

  // Обробники подій
  const handleOpenLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const handleCloseLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await dispatch(logout()).unwrap();
      handleCloseLogoutModal();
      navigate("/login");
    } catch (error) {
      console.error("Помилка при виході з системи:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      {isLoading && <Loader />}
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

      <div
        className={`${styles.backgroundElements} ${isMobile ? styles.mobileBg : isTablet ? styles.tabletBg : styles.desktopBg}`}
      >
        {/* Фонові зображення */}
      </div>

      <div className={styles.dashboardPage}>
        <div className={styles.header}>
          <Header onLogout={handleOpenLogoutModal} />
        </div>

        <div className={styles.contentWrapper}>
          {/* Мобільна версія */}
          {isMobile && (
            <div className={styles.sidebar}>
              <div className={styles.navigation}>
                <Navigation />
              </div>
              <div className={styles.balance}>
                <Balance />
              </div>
            </div>
          )}

          {/* Планшетна версія */}
          {isTablet && (
            <div className={styles.tabletLayout}>
              <div className={styles.tabletTopSection}>
                <div className={styles.navigationBalanceGroup}>
                  <div className={styles.navigation}>
                    <Navigation />
                  </div>
                  <div className={styles.balance}>
                    <Balance />
                  </div>
                </div>
                <div className={styles.currency}>
                  <Currency />
                </div>
              </div>
            </div>
          )}

          {/* Десктопна версія */}
          {isDesktop && (
            <>
              <div className={styles.sidebar}>
                <div className={styles.dashboardData}>
                  <div className={styles.navigation}>
                    <Navigation />
                  </div>
                  <div className={styles.balance}>
                    <Balance />
                  </div>
                  <div className={styles.currency}>
                    <Currency />
                  </div>
                </div>
              </div>
              <div className={styles.divider}></div>
            </>
          )}

          <div className={styles.mainContent}>
            <Outlet />
          </div>
        </div>
      </div>

      {isLogoutModalOpen && (
        <ModalLogOut
          isOpen={isLogoutModalOpen}
          onClose={handleCloseLogoutModal}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default DashboardPage;
