import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement } from 'chart.js';
import css from './Chart.module.css';


ChartJS.register(ArcElement);

const Chart = ({ summary, categories, balance }) => {
  
    
    const expensesOnly = summary?.filter(item => item.type === 'EXPENSE') || [];
    const expenses = expensesOnly.length > 0;

    const labels = expenses
        ? expensesOnly.map(item => {
              const category = categories.find(cat => cat.id === item.categoryId);
              return category ? category.name : 'Unknown';
          })
        : ['No Data'];

    const data = {
        labels,
       datasets: [
      {
        label: 'Expenses ₴',
        data: expenses ? expensesOnly.map(item => item.EXPENSE) : [1],
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
          '#9966FF', '#FF9F40', '#8D6EFF', '#69F0AE',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        position: 'right',
      },
    },
  };

    return (
        <div className={css.chartContainer}>
            <Doughnut data={data} options={options} />
            <div className={css.chartCenter}> 
                {expenses ? (
                        <>
                            <span>₴ {balance ? balance.toFixed(2) : '0.00'}</span>
                        </>
                    ) :  (
                    <p className={css.emptyText}>No expenses</p>
                )}
            </div>
            
        </div>
            );
};



export default Chart;