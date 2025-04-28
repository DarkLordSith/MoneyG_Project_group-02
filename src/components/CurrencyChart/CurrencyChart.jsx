import React from "react";
import css from "./CurrencyChart.module.css";

const CurrencyChart = ({ currencyRates }) => (
  <table className={css.table}>
    <thead className={css.thead}>
      <tr className={css.mainRow}>
        <th className={css.th}>Currency</th>
        <th className={css.th}>Purchase</th>
        <th className={css.th}>Sale</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className={css.td}>USD</td>
        <td className={css.td}>
          {currencyRates.usd?.rateBuy.toFixed(2) || "-"}
        </td>
        <td className={css.td}>
          {currencyRates.usd?.rateSell.toFixed(2) || "-"}
        </td>
      </tr>
      <tr>
        <td className={css.td}>EUR</td>
        <td className={css.td}>
          {currencyRates.eur?.rateBuy.toFixed(2) || "-"}
        </td>
        <td className={css.td}>
          {currencyRates.eur?.rateSell.toFixed(2) || "-"}
        </td>
      </tr>
    </tbody>
  </table>
);

export default CurrencyChart;
