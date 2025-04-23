import React from "react";
import Chart from "../../components/Chart/Chart";
import StatisticsDashboard from "../../components/StatisticsDashboard/StatisticsDashboard";
import StatisticsTable from "../../components/StatisticsTable/StatisticsTable";

//import { useSelector } from "react-redux";
//import { selectCategories, selectSummary } from "../../redux/statistics/selectors";

import css from './StatisticsTab.module.css'



const StatisticsTab = () => {
  //const summary = useSelector(selectSummary);
  //const categories = useSelector(selectCategories);


     const categories = [
        { id: '1', name: 'Main expenses' },
        { id: '2', name: 'Products' },
        { id: '3', name: 'Car' },
        { id: '4', name: 'Self care' },
        { id: '5', name: 'Child care' },
        { id: '6', name: 'Household products' },
        { id: '7', name: 'Education' },
        { id: '8', name: 'Leisure' },
        { id: '9', name: 'Other expenses' },
    ];

    const summary = [
  { categoryId: '1', type: 'EXPENSE', EXPENSE: 3200 },
  { categoryId: '2', type: 'EXPENSE', EXPENSE: 1800 },
  { categoryId: '3', type: 'EXPENSE', EXPENSE: 1000 },
  { categoryId: '4', type: 'EXPENSE', EXPENSE: 600 },
  { categoryId: '9', type: 'EXPENSE', EXPENSE: 450 },
  { categoryId: '10', type: 'INCOME', INCOME: 10000 },
];

    
    
    //const summary = [];
    //const income = 10000;
    //const expenses = 3500;
    //const balance = income - expenses;
 const income = summary.find(item => item.type === 'INCOME')?.INCOME || 0;
  const expenses = summary
    .filter(item => item.type === 'EXPENSE')
    .reduce((acc, item) => acc + item.EXPENSE, 0);
  const balance = income - expenses;

    return (
        <div className={css.statisticsTab}>
           <div className={css.chartSection}>
             <h2 className={css.headerStat}>Statistics</h2>
             <Chart summary={summary} categories={categories} balance={balance} />
             <StatisticsDashboard />
       </div>

  <div className={css.tableSection}>
    <StatisticsTable
      summary={summary}
      categories={categories}
      income={income}
      expenses={expenses}
    />
  </div>
</div>

    )



};
export default StatisticsTab;