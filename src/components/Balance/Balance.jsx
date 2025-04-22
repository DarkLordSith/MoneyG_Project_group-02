// src/components/Balance/Balance.jsx
import React from "react";
import { useSelector } from "react-redux";
import styles from "./Balance.module.css";

const Balance = () => {
  // Отримуємо баланс з Redux store
  // Селектор вказує на шлях до балансу у Redux store
  const balance = useSelector((state) => state.finance?.totalBalance || "0.00");

  return (
    <div className={styles.balanceWrapper}>
      <div className={styles.balanceContainer}>
        <p className={styles.balanceLabel}>YOUR BALANCE</p>
        <p className={styles.balanceAmount}>
          <span className={styles.balanceCurrency}>₴ </span>
          <span className={styles.balanceValue}>{balance}</span>
        </p>
      </div>
    </div>
  );
};

export default Balance;
