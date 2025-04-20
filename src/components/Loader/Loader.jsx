import React from "react";
import { useSelector } from "react-redux";
import styles from "./Loader.module.css";

const Loader = () => {
  // Получаем состояния загрузки из разных слайсов
  const authRefreshing = useSelector((state) => state.auth.isRefreshing);
  const transactionsLoading = useSelector(
    (state) => state.transactions.isLoading
  );

  // Если ни один из процессов не загружается, не рендерим лоадер
  const isLoading = authRefreshing || transactionsLoading;

  if (!isLoading) return null;

  return (
    <div className={styles.loaderBackdrop}>
      <div className={styles.loaderContainer}>
        <div className={styles.loader}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
