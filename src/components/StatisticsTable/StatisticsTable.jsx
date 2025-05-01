import React from 'react';
import { getColorByCategory } from '../../utils/categoryColors';

import css from './StatisticsTable.module.css';

const StatisticsTable = ({ income = 0, expenses = 0, incomeCategories = [], expenseCategories = [] }) => {
  const formatCurrency = (value) => {
    if (isNaN(value)) return '₴ 0.00';
    return `₴ ${Number(value).toFixed(2)}`;
  };

  // Просто объединяем уже отформатированные массивы
  const allCategories = [
    ...expenseCategories.map((item, index) => ({
      ...item,
      id: `expense-${item.name}-${index}`
    })),
    ...incomeCategories.map((item, index) => ({
      ...item,
      id: `income-${item.name}-${index}`
    }))
  ];

  const sortedCategories = allCategories
    .filter(cat => cat.amount > 0)
    .sort((a, b) => b.amount - a.amount);

  const hasData = sortedCategories.length > 0 || income > 0 || expenses > 0;

  if (!hasData) {
    return (
      <div className={css.tableStat}>
        <p className={css.noDataText}>No records available for the selected period</p>
      </div>
    );
  }

  return (
    <div className={css.tableStat}>
      <div className={css.tableHeader}>
        <span>Category</span>
        <span>Sum</span>
      </div>

      <table className={css.notesStat}>
        <tbody>
          {sortedCategories.map((item) => (
            <tr key={item.id}>
              <td className={css.restangle}>
                <span className={css.colorRes} style={{ backgroundColor: getColorByCategory(item.name) }} />
              </td>
              <td className={css.categoryName}>{item.name}</td>
              <td className={css.amount}>
                {formatCurrency(item.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={css.resume}>
        <div className={css.row}>
          <span className={css.label}>Expenses:</span>
          <span className={css.expensesTotal}>
            {formatCurrency(expenses)}
          </span>
        </div>
        <div className={css.row}>
          <span className={css.label}>Income:</span>
          <span className={css.incomeTotal}>
            {formatCurrency(income)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatisticsTable;

