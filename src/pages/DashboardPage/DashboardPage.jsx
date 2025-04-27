// DashboardPage.jsx;
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useMediaQuery } from "react-responsive";

// Компоненти
import Loader from "../../components/Loader/Loader";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import Balance from "../../components/Balance/Balance";
import ModalLogOut from "../../components/ModalLogOut/ModalLogOut";
import Currency from "../../components/Currency/Currency";
// import HomeTab from "../../components/HomeTab/HomeTab";
import StatisticsTab from "../StatisticsTab/StatisticsTab";
// import CurrencyTab from "../../components/CurrencyTab/CurrencyTab";
import TransactionList from "../../components/TransactionList/TransactionList";

// Операції
import { logout } from "../../redux/auth/operations";

import styles from "./DashboardPage.module.css";
import CurrencyTab from "../CurrencyTab/CurrencyTab";

const DashboardPage = () => {
  const dispatch = useDispatch();

  const { token, isLoggedIn } = useSelector((state) => state.auth);

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isDesktop = useMediaQuery({ minWidth: 1280 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1279 });

  // Зчитуємо шлях для рендерингу компоненту Balance в моб версії
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn && token) {
      // dispatch(fetchBalance());
    }
  }, [dispatch, isLoggedIn, token]);

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
    } catch (error) {
      console.error("Помилка при виході з системи:", error);
      toast.error("Помилка при виході з системи. Спробуйте ще раз.");
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
              {location.pathname === "/dashboard/home" && (
                <div className={styles.balance}>
                  <Balance />
                </div>
              )}
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
            <Routes>
              <Route index element={<Navigate to="home" />} />
              <Route path="home" element={<TransactionList />} />{" "}
              {/* TransactionList Замість <div>Home Tab (он в разработке)</div> */}
              <Route path="statistics" element={<StatisticsTab />} />
              {isMobile && <Route path="currency" element={<CurrencyTab />} />}
            </Routes>
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
