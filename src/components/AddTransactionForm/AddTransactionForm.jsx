import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./AddTransactionForm.module.css";
import CustomSelect from "../CustomSelect/CustomSelect"; // Импорт нашего кастомного селекта

import { addTransaction } from "../../redux/transactions/operations";

// Схема валідації форми
const schema = yup.object().shape({
  type: yup.string().required("Select transaction type"),
  sum: yup
    .number()
    .typeError("Must be a number")
    .positive("The amount must be positive")
    .required("Enter the amount"),
  date: yup.date().required("Choose a date"),
  category: yup.string().when("type", {
    is: "expense",
    then: () => yup.string().required("Select an expense category"),
    otherwise: () => yup.string().nullable(),
  }),
  comment: yup.string().required("Enter a comment"),
});

const AddTransactionForm = ({ closeModal, transactionType }) => {
  // Добавляем определение медиа-запросов
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isDesktop = useMediaQuery({ minWidth: 1280 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1279 });

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
  const selectedCategory = watch("category");

  // Обработчик изменения категории в нашем кастомном селекте
  const handleCategoryChange = (event) => {
    setValue("category", event.target.value, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        date: new Date(data.date).toISOString(), // Формат для бекенду
        category: data.type === "income" ? "Incomes" : data.category,
      };

      await dispatch(addTransaction(payload)).unwrap();

      closeModal(); // Закрити модалку після успіху
    } catch (error) {
      console.error("Помилка при додаванні транзакції:", error);
    }
  };

  // Адаптивные стили на основе медиа-запросов
  const formClasses = `${styles.form} ${isMobile ? styles.formMobile : ""} ${isTablet ? styles.formTablet : ""} ${isDesktop ? styles.formDesktop : ""}`;

  const buttonContainerClasses = `${styles.buttonsContainer} ${isMobile ? styles.buttonsContainerMobile : ""}`;

  const buttonClasses = `${styles.submitButton} ${isMobile ? styles.submitButtonMobile : ""}`;

  return (
    <form className={formClasses} onSubmit={handleSubmit(onSubmit)}>
      {/* Приховуємо радіо кнопки */}
      <input type="hidden" {...register("type")} value={type} />

      {/* Поле для вибору категорії (тільки для типу "витрати") */}
      {type === "expense" && (
        <div className={styles.field}>
          {/* Заменяем стандартный select на наш кастомный компонент */}
          <CustomSelect
            options={categories}
            onChange={handleCategoryChange}
            placeholder="Select a category"
            value={selectedCategory}
            name="category"
          />
          {/* Скрытое поле для работы с react-hook-form */}
          <input
            type="hidden"
            {...register("category")}
            value={selectedCategory}
          />
          {errors.category && (
            <p className={styles.error}>{errors.category.message}</p>
          )}
        </div>
      )}

      {/* Изменяем структуру в зависимости от устройства */}
      <div
        className={`${styles.inputRow} ${isMobile ? styles.inputRowMobile : ""}`}
      >
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

      {/* Пустой контейнер для кнопок */}
      <div className={buttonContainerClasses}></div>

      {/* Кнопка вынесена за пределы контейнера и размещена под ним */}
      <button type="submit" className={buttonClasses}>
        ADD
      </button>
    </form>
  );
};

export default AddTransactionForm;
