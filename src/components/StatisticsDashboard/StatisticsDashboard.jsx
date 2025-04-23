import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTransactionStats } from '../../redux/statistics/operations';

import css from './StatisticsDashboard.module.css'


const months = ['All month', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const StatisticsDashboard = () => {
    const dispatch = useDispatch();
    const [month, setMonth] = useState(new Date().getMonth()+1);
  const [year, setYear] = useState(new Date().getFullYear());
  const years = Array.from({ length: 11 }, (_, i) => 2025 + i);


    useEffect(() => {
  const requestMonth = month === 0 ? null : month; 
  dispatch(fetchTransactionStats({ month: requestMonth, year }));
}, [month, year, dispatch]);


    return (
    <div className={css.wrapper}>
  <div className={css.selectWrapper}>
    <select
      className={css.select}
      value={month}
      onChange={(e) => setMonth(Number(e.target.value))}
    >
      {months.map((m, i) => (
        <option key={i} value={i}>{m}</option>
      ))}
    </select>
  </div>

  <div className={css.selectWrapper}>
    <select
      className={css.select}
      value={year}
      onChange={(e) => setYear(Number(e.target.value))}
    >
      {years.map((y) => (
        <option key={y} value={y}>{y}</option>
      ))}
    </select>
  </div>
</div>

  );

};

export default StatisticsDashboard;