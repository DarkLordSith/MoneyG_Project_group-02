import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chart from "../../components/Chart/Chart";
import StatisticsDashboard from "../../components/StatisticsDashboard/StatisticsDashboard";
import StatisticsTable from "../../components/StatisticsTable/StatisticsTable";
import {
//  fetchSummary,
//  fetchCategories,
} from "../../redux/transactions/operations";
import {
 // selectSummary,
 // selectTotalIncome,
 // selectTotalExpenses,
 // selectBalance,
 // selectSelectedMonth,
 // selectSelectedYear,
  selectIsLoading,
  selectError
} from "../../redux/transactions/selectors";


import css from './StatisticsTab.module.css'

const fakeData = {
  expenses: {
    categories: [
      { name: 'Food', amount: 500 },
      { name: 'Transport', amount: 200 },
      { name: 'Entertainment', amount: 150 },
    ],
  },
};

const StatisticsTab = ({ summary, income, expenses }) => {
 //  const dispatch = useDispatch();

  //const summary = useSelector(selectSummary);
  //const income = useSelector(selectTotalIncome);
  //const expenses = useSelector(selectTotalExpenses);
  //const balance = useSelector(selectBalance);
  // const month = useSelector(selectSelectedMonth) ?? new Date().getMonth() + 1;
  // const year = useSelector(selectSelectedYear) ?? new Date().getFullYear();
  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const now = new Date();
  const currentMonthIndex = now.getMonth(); // Индекс текущего месяца (0-11)
  const currentYear = now.getFullYear(); 

  const [selectedMonth, setSelectedMonth] = useState(currentMonthIndex);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [categoriesData, setCategoriesData] = useState([]); // для Chart
  const [balance, setBalance] = useState(income - expenses);
  


    useEffect(() => {
        fetchData(selectedMonth, selectedYear);
    }, [selectedMonth, selectedYear]);

    const fetchData = (monthIndex, year) => {
      if (monthIndex == null || !year) return;
       // ЗДЕСЬ ЗАПРОС НА СЕРВЕР ДЛЯ ПОЛУЧЕНИЯ ДАННЫХ ПО СТАТИСТИКЕ
      
       //const period = { month: monthIndex + 1, year: Number(year) };
      // dispatch(fetchSummary(period));

       // const yearNumber = Number(year);
       // const monthIndex = months.indexOf(monthName);

       // const period = monthName === 'All month' ? { year: yearNumber } : { month: monthIndex, year: yearNumber };

       
    };

    const handleMonthChange = (monthIndex) => {
      setSelectedMonth(monthIndex);
    };

    const handleYearChange = year => {
        setSelectedYear(Number(year));
  };
  
  const updateCategories = (categories) => {
    setCategoriesData(categories);
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
  

    
 
  return (
    <div className={css.statisticsTab}>
      <div>
        <h2 className={css.headerStat}>Statistics</h2>
        <div className={css.chartSection}>
          <Chart summary={summary} income={income} expenses={expenses} />
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
          summary={summary}
          income={income}
          expenses={expenses}
          onCategoriesChange={updateCategories}
        />
      </div>
    </div>

  )
};

export default StatisticsTab;   


  //ПОТОМ УБРАТЬ (оставила для себя, с чего все начиналось, с категориями)
//const StatisticsTab = () => {
//  const dispatch = useDispatch();

//  const summary = useSelector(selectSummary);
 // const categories = useSelector(selectCategories);
 // const income = useSelector(selectTotalIncome);
//  const expenses = useSelector(selectTotalExpenses);
//  const balance = useSelector(selectBalance);
//  const month = useSelector(selectSelectedMonth);
//  const year = useSelector(selectSelectedYear);
 // const loading = useSelector(selectIsLoading);
//  const error = useSelector(selectError);

//  useEffect(() => {
 //   if (month !== null && year !== null) {
//      dispatch(fetchSummary({ month, year }));
//      dispatch(fetchCategories({ month, year }));
 //   }
//  }, [dispatch, month, year]);

//  if (loading) {
//    return <div>Loading...</div>;
 // }

 // if (error) {
 //   return <div>Error: {error.message || "Unknown error occurred"}</div>;
 // }

//  if (!summary || !categories) {
 //   return <div>No data available</div>;
//  }

//  return (
//    <div className={css.statisticsTab}>
//      <div className={css.chartSection}>
 //       <h2 className={css.headerStat}>Statistics</h2>
//        <Chart summary={summary} categories={categories} balance={balance} />
//        <StatisticsDashboard income={income} expenses={expenses} balance={balance} />
//      </div>
//
//      <div className={css.tableSection}>
//        <StatisticsTable
//          summary={summary}
//          categories={categories}
//          income={income}
//          expenses={expenses}
//        />
//      </div>
//    </div>
//  );
//};


