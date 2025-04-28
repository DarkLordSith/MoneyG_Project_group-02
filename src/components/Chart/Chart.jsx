import React, { useEffect, useState } from "react";
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

const Chart = ({ summary, income, expenses }) => {
  const [expensesCategories, setExpensesCategories] = useState([500, 200, 150, 200, 300, 100, 270, 320, 400]);

  useEffect(() => {
    if (summary?.expenses?.categories) {
      setExpensesCategories(summary.expenses.categories.map(item => item.amount));
    }
  }, [summary]);

  const hasExpenses = expensesCategories.length > 0;
  const labels = hasExpenses
    ? summary?.expenses?.categories?.map(item => item.name)  
    : ['No Data'];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Expenses ₴',
        data: expensesCategories,
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
    <div className={`${css.chartContainer}`}>
      {hasExpenses ? (
        <>
          <Doughnut data={data} options={options} plugins={[shadowPlugin]} />
          <div className={css.chartCenter}>
            <span>{balance !== 0 ? `₴ ${balance.toFixed(2)}` : '₴ 0.00'}</span>
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


