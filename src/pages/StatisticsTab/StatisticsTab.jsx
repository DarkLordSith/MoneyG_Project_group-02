import React from "react";
// import Chart from "../../components/Chart/Chart";
// import StatisticsDashboard from "../../components/StatisticsDashboard/StatisticsDashboard";
// import StatisticsTable from "../../components/StatisticsTable/StatisticsTable";
import styles from "./StatisticsTab.module.css";

const StatisticsTab = () => {
  return (
    <div className={styles.statisticsTab}>
      <h1 className={styles.title}>Statistics</h1>
      <div className={styles.statisticsContent}>
        <div className={styles.chartWrapper}>
          {/* <Chart /> */}
          <p>Графік буде відображено тут</p>
        </div>
        <div className={styles.statsData}>
          {/* <StatisticsDashboard /> */}
          <p>Панель із ключовими показниками</p>
          {/* <StatisticsTable /> */}
          <p>Детальна таблиця статистики</p>
        </div>
      </div>
    </div>
  );
};

export default StatisticsTab;
