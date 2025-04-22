// src/pages/DashboardPage/DashboardPage.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useMediaQuery } from "react-responsive";

// Импорты компонентов
import Loader from "../../components/Loader/Loader";
import Header from "../../components/Header/Header";
// import Navigation from '../../components/Navigation/Navigation';
import Balance from "../../components/Balance/Balance";
// import Currency from '../../components/Currency/Currency';
import ModalLogOut from "../../components/ModalLogOut/ModalLogOut";
// import ModalEditTransaction from '../../components/ModalEditTransaction/ModalEditTransaction';
// import ModalAddTransaction from '../../components/ModalAddTransaction/ModalAddTransaction';
// import ButtonAddTransactions from '../../components/ButtonAddTransactions/ButtonAddTransactions';

// Імпорт Redux операцій
import { logout } from "../../redux/auth/operations";

// Імпорт стилів
import styles from "./DashboardPage.module.css";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Стани
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Медіа-запити
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isDesktop = useMediaQuery({ minWidth: 1280 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1279 });

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

      <div className={styles.backgroundElements}>
        <div className={styles.purpleGradient1}></div>
        <div className={styles.purpleGradient2}></div>
        <div className={styles.purpleGradient3}></div>
        <div className={styles.purpleGradient4}></div>
        <div className={styles.purpleGradient5}></div>
        {isMobile && <div className={styles.blueGlow}></div>}
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
                <p>Navigation</p>
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
                    <p>Navigation</p>
                  </div>
                  <div className={styles.balance}>
                    <Balance />
                  </div>
                </div>
                <div className={styles.currency}>
                  <p>Currency</p>
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
                    <p>Navigation</p>
                  </div>
                  <div className={styles.balance}>
                    <Balance />
                  </div>
                  <div className={styles.currency}>
                    <p>Currency</p>
                  </div>
                </div>
              </div>
              <div className={styles.divider}></div>
            </>
          )}

          <div className={styles.mainContent}>
            <p>Table content</p>
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
