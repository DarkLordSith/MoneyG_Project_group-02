import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import { Calendar } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./AddTransactionForm.module.css";

import { addTransaction } from "../../redux/transactions/operations";

// Схема валідації форми
const schema = yup.object().shape({
  type: yup.string().required("Оберіть тип транзакції"),
  sum: yup
    .number()
    .typeError("Сума має бути числом")
    .positive("Сума має бути додатньою")
    .required("Введіть суму"),
  date: yup.date().required("Оберіть дату"),
  category: yup.string().when("type", {
    is: "expense",
    then: () => yup.string().required("Оберіть категорію витрат"),
    otherwise: () => yup.string().nullable(),
  }),
  comment: yup.string().required("Введіть коментар"),
});

const AddTransactionForm = ({ closeModal, transactionType }) => {
  const dispatch = useDispatch();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Категорії транзакцій
  const categories = [
    "Main expenses",
    "Products",
    "Car",
    "Self care",
    "Child care",
    "Household products",
    "Education",
    "Leisure",
    "Other expenses",
  ];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      type: transactionType || "expense",
      sum: "",
      date: new Date(),
      category: "",
      comment: "",
    },
  });

  // Встановлюємо тип транзакції при отриманні нових пропсів
  useEffect(() => {
    if (transactionType) {
      setValue("type", transactionType);
    }
  }, [transactionType, setValue]);

  const type = watch("type");
  const selectedDate = watch("date");

  // Форматирование даты для отображения
  const formatDate = (date) => {
    if (!date) {
      return "";
    }
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  // Обработчик клика на иконку календаря
  const handleCalendarIconClick = () => {
    setIsCalendarOpen(true);
  };

  // Обработчик закрытия календаря
  const handleCalendarClose = () => {
    setIsCalendarOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        date: new Date(data.date).toISOString(),
        category: data.type === "income" ? "Incomes" : data.category,
      };
      console.log("Що відправляється:", payload);
      await dispatch(addTransaction(payload)).unwrap();
      console.log("Відправлені дані:", payload);

      closeModal();
    } catch (error) {
      console.error("Помилка при додаванні транзакції:", error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register("type")} value={type} />

      {/* Поле выбора категории (только для Expense) */}
      {type === "expense" && (
        <div className={styles.field}>
          <select {...register("category")}>
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <div className={styles.inputUnderline}></div>
          {errors.category && (
            <p className={styles.error}>{errors.category.message}</p>
          )}
        </div>
      )}

      {/* Поле для суммы и даты в одной строке */}
      <div
        className={styles.field}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div style={{ width: "45%" }}>
          <input
            type="number"
            placeholder="0.00"
            step="0.01"
            {...register("sum")}
          />
          <div className={styles.inputUnderline}></div>
          {errors.sum && <p className={styles.error}>{errors.sum.message}</p>}
        </div>

        <div style={{ width: "45%" }} className={styles.datePickerContainer}>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setValue("date", date);
              if (isCalendarOpen) {
                setIsCalendarOpen(false);
              }
            }}
            dateFormat="dd.MM.yyyy"
            open={isCalendarOpen}
            onCalendarClose={handleCalendarClose}
            customInput={
              <input
                type="text"
                className={styles.dateInput}
                value={formatDate(selectedDate)}
                readOnly
                onClick={(e) => e.preventDefault()}
              />
            }
            popperProps={{
              positionFixed: true,
            }}
          />
          <Calendar
            className={styles.calendarIcon}
            onClick={handleCalendarIconClick}
          />
          <div className={styles.inputUnderline}></div>
          {errors.date && <p className={styles.error}>{errors.date.message}</p>}
        </div>
      </div>

      {/* Поле для комментария */}
      <div className={styles.field}>
        <input
          type="text"
          placeholder="Comment"
          {...register("comment")}
          className={errors.comment ? styles.errorInput : ""}
        />
        <div className={styles.inputUnderline}></div>
        {errors.comment && (
          <p className={styles.error}>{errors.comment.message}</p>
        )}
      </div>

      {/* Кнопки действий */}
      <div className={styles.buttonsContainer}>
        <button type="submit" className={styles.submitButton}>
          ADD
        </button>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={closeModal}
        >
          CANCEL
        </button>
      </div>
    </form>
  );
};

export default AddTransactionForm;
