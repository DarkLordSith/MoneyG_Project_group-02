import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTransactionStats } from '../../redux/statisticsSlice';

import css from './StatisticsDashboard.module.css'


const months = ['All month', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const StatisticsDashboard = () => {
    const dispatch = useDispatch();
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        dispatch(fetchTransactionStats({ month: month + 1, year }));
    }, [month, year, dispatch]);

    return (
    <div className={css.wrapper}>
      <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
        {months.map((m, i) => <option key={i} value={i}>{m}</option>)}
      </select>
      <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
        {[2022, 2023, 2024].map((y) => <option key={y} value={y}>{y}</option>)}
      </select>
    </div>
  );

};

export default StatisticsDashboard;