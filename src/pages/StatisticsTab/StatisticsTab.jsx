import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSummary,
  fetchCategories,
} from "../../redux/transactions/operations";
import {
  selectTransactions,
  selectExpenseCategories,
  selectIncomeCategories,
  selectIsLoading,
  selectError
} from "../../redux/transactions/selectors";

import Chart from "../../components/Chart/Chart";
import StatisticsDashboard from "../../components/StatisticsDashboard/StatisticsDashboard";
import StatisticsTable from "../../components/StatisticsTable/StatisticsTable";
import Loader from "../../components/Loader/Loader"; 


import css from './StatisticsTab.module.css'

//const fakeData = {
//  expenses: {
//    categories: [
//      { name: 'Food', amount: 500 },
//      { name: 'Transport', amount: 200 },
//      { name: 'Entertainment', amount: 150 },
//      { name: 'Products', amount: 500 },
//      { name: 'Car', amount: 200 },
//      { name: 'Child care', amount: 150 },
//      { name: 'Food', amount: 500 },
//      { name: 'Transport', amount: 200 },
//      { name: 'Entertainment', amount: 150 },
//    ],
//  },
//};


const StatisticsTab = () => {
   const dispatch = useDispatch();

 
  const transactions = useSelector(selectTransactions);
  const expenseCategories = useSelector(selectExpenseCategories);
  const incomeCategories = useSelector(selectIncomeCategories);


  //const balance = useSelector(selectBalance);
  // const month = useSelector(selectSelectedMonth) ?? new Date().getMonth() + 1;
  // const year = useSelector(selectSelectedYear) ?? new Date().getFullYear();
 
  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  //const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];



  const now = new Date();
  const currentMonthIndex = now.getMonth(); //  (0-11)
  const currentYear = now.getFullYear(); 

  const [selectedMonth, setSelectedMonth] = useState(currentMonthIndex);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  


    useEffect(() => {
      const period = { month: selectedMonth + 1, year: selectedYear };
      dispatch(fetchSummary(period));
      dispatch(fetchCategories({ type: "EXPENSE", ...period }));
      dispatch(fetchCategories({ type: "INCOME", ...period }));
    }, [dispatch, selectedMonth, selectedYear]);
  
  const income = useMemo(() => {
    return transactions
      .filter((item) => item.type === "INCOME")
      .reduce((sum, item) => sum + item.amount, 0);
  }, [transactions]);

  const expenses = useMemo(() => {
    return transactions
      .filter((item) => item.type === "EXPENSE")
      .reduce((sum, item) => sum + item.amount, 0);
  }, [transactions]);


    const handleMonthChange = (monthIndex) => {
      setSelectedMonth(monthIndex);
    };

    const handleYearChange = year => {
        setSelectedYear(Number(year));
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
  
  // Преобразование категорий
   const expenseCategoriesData = expenseCategories && Array.isArray(expenseCategories)
    ? expenseCategories.map(([name, amount]) => ({
        name,
        amount,
        type: 'expense',
    }))
    : [];

  const incomeCategoriesData = incomeCategories && Array.isArray(incomeCategories)
    ? incomeCategories.map(([name, amount]) => ({
        name,
        amount,
        type: 'income',
    }))
    : [];



    
 
  return (
    <div className={css.statisticsTab}>
      <div>
        <h2 className={css.headerStat}>Statistics</h2>
        <div className={css.chartSection}>
          <Chart
            income={income}
            expenses={expenses}
            expenseCategories={expenseCategoriesData || []}

          />
        </div>
      </div>

      <div className={css.tableSection}>
         <div className={css.statisticsDashboard}>   
          <StatisticsDashboard
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            onMonthChange={handleMonthChange}
            onYearChange={handleYearChange} />
        </div>
       
        <StatisticsTable
          income={income}
          expenses={expenses}
          expenseCategories={expenseCategoriesData}
          incomeCategories={incomeCategoriesData}
        />
      </div>
    </div>

  )
};

export default StatisticsTab;   


  