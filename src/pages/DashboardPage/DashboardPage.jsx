import React, { useState } from "react";
// import { useDispatch } from 'react-redux';
// import { Outlet } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
import { useMediaQuery } from "react-responsive";

// Импорты компонентов
// import Loader from '../../components/Loader/Loader';
import Header from "../../components/Header/Header";
// import Navigation from '../../components/Navigation/Navigation';
// import Balance from '../../components/Balance/Balance';
// import Currency from '../../components/Currency/Currency';
import ModalLogOut from "../../components/ModalLogOut/ModalLogOut";
// import ModalEditTransaction from '../../components/ModalEditTransaction/ModalEditTransaction';
// import ModalAddTransaction from '../../components/ModalAddTransaction/ModalAddTransaction';
// import ButtonAddTransactions from '../../components/ButtonAddTransactions/ButtonAddTransactions';

// Импорт стилей
import styles from "./DashboardPage.module.css";

const DashboardPage = () => {
  // Состояние для модального окна выхода
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Используем useMediaQuery для адаптивности
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isDesktop = useMediaQuery({ minWidth: 1280 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1279 });

  return (
    <div className={styles.dashboardContainer}>
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
        <Header onLogout={() => setIsLogoutModalOpen(true)} />

        <div className={styles.dashboard}>
          <div className={styles.dashboardData}>
            {/* Навигация */}
            <div className={styles.navigation}>{/* <Navigation /> */}</div>

            {isTablet || isDesktop ? (
              <>
                {/* Баланс - отображается на планшете и десктопе */}
                <div className={styles.balance}>{/* <Balance /> */}</div>

                {/* Валюта - отображается на планшете и десктопе */}
                <div className={styles.currency}>{/* <Currency /> */}</div>
              </>
            ) : null}
          </div>

          {/* Разделительная линия для десктопа */}
          {isDesktop && <div className={styles.divider}></div>}

          <div className={styles.mainContent}>
            <h2>DashboardPage Content</h2>
            {/* <Outlet /> */}
          </div>
        </div>
      </div>

      {/* Модальное окно выхода */}
      <ModalLogOut
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      />
    </div>
  );
};

export default DashboardPage;
