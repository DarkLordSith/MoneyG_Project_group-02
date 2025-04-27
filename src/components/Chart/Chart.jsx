import React from "react";
import { Doughnut } from "react-chartjs-2";
import { motion } from "framer-motion";
import { Chart as ChartJS, ArcElement } from 'chart.js';


import css from './Chart.module.css';

ChartJS.register(ArcElement);

const Chart = ({ summary, balance }) => {
  const expensesCategories = summary?.expenses?.categories || [];

  const hasExpenses = expensesCategories.length > 0;

  const labels = hasExpenses
    ? expensesCategories.map(item => item.name)
    : ['No Data'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Expenses ₴',
        data: hasExpenses ? expensesCategories.map(item => item.amount) : [1],
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
      {hasExpenses ? (
        <>
          <Doughnut data={data} options={options} />
          <div className={css.chartCenter}>
            <span>₴ {balance ? balance.toFixed(2) : '0.00'}</span>
          </div>
        </>
      ) : (
        <motion.div
          className={css.noDataContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className={css.emptyText}>No expenses found</p>
        </motion.div>
      )}
    </div>
  );
};

export default Chart;

