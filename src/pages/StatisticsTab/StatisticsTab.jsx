import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chart from "../../components/Chart/Chart";
import StatisticsDashboard from "../../components/StatisticsDashboard/StatisticsDashboard";
import StatisticsTable from "../../components/StatisticsTable/StatisticsTable";
import {
  fetchSummary,
  fetchCategories,
} from "../../redux/transactions/operations";
import {
  selectSummary,
  selectCategories,
  selectTotalIncome,
  selectTotalExpenses,
  selectBalance,
  selectSelectedMonth,
  selectSelectedYear,
} from "../../redux/transactions/selectors";


import css from './StatisticsTab.module.css'

const StatisticsTab = () => {
  const dispatch = useDispatch();

  const summary = useSelector(selectSummary);
  const categories = useSelector(selectCategories);
  const income = useSelector(selectTotalIncome);
  const expenses = useSelector(selectTotalExpenses);
  const balance = useSelector(selectBalance);
  const month = useSelector(selectSelectedMonth);
  const year = useSelector(selectSelectedYear);


   
  
   useEffect(() => {
    if (month !== null && year !== null) {
      dispatch(fetchSummary({ month, year }));
    }
   }, [dispatch, month, year]);
  
  useEffect(() => {
    if (month !== null && year !== null) {
      dispatch(fetchCategories({ month, year }));
    }
   }, [dispatch, month, year]);

    
 
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