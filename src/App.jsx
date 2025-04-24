import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import HomeTab from "./pages/HomeTab/HomeTab";
import StatisticsTab from "./pages/StatisticsTab/StatisticsTab";
import CurrencyTab from "./pages/CurrencyTab/CurrencyTab";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Loader from "./components/Loader/Loader";

const App = () => {
  return (
    <>
      {/* Loader компонент для отображения индикатора загрузки */}
      <Loader />

      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Публичные маршруты */}
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          {/* Приватные маршруты */}
          <Route path="dashboard" element={<DashboardPage />}>
            {/* Вложенные маршруты для dashboard */}
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<HomeTab />} />
            <Route path="statistics" element={<StatisticsTab />} />
            <Route path="currency" element={<CurrencyTab />} />
          </Route>

          {/* 404 страница */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
