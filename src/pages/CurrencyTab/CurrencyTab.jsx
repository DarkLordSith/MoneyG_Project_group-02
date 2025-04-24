import React from "react";
import Currency from "../../components/Currency/Currency";
import styles from "./CurrencyTab.module.css";

const CurrencyTab = () => {
  return (
    <div className={styles.currencyTab}>
      <h1 className={styles.title}>Currency</h1>
      <Currency />
    </div>
  );
};

export default CurrencyTab;
