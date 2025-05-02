import React from "react";
import { useSelector } from "react-redux";
import styles from "./Balance.module.css";
import { selectUser } from "../../redux/auth/selectors";

const Balance = () => {
  const user = useSelector(selectUser);

  return (
    <div className={styles.balanceWrapper}>
      <div className={styles.balanceContainer}>
        <p className={styles.balanceLabel}>YOUR BALANCE</p>
        <p className={styles.balanceAmount}>
          <span className={styles.balanceCurrency}>₴ </span>
          <span className={styles.balanceValue}>{user?.balance}</span>
        </p>
      </div>
    </div>
  );
};

export default Balance;
