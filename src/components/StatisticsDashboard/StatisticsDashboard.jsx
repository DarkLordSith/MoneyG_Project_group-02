import React, { useEffect, useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import { fetchTransactionStats } from '../../redux/statistics/operations';
import css from './StatisticsDashboard.module.css';

const months = ['All month', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const years = Array.from({ length: 11 }, (_, i) => 2025 + i);

const StatisticsDashboard = () => {
  const dispatch = useDispatch();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    dispatch(fetchTransactionStats({ month: selectedMonth === 0 ? null : selectedMonth, year: selectedYear }));
  }, [selectedMonth, selectedYear, dispatch]);

  return (
    <div className={css.wrapper}>
      {/* Month Listbox */}
      <div className={css.selectWrapper}>
        <Listbox value={selectedMonth} onChange={setSelectedMonth}>
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
        <Listbox value={selectedYear} onChange={setSelectedYear}>
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
