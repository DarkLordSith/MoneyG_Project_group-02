import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";

import css from './StatisticsDashboard.module.css';





const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const years = Array.from({ length: new Date().getFullYear() - 2020 + 1 }, (_, i) => `${2020 + i}`);

const StatisticsDashboard = ({ selectedMonth, selectedYear, onMonthChange, onYearChange }) => {
  
  

  return (
    <div className={css.wrapper}>
      {/* Month Listbox */}
      <div className={css.selectWrapper}>
        <Listbox value={selectedMonth} onChange={onMonthChange}>
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
        <Listbox value={selectedYear} onChange={onYearChange}>
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
