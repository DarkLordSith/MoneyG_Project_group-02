import React from 'react';
import css from './StatisticsTable.module.css';

const StatisticsTable = ({ income, expenses, expenseCategories = [], incomeCategories = [] }) => {
  const formatCurrency = (value) => {
    // Проверим на валидность значения
    if (isNaN(value)) return '₴ 0.00';
    return `₴ ${Number(value).toFixed(2)}`;
  };

  const categoryColor = index => {
    const colors = ['#FED057', '#FFD8D0', '#FD9498', '#C5BAFF', '#6E78E8',
                    '#4A56E2', '#81E1FF', '#24CCA7', '#00AD84', '#D35400'];
    return colors[index % colors.length];
  };

  // Объединяем расходы и доходы и сортируем по убыванию суммы
  const allCategories = [
    ...expenseCategories.map((cat, index) => ({
      ...cat,
      type: 'expense',
      id: `expense-${cat.name}-${index}`,
      amount: parseFloat(cat.amount) || 0, // Преобразуем в число и игнорируем NaN
    })),
    ...incomeCategories.map((cat, index) => ({
      ...cat,
      type: 'income',
      id: `income-${cat.name}-${index}`,
      amount: parseFloat(cat.amount) || 0, // Преобразуем в число и игнорируем NaN
    }))
  ];

  // Сортировка по убыванию суммы
  const sortedCategories = allCategories.sort((a, b) => b.amount - a.amount);

  return (
    <div className={css.tableStat}>
      <div className={css.tableHeader}>
        <span>Category</span>
        <span>Sum</span>
      </div>

      <table className={css.notesStat}>
        <tbody>
          {sortedCategories.map((item, index) => (
            <tr key={item.id}>
              <td className={css.restangle}>
                <span className={css.colorRes} style={{ backgroundColor: categoryColor(index) }} />
              </td>
              <td className={css.categoryName}>{item.name}</td>
              <td className={css.amount}>
                {item.type === 'expense' ? '- ' : '+ '}
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
            {formatCurrency(expenses ?? 0)}
          </span>
        </div>
        <div className={css.row}>
          <span className={css.label}>Income:</span>
          <span className={css.incomeTotal}>
            {formatCurrency(income ?? 0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatisticsTable;

