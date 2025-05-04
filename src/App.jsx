import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { selectIsRefreshing } from "./redux/auth/selectors";
import { refreshUser, getCurrentUser } from "./redux/auth/operations";
import { getAuthToken } from "./utils/authToken";
// import { fetchTransactions } from "./redux/transactions/operations";

import Layout from "./components/Layout/Layout";
import Loader from "./components/Loader/Loader";
import RestrictedRoute from "./routes/RestrictedRoute";
import PrivateRoute from "./routes/PrivateRoute";

const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage/RegisterPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage/DashboardPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

const App = () => {
  const isRefreshing = useSelector(selectIsRefreshing);
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyAuth = async () => {
      const token = getAuthToken();

      if (!token) return;

      try {
        const refreshResult = await dispatch(refreshUser());
        if (refreshUser.rejected.match(refreshResult)) return;

        const currentResult = await dispatch(getCurrentUser());
        if (getCurrentUser.rejected.match(currentResult)) return;

        // await dispatch(fetchTransactions());
      } catch (error) {
        toast.error("Сессія недійсна. Увійдіть знову.", error);
      }
    };

    verifyAuth();
  }, [dispatch]);

  if (isRefreshing) return <Loader />; // Покажемо лоадер під час перевірки

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          path="/login"
          element={
            <RestrictedRoute>
              <LoginPage />
            </RestrictedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <RestrictedRoute>
              <RegisterPage />
            </RestrictedRoute>
          }
        />
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <PrivateRoute>
                <Navigate to="/dashboard" replace />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
