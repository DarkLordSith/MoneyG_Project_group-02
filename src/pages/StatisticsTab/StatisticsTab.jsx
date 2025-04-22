import React from "react";
import Chart from "../../components/Chart/Chart";
import StatisticsDashboard from "../../components/StatisticsDashboard/StatisticsDashboard";
import StatisticsTable from "../../components/StatisticsTable/StatisticsTable";

import css from './StatisticsTab.module.css'

const StatisticsTab = () => {

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
    
    const expenses = summary;
    const income = 10000;
    const summary = [];
    const balance = income - expenses;


    return (
        <div className={css.statisticsTab}>
            <h2>Statistics</h2>
            <div><Chart summary={summary} categories={categories} balance={balance} /></div>
            <div><StatisticsDashboard /></div>
            <div><StatisticsTable summary={summary} categories={categories} income={income} expenses={expenses} /></div>


        </div>
    )



};
export default StatisticsTab;