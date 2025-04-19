// src/pages/DashboardPage/DashboardPage.jsx
// import React, { useEffect } from "react";
// import { useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

// Закомментированные импорты компонентов
// import Header from '../../components/Header/Header';
// import Navigation from '../../components/Navigation/Navigation';
// import Balance from '../../components/Balance/Balance';
// import Currency from '../../components/Currency/Currency';
// import HomeTab from '../../components/HomeTab/HomeTab';
// import StatisticsTab from '../../components/StatisticsTab/StatisticsTab';
// import ButtonAddTransactions from '../../components/ButtonAddTransactions/ButtonAddTransactions';

// Закомментированные импорты операций Redux
// import { fetchUserData } from '../../redux/auth/operations';
// import { fetchTransactions } from '../../redux/transactions/operations';
// import { fetchCategories } from '../../redux/categories/operations';

// Импорт стилей
import styles from "./DashboardPage.module.css";

// Заглушки для компонентов
const Header = () => (
  <div
    style={{
      height: "60px",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      padding: "15px",
      margin: "10px",
      borderRadius: "8px",
    }}
  >
    Header Placeholder
  </div>
);
const Navigation = () => (
  <div style={{ padding: "10px", marginBottom: "10px" }}>
    Navigation Placeholder
  </div>
);
const Balance = () => (
  <div style={{ padding: "10px", marginBottom: "10px" }}>
    Balance Placeholder
  </div>
);
const Currency = () => (
  <div style={{ padding: "10px", marginBottom: "10px" }}>
    Currency Placeholder
  </div>
);
const HomeTab = () => (
  <div style={{ padding: "20px" }}>Home Tab Content Placeholder</div>
);
const StatisticsTab = () => (
  <div style={{ padding: "20px" }}>Statistics Tab Content Placeholder</div>
);
const ButtonAddTransactions = () => (
  <button
    style={{
      padding: "15px 25px",
      borderRadius: "50%",
      background: "linear-gradient(to right, #f3a952, #ca6b99)",
      border: "none",
      color: "white",
      fontSize: "24px",
      fontWeight: "bold",
    }}
  >
    +
  </button>
);

const DashboardPage = () => {
  // const dispatch = useDispatch();

  // Медиа-запиты для адаптивности
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1279 });
  const isDesktop = useMediaQuery({ minWidth: 1280 });

  // Закомментированный useEffect
  /*
  useEffect(() => {
    // Загрузка данных пользователя при монтировании компонента
    dispatch(fetchUserData());
    dispatch(fetchTransactions());
    dispatch(fetchCategories());
  }, [dispatch]);
  */

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

      {/* Header - отображается на всех устройствах */}
      <Header />

      <div className={styles.contentWrapper}>
        {/* Sidebar - отображается по-разному на разных устройствах */}
        <div className={styles.sidebar}>
          {/* Navigation - нав. меню с вкладками */}
          <Navigation />

          {/* Balance - компонент баланса */}
          <Balance />

          {/* Currency - компонент курса валют (не отображается на мобильных) */}
          {!isMobile && <Currency />}
        </div>

        {/* MainContent - главная область контента */}
        <div className={styles.mainContent}>
          {/* Заглушка вместо Routes для тестирования отображения */}
          <div>
            {isMobile && <div>Мобильная версия</div>}
            {isTablet && <div>Планшетная версия</div>}
            {isDesktop && <div>Десктопная версия</div>}
            <HomeTab />
          </div>

          {/* Закомментированные Routes
          <Routes>
            <Route path="home" element={<HomeTab />} />
            <Route path="statistics" element={<StatisticsTab />} />
            {isMobile && <Route path="currency" element={<Currency />} />}
            <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
          </Routes>
          */}
        </div>
      </div>

      {/* Кнопка добавления транзакций - плавающая кнопка внизу справа */}
      <div className={styles.addButton}>
        <ButtonAddTransactions />
      </div>
    </div>
  );
};

export default DashboardPage;
