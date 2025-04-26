import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedMonth,
  setSelectedYear,
} from "../../redux/transactions/slice";
import {
  selectSelectedMonth,
  selectSelectedYear,
} from "../../redux/transactions/selectors";

import css from './StatisticsDashboard.module.css';

const months = ['All month', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 11 }, (_, i) => currentYear + i);

const StatisticsDashboard = () => {
  const dispatch = useDispatch();
  const selectedMonth = useSelector(selectSelectedMonth) ?? 0;
  const selectedYear = useSelector(selectSelectedYear) ?? currentYear;

  const handleMonthChange = (monthIndex) => {
    dispatch(setSelectedMonth(monthIndex === 0 ? null : monthIndex));
  };

  const handleYearChange = (year) => {
    dispatch(setSelectedYear(year));
  };

  return (
    <div className={css.wrapper}>
      {/* Month Listbox */}
      <div className={css.selectWrapper}>
        <Listbox value={selectedMonth} onChange={handleMonthChange}>
          <div className={css.listboxContainer}>
            <Listbox.Button className={css.select}>
              <span>{months[selectedMonth]}</span>
              
            </Listbox.Button>
            <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <Listbox.Options className={css.dropdown}>
                {months.map((month, index) => (
                  <Listbox.Option key={index} value={index} className={({ active, selected }) =>
    `${css.option} ${active ? css.optionActive : ''} ${selected ? css.optionSelected : ''}`}>
                    {month}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>

      {/* Year Listbox */}
      <div className={css.selectWrapper}>
        <Listbox value={selectedYear} onChange={handleYearChange}>
          <div className={css.listboxContainer}>
            <Listbox.Button className={css.select}>
              <span>{selectedYear}</span>
              
            </Listbox.Button>
            <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <Listbox.Options className={css.dropdown}>
                {years.map((year, index) => (
                  <Listbox.Option key={index} value={year} className={({ active, selected }) =>
    `${css.option} ${active ? css.optionActive : ''} ${selected ? css.optionSelected : ''}`}>
                    {year}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </div>
  );
};

export default StatisticsDashboard;
