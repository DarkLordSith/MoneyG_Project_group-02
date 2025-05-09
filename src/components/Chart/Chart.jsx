import React from "react";
import { Doughnut } from "react-chartjs-2";
import { motion } from "framer-motion";
import { Chart as ChartJS, ArcElement } from 'chart.js';
import { getColorByCategory } from '../../utils/categoryColors';
import css from './Chart.module.css';

ChartJS.register(ArcElement);

const shadowPlugin = {
  id: 'shadowPlugin',
  beforeDraw: (chart) => {
    const ctx = chart.ctx;
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)'; 
    ctx.shadowBlur = 40;                      
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  },
  afterDraw: (chart) => {
    chart.ctx.restore();
  }
};

const Chart = ({
 // income = 0,
  expenses = 0,
  expenseCategories = [],
}) => {
  const hasExpenses = Array.isArray(expenseCategories) && expenseCategories.length > 0;

  const labels = hasExpenses
    ? expenseCategories.map(item => item.name)
    : ['No Data'];

  const amounts = hasExpenses
    ? expenseCategories.map(item => item.amount)
    : [1]; // иначе чарт не отрисуется
  
  const backgroundColor = hasExpenses
  ? expenseCategories.map(cat => getColorByCategory(cat.name))
  : ['#ccc'];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Expenses ₴',
        data: amounts,
        backgroundColor,
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

  //const safeIncome = isNaN(income) ? 0 : Number(income);
  const safeExpenses = isNaN(expenses) ? 0 : Number(expenses);
 // const balance = safeIncome - safeExpenses;

  return (
    <div className={css.chartContainer}>
      {hasExpenses ? (
        <>
          <Doughnut data={data} options={options} plugins={[shadowPlugin]} />
          <div className={css.chartCenter}>
            <span>{`₴ ${safeExpenses.toFixed(2)}`}</span>
          </div>
        </>
      ) : (
        <motion.div
          className={css.noDataContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className={css.emptyText}>Expenses not found</p>
        </motion.div>
      )}
    </div>
  );
};

export default Chart;


