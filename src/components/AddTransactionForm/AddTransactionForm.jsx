import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
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
  // Закоментовано, щоб уникнути помилки
  const dispatch = useDispatch();

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
      type: transactionType || "expense", // Використовуємо переданий тип або "expense" за замовчуванням
      sum: 0,
      date: new Date(),
      category: "",
      comment: "",
    },
  });

  // Встановлюємо тип транзакції при отриманні нових пропсів
  React.useEffect(() => {
    if (transactionType) {
      setValue("type", transactionType);
    }
  }, [transactionType, setValue]);

  const type = watch("type");
  const selectedDate = watch("date");

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        date: new Date(data.date).toISOString(), // Формат для бекенду
        category: data.type === "income" ? "Incomes" : data.category,
      };
      console.log("Що відправляється:", payload);
      await dispatch(addTransaction(payload)).unwrap();
      console.log("Відправлені дані:", payload);

      closeModal(); // Закрити модалку після успіху
    } catch (error) {
      console.error("Помилка при додаванні транзакції:", error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {/* Приховуємо радіо кнопки */}
      <input type="hidden" {...register("type")} value={type} />

      {/* Поле для вибору категорії (тільки для типу "витрати") */}
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
          {errors.category && (
            <p className={styles.error}>{errors.category.message}</p>
          )}
        </div>
      )}

      {/* Строка с суммой и датой */}
      <div className={styles.inputRow}>
        {/* Поле для введення суми */}
        <div className={styles.field}>
          <input
            type="number"
            placeholder="0.00"
            step="0.01"
            {...register("sum")}
          />
          {errors.sum && <p className={styles.error}>{errors.sum.message}</p>}
        </div>

        {/* Поле для вибору дати */}
        <div className={styles.field}>
          <div className={styles.datePickerWrapper}>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setValue("date", date)}
              dateFormat="dd.MM.yyyy"
              className={styles.datePicker}
            />
            <svg
              className={styles.calendarIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          {errors.date && <p className={styles.error}>{errors.date.message}</p>}
        </div>
      </div>

      {/* Поле для введення коментаря */}
      <div className={styles.field}>
        <input type="text" placeholder="Comment" {...register("comment")} />
        {errors.comment && (
          <p className={styles.error}>{errors.comment.message}</p>
        )}
      </div>

      {/* Кнопка для додавання транзакції */}
      <div className={styles.buttonsContainer}>
        <button type="submit" className={styles.submitButton}>
          ADD
        </button>
      </div>
    </form>
  );
};

export default AddTransactionForm;
