import React from 'react';
import css from './StatisticsTable.module.css';

const StatisticsTable = ({ summary, income, expenses }) => {
  const expensesCategories = summary?.expenses?.categories || [];

  const categoryColor = index => {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#8E44AD', '#2ECC71', '#F39C12', '#E74C3C', '#3498DB', '#1ABC9C', '#D35400'];
    return colors[index % colors.length];
  };

  return (
    <div className={css.tableStat}>
      <div className={css.tableHeader}>
        <span>Category</span>
        <span>Sum</span>
      </div>
      <table className={css.notesStat}>
        <tbody>
          {expensesCategories.map((item, index) => (
            <tr key={item.name}>
              <td className={css.restangle}>
                <span className={css.colorRes} style={{ backgroundColor: categoryColor(index) }} />
              </td>
              <td>{item.name}</td>
              <td>{item.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={css.reseme}>
        <div className={css.expenses}>
          <span className={css.title}>Expenses:</span>
          <span className={css.total}>{expenses.toFixed(2)}</span>
        </div>
        <div className={css.income}>
          <span className={css.title}>Income:</span>
          <span className={css.total}>{income.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default StatisticsTable;
