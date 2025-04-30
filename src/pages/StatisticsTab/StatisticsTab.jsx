import React, {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
 // fetchSummary,
  fetchCategories,
} from "../../redux/transactions/operations";
import {
  selectSummaryData,
} from "../../redux/transactions/selectors";

import Chart from "../../components/Chart/Chart";
import StatisticsDashboard from "../../components/StatisticsDashboard/StatisticsDashboard";
import StatisticsTable from "../../components/StatisticsTable/StatisticsTable";
import Loader from "../../components/Loader/Loader";

import css from './StatisticsTab.module.css';

const StatisticsTab = () => {
  const dispatch = useDispatch();

  const {
    income = {},
    expense = {},
    totalIncome,
    totalExpense,
 //   balance,
  } = useSelector(selectSummaryData);

  const loading = useSelector(state => state.transactions.loading);
  const error = useSelector(state => state.transactions.error);

  const now = new Date();
  const currentMonthIndex = now.getMonth();
  const currentYear = now.getFullYear();

  const [selectedMonth, setSelectedMonth] = useState(currentMonthIndex);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const fetchCategoriesData = (month, year) => {
  dispatch(fetchCategories({ month: month + 1, year }));
};


  //useEffect(() => {
 // //const period = { month: selectedMonth + 1, year: selectedYear };
  
  //// Запрос для получения категорий
  //dispatch(fetchCategories(period));
//}, [dispatch, selectedMonth, selectedYear]);


  const handleMonthChange = (monthIndex) => {
  setSelectedMonth(monthIndex);
  fetchCategoriesData(monthIndex, selectedYear);
};

const handleYearChange = (year) => {
  const numericYear = Number(year);
  setSelectedYear(numericYear);
  fetchCategoriesData(selectedMonth, numericYear);
};


  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className={css.statisticsTab}>
        <p className={css.error}>{error}</p>
      </div>
    );
  }

  const incomeCategoriesData = Object.entries(income).map(([name, amount]) => ({
    name,
    amount,
   
  }));

  const expenseCategoriesData = Object.entries(expense).map(([name, amount]) => ({
    name,
    amount,
   
  }));

  return (
    <div className={css.statisticsTab}>
      <div>
        <h2 className={css.headerStat}>Statistics</h2>
        <div className={css.chartSection}>
          <Chart
            income={totalIncome}
            expenses={totalExpense}
            expenseCategories={expenseCategoriesData}
          />
        </div>
      </div>

      <div className={css.tableSection}>
        <div className={css.statisticsDashboard}>
          <StatisticsDashboard
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            onMonthChange={handleMonthChange}
            onYearChange={handleYearChange}
          />
        </div>

        <StatisticsTable
          income={totalIncome}
          expenses={totalExpense}
          expenseCategories={expenseCategoriesData}
          incomeCategories={incomeCategoriesData}
        />
      </div>
    </div>
  );
};

export default StatisticsTab;



  