import React from 'react';
//import scc from './StatisticsTable.module.css';

const StatisticsTable = ({ summary, categories, income, expenses }) => {
    const categoryNameId = id => {
        const category = categories.find(cat => cat.id === id);
        return category ? category.name : 'Unknown';
    };

    return (
        <div >
            <div >
                <span>Category</span>
                <span>Sum</span>
            </div>
            <table >
                <tbody>
                    {summary
                        .filter(item => item.type === 'EXPENSE')
                        .map((item) => {
                            const categoryName = categoryNameId(item.categoryId);
                            
                            return (
                                <tr key={item.categoryId}>
                                    <td >
                                        <span />
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