import React from 'react';
import css from './StatisticsTable.module.css';

//const fakeData = [
//  { name: 'Main expenses', amount: 7600 },
//  { name: 'Products', amount: 6200 },
//  { name: 'Car', amount: 1600 },
//  { name: 'Self care', amount: 800 },
//  { name: 'Child care', amount: 2025 },
//  { name: 'Household products', amount: 300 },
//  { name: 'Education', amount: 4000 },
//  { name: 'Leisure', amount: 1200 },
//  { name: 'Other expenses', amount: 400 },
//];

const StatisticsTable = ({ income, expenses, expenseCategories = [], incomeCategories = [] }) => {
  //const expensesCategories = summary?.expenses?.categories || fakeData;   //[];
  //const expensesCategories = summary?.expense
  //  ? Object.entries(summary.expense).map(([name, amount]) => ({ name, amount }))
  //  : [];
  //useEffect(() => {
 //   onCategoriesChange(expensesCategories);
  // }, [summary, onCategoriesChange]);
  const formatCurrency = (value) => `₴ ${Number(value).toFixed(2)}`;

  const categoryColor = index => {
    const colors = ['#FED057', '#FFD8D0', '#FD9498', '#C5BAFF', '#6E78E8',
                    '#4A56E2', '#81E1FF', '#24CCA7', '#00AD84', '#D35400'];
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
          {[...expenseCategories.map(cat => ({ ...cat, type: 'expense' })), 
          ...incomeCategories.map(cat => ({ ...cat, type: 'income' }))]
          .sort((a, b) => b.amount - a.amount) // по убыванию суммы
          .map((item, index) => (
            <tr key={`${item.type}-${item.name}`}>
              <td className={css.restangle}>
                <span className={css.colorRes} style={{ backgroundColor: categoryColor(index) }} />
              </td>
              <td className={css.categoryName}>{item.name}</td>
              <td className={css.amount}>- {item.type === 'expense' ? '- ' : '+ '} 
                {formatCurrency(item.amount)}
              </td>                            
            </tr>
          ))           //вот ЗДЕСЬ нужно уточнить у тимлида в случае +/- может нужно будет потм убрать
          }
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

