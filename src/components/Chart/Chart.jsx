import React from "react";
import { Doughnut } from "react-chartjs-2";
import { motion } from "framer-motion";
import { Chart as ChartJS, ArcElement } from 'chart.js';
import css from './Chart.module.css';

ChartJS.register(ArcElement);

const shadowPlugin = {
  id: 'shadowPlugin',
  beforeDraw: (chart) => {
    const ctx = chart.ctx;
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)'; 
    ctx.shadowBlur = 40;                      
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  },
  afterDraw: (chart) => {
    chart.ctx.restore();
  }
};

const Chart = ({
  income = 0,
  expenses = 0,
  expenseCategories = [],
}) => {
  const hasExpenses = expenseCategories.length > 0;

  const labels = hasExpenses
    ? expenseCategories.map(item => item.name)
    : ['No Data'];

  const amounts = hasExpenses
    ? expenseCategories.map(item => item.amount)
    : [1]; // иначе чарт не отрисуется

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Expenses ₴',
        data: amounts,
        backgroundColor: [
          '#FED057', '#FFD8D0', '#FD9498', '#C5BAFF', '#6E78E8',
          '#4A56E2', '#81E1FF', '#24CCA7', '#00AD84', '#D35400'
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        position: 'right',
      },
      tooltip: {
        enabled: true,
      },
    },
    maintainAspectRatio: false,
  };

  const safeIncome = isNaN(income) ? 0 : Number(income);
  const safeExpenses = isNaN(expenses) ? 0 : Number(expenses);
  const balance = safeIncome - safeExpenses;

  return (
    <div className={css.chartContainer}>
      {hasExpenses ? (
        <>
          <Doughnut data={data} options={options} plugins={[shadowPlugin]} />
          <div className={css.chartCenter}>
            <span>{`₴ ${balance.toFixed(2)}`}</span>
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


