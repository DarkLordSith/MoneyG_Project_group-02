import React from 'react';
import css from './StatisticsTable.module.css';

const StatisticsTable = ({ summary, categories, income, expenses }) => {
    const categoryNameId = id => {
        const category = categories.find(cat => cat.id === id);
        return category ? category.name : 'Unknown';
    };

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
                    {summary
                        .filter(item => item.type === 'EXPENSE')
                        .map((item, index) => {
                            const categoryName = categoryNameId(item.categoryId);
                            const color = categoryColor(index);

                            return (
                                <tr key={item.categoryId}>
                                    <td >
                                        <span style={{backgroundColor: color}} />
                                    </td>
                                    <td>{categoryName}</td>
                                    <td>{item.EXPENSE.toFixed(2)}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>

            <div >
                <span>Expenses:</span>
                <span>{expenses.toFixed(2)}</span>
            </div>
            <div>
                <span>Income:</span>
                <span>{income.toFixed(2)}</span>
            </div>
        </div>
    );
};
export default StatisticsTable;