// src/components/Balance/Balance.jsx
import React from "react";
import { useSelector } from "react-redux";
// НОВИЙ ІМПОРТ - селектор для отримання балансу з Redux store
import { selectTotalBalance } from "../../redux/finance/selectors";
import styles from "./Balance.module.css";

const Balance = () => {
  // ЗМІНЕНО - тепер використовуємо селектор замість прямого доступу до state
  // Раніше було: const balance = useSelector((state) => state.finance?.totalBalance || "0.00");
  // Тепер: використовуємо окремий селектор для кращої архітектури
  const balance = useSelector(selectTotalBalance);

  // ІСНУЮЧА ЛОГІКА - форматування балансу для відображення
  // Перетворюємо число в рядок з двома знаками після коми
  const formattedBalance = balance ? balance.toFixed(2) : "0.00";

  // ІСНУЮЧА СТРУКТУРА - компонент для відображення балансу
  return (
    <div className={styles.balanceWrapper}>
      <div className={styles.balanceContainer}>
        <p className={styles.balanceLabel}>YOUR BALANCE</p>
        <p className={styles.balanceAmount}>
          <span className={styles.balanceCurrency}>₴ </span>
          {/* ВИКОРИСТАННЯ ВІДФОРМАТОВАНОГО БАЛАНСУ - відображаємо значення з Redux */}
          <span className={styles.balanceValue}>{formattedBalance}</span>
        </p>
      </div>
    </div>
  );
};

export default Balance;
