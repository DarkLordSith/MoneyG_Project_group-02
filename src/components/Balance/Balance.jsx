import React from "react";
import { useSelector } from "react-redux";
import styles from "./Balance.module.css";
import { selectUser } from "../../redux/auth/selectors";

const Balance = () => {
  const user = useSelector(selectUser);
  const balanceFromTransactions = useSelector(
    (state) => state.transactions.summary.balance
  );

  const balance =
    balanceFromTransactions !== 0
      ? balanceFromTransactions
      : (user?.balance ?? 0);
  return (
    <div className={styles.balanceWrapper}>
      <div className={styles.balanceContainer}>
        <p className={styles.balanceLabel}>YOUR BALANCE</p>
        <p className={styles.balanceAmount}>
          <span className={styles.balanceCurrency}>₴ </span>
          <span className={styles.balanceValue}>
            {Number(balance).toFixed(2)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Balance;
