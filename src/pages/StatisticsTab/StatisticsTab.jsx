import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chart from "../../components/Chart/Chart";
import StatisticsDashboard from "../../components/StatisticsDashboard/StatisticsDashboard";
import StatisticsTable from "../../components/StatisticsTable/StatisticsTable";
import { fetchStatistics, fetchCategories } from "../../redux/transactions/operations";
import { selectStatistics, selectCategories } from "../../redux/transactions/selectors";


import css from './StatisticsTab.module.css'

const StatisticsTab = () => {
  //const summary = useSelector(selectSummary);
  const dispatch = useDispatch();
  const summary = useSelector(selectStatistics);
  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchStatistics());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
    
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