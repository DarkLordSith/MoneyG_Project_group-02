import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import css from "./EditTransactionForm.module.css";
import { useDispatch } from "react-redux";
import { editTransaction } from "../../redux/transactions/operations";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  amount: yup
    .number()
    .typeError("Sum must be a number")
    .positive("Sum must be positive")
    .required("Sum is required"),
  date: yup.date().required("Date is required"),
  comment: yup.string().max(50, "Max 50 characters"),
});

export const EditTransactionForm = ({ transaction, onClose }) => {
  const dispatch = useDispatch();

  // Инициализация формы с использованием Controller для управляемых полей
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      amount: "",
      date: new Date(),
      comment: "",
    },
  });

  // Устанавливаем начальные значения из транзакции
  useEffect(() => {
    if (transaction) {
      // Проверяем, есть ли поле sum или amount и устанавливаем значение
      if (transaction.sum !== undefined) {
        setValue("amount", transaction.sum);
      } else if (transaction.amount !== undefined) {
        setValue("amount", transaction.amount);
      }

      // Устанавливаем дату
      if (transaction.date) {
        setValue("date", new Date(transaction.date));
      }

      // Устанавливаем комментарий
      if (transaction.comment !== undefined) {
        setValue("comment", transaction.comment);
      }
    }
  }, [transaction, setValue]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        sum: parseFloat(data.amount),
        type: transaction.type,
        category: transaction.category,
        comment: data.comment,
        date: new Date(data.date).toISOString(),
      };

      await dispatch(
        editTransaction({ id: transaction._id, body: payload })
      ).unwrap();

      toast.success("Transaction updated");
      onClose();
    } catch (err) {
      toast.error(err.message || "Error updating transaction");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.formContainer}>
      {/* Переключатель типа (Доход/Расход) */}
      <div className={css.typeToggle}>
        <p
          className={
            transaction?.type === "income" ? css.incomeActive : css.typeInactive
          }
        >
          Income
        </p>
        <span className={css.divider}>/</span>
        <p
          className={
            transaction?.type === "expense"
              ? css.expenseActive
              : css.typeInactive
          }
        >
          Expense
        </p>
      </div>

      {/* Категория транзакции */}
      <div className={css.categorySelect}>
        <span className={css.categoryValue}>{transaction?.category}</span>
        <div className={css.underline} />
      </div>

      {/* Сумма и дата */}
      <div className={css.inputContainer}>
        <div className={css.inputRow}>
          {/* Поле суммы */}
          <div className={css.fieldGroup}>
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className={css.noArrows}
                />
              )}
            />
            {errors.amount && (
              <p className={css.errorText}>{errors.amount.message}</p>
            )}
          </div>

          {/* Поле даты */}
          <div className={`${css.fieldGroup} ${css.dateContainer}`}>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="dd.MM.yyyy"
                  className={css.dateInput}
                />
              )}
            />
            <svg
              className={css.calendarSvg}
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
            {errors.date && (
              <p className={css.errorText}>{errors.date.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Комментарий - только для типа Expense */}
      {transaction?.type === "expense" && (
        <div className={css.fieldGroup}>
          <Controller
            name="comment"
            control={control}
            render={({ field }) => (
              <input {...field} type="text" placeholder="Comment" />
            )}
          />
          {errors.comment && (
            <p className={css.errorText}>{errors.comment.message}</p>
          )}
        </div>
      )}

      {/* Кнопка сохранения */}
      <div className={css.buttonWrapper}>
        <button type="submit" className={css.submitBtn}>
          SAVE
        </button>
      </div>
    </form>
  );
};

export default EditTransactionForm;
