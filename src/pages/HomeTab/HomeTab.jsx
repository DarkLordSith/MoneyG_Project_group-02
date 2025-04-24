import React from "react";
import TransactionList from "../../components/TransactionList/TransactionList";
import ButtonAddTransactions from "../../components/ButtonAddTransactions/ButtonAddTransactions";
import styles from "./HomeTab.module.css";

const HomeTab = () => {
  return (
    <div className={styles.homeTab}>
      <TransactionList />
      <div className={styles.addButtonContainer}>
        <ButtonAddTransactions />
      </div>
    </div>
  );
};

export default HomeTab;
