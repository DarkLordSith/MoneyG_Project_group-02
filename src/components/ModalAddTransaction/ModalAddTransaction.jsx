// ModalAddTransaction.jsx;
import React, { useState, useEffect, useRef } from "react";
import { X, Calendar } from "lucide-react";
import styles from "./ModalAddTransaction.module.css";
import AddTransactionForm from "../AddTransactionForm/AddTransactionForm";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ModalAddTransaction = ({ closeModal }) => {
  const [isIncome, setIsIncome] = useState(true); // По умолчанию - "income" (как на скриншоте)
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [amount, setAmount] = useState("0.00");
  const [comment, setComment] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formError, setFormError] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [categorySelected, setCategorySelected] = useState("");
  const modalRef = useRef(null);

  // Категории расходов
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

  useEffect(() => {
    // Блокируем прокрутку body, когда модальное окно открыто
    document.body.style.overflow = "hidden";

    // Возвращаем прокрутку при закрытии модального окна
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const toggleTransactionType = () => {
    // Переключаем тип транзакции
    const newIsIncome = !isIncome;
    setIsIncome(newIsIncome);

    // Показываем форму расходов только если выбран тип "Expense"
    setShowExpenseForm(!newIsIncome);
  };

  // Обработчик клика на Income
  const handleIncomeClick = () => {
    setIsIncome(true);
    setShowExpenseForm(false);
  };

  // Обработчик клика на Expense
  const handleExpenseClick = () => {
    setIsIncome(false);
    setShowExpenseForm(true);
  };

  // Форматирование даты для отображения
  const formatDate = (date) => {
    if (!date) {
      return ""; // Или возвращаем какое-то значение по умолчанию
    }
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  // Открыть календарь только при клике на иконку
  const handleCalendarIconClick = () => {
    setIsCalendarOpen(true);
  };

  // Обработчик закрытия календаря
  const handleCalendarClose = () => {
    setIsCalendarOpen(false);
  };

  // Обработка добавления транзакции
  const handleAddTransaction = () => {
    // Проверка заполнения всех обязательных полей
    if (
      !amount ||
      amount === "0.00" ||
      !comment ||
      (!isIncome && !categorySelected)
    ) {
      setFormError("All fields are required!");
      return;
    }

    // Здесь можно добавить логику сохранения транзакции
    console.log({
      type: isIncome ? "income" : "expense",
      amount: parseFloat(amount),
      date: selectedDate,
      category: !isIncome ? categorySelected : null,
      comment,
    });

    // Закрываем модальное окно
    closeModal();
  };

  return (
    <div
      className={styles.modalOverlay}
      onClick={handleBackdropClick}
      ref={modalRef}
    >
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Фон модального окна */}
        <div className={styles.modalBackground}></div>

        {/* Кнопка закрытия */}
        <div className={styles.closeButton}>
          <button onClick={closeModal}>
            <X className={styles.closeIcon} />
          </button>
        </div>

        {/* Заголовок */}
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>Add transaction</h2>
        </div>

        {/* Переключатель между доходом и расходом */}
        <div className={styles.toggleContainer}>
          <div className={styles.toggleWrapper}>
            <div
              className={`${styles.toggleOption} ${isIncome ? styles.activeOption : ""}`}
              onClick={handleIncomeClick}
              style={{ color: isIncome ? "#FFC107" : "#c4c4c4" }}
            >
              Income
            </div>

            <div
              className={styles.toggleSwitch}
              onClick={toggleTransactionType}
            >
              <div
                className={`${styles.toggleSlider} ${isIncome ? "" : styles.sliderRight}`}
              ></div>
            </div>

            <div
              className={`${styles.toggleOption} ${!isIncome ? styles.activeOption : ""}`}
              onClick={handleExpenseClick}
              style={{ color: !isIncome ? "#FF6596" : "#c4c4c4" }}
            >
              Expense
            </div>
          </div>
        </div>

        {/* Проверяем, показывать ли внешнюю форму или встроенную форму */}
        {!isIncome && showExpenseForm ? (
          // Форма для Expense (внешний компонент)
          <AddTransactionForm
            closeModal={closeModal}
            transactionType="expense"
          />
        ) : (
          // Встроенная форма
          <div>
            {/* Поле выбора категории (только для Expense) */}
            {!isIncome && (
              <div className={styles.selectCategoryContainer}>
                <select
                  className={styles.categorySelect}
                  onChange={(e) => setCategorySelected(e.target.value)}
                  value={categorySelected}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <div className={styles.inputUnderline}></div>
              </div>
            )}

            {/* Поле для суммы */}
            <div className={styles.inputRowContainer}>
              <div className={styles.inputWrapper}>
                <input
                  type="number"
                  className={styles.amountInput}
                  placeholder="0.00"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  // Отключаем колесико мыши для input-number
                  onWheel={(e) => e.target.blur()}
                />
                <div className={styles.inputUnderline}></div>
              </div>

              {/* Поле для даты с DatePicker */}
              <div className={styles.inputWrapper}>
                <div className={styles.dateInputContainer}>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);
                      // Не закрываем календарь, если он не был открыт через иконку
                      if (!isCalendarOpen) {
                        return;
                      }
                      setIsCalendarOpen(false);
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
                        // Предотвращаем открытие календаря при клике на поле даты
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
                </div>
              </div>
            </div>

            {/* Поле для комментария */}
            <div className={styles.commentContainer}>
              <input
                type="text"
                className={`${styles.commentInput} ${formError ? styles.errorInput : ""}`}
                placeholder={formError || "Comment"}
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                  if (formError) setFormError("");
                }}
              />
              <div className={styles.inputUnderline}></div>
            </div>

            {/* Кнопки действий */}
            <div className={styles.buttonsContainer}>
              <button
                className={styles.addButton}
                onClick={handleAddTransaction}
              >
                ADD
              </button>
              <button className={styles.cancelButton} onClick={closeModal}>
                CANCEL
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalAddTransaction;
