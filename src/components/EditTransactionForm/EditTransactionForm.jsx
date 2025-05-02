import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import css from "./EditTransactionForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { editTransaction } from "../../redux/transactions/operations";
import { toast } from "react-toastify";
import { selectCategories } from "../../redux/transactions/selectors";

// Валідація форми
const schema = yup.object().shape({
  amount: yup
    .number()
    .typeError("Sum must be a number")
    .positive("Sum must be positive")
    .required("Sum is required"),
  date: yup.date().required("Date is required"),
  comment: yup.string().max(50, "Max 50 characters"),
  category: yup.string().required("Category is required"),
});

export const EditTransactionForm = ({ transaction, onClose }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      amount: transaction?.amount || "",
      date: transaction?.date ? new Date(transaction.date) : new Date(),
      comment: transaction?.comment || "",
      category: transaction?.category || "",
    },
  });

  useEffect(() => {
    if (!transaction) return;
    reset({
      amount: transaction.amount,
      date: new Date(transaction.date),
      comment: transaction.comment || "",
      category: transaction.category || "",
    });
  }, [transaction, reset]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        sum: data.amount,
        type: transaction.type,
        category: data.category,
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
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <div className={css.toggleContainer}>
        <p
          className={
            transaction.type === "income" ? css.activeIncome : css.inactive
          }
        >
          Income
        </p>
        <span className={css.separator}>/</span>
        <p
          className={
            transaction.type === "expense" ? css.activeExpense : css.inactive
          }
        >
          Expense
        </p>
      </div>

      {/* Category Select */}
      <div className={css.field}>
        <select
          className={`${css.selectInput} ${errors.category ? css.inputError : ""}`}
          {...register("category")}
        >
          <option value="">Select category</option>
          {categories
            .filter((cat) => cat.type === transaction.type)
            .map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
        </select>
        {errors.category && (
          <p className={css.error}>{errors.category.message}</p>
        )}
      </div>

      {/* Sum + Date */}
      <div className={css.inputRowContainer}>
        <div className={css.inputRow}>
          <div className={css.field}>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register("amount")}
            />
            {errors.amount && (
              <p className={css.error}>{errors.amount.message}</p>
            )}
          </div>

          <div className={`${css.field} ${css.datePickerWrapper}`}>
            <DatePicker
              selected={watch("date")}
              onChange={(date) => setValue("date", date)}
              dateFormat="dd/MM/yyyy"
              className={css.datePicker}
            />
            <svg
              className={css.calendarIcon}
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
            {errors.date && <p className={css.error}>{errors.date.message}</p>}
          </div>
        </div>
      </div>

      {/* Comment */}
      <div className={css.field}>
        <input
          type="text"
          placeholder="Comment"
          className={errors.comment ? css.inputError : ""}
          {...register("comment")}
        />
        {errors.comment && (
          <p className={css.error}>{errors.comment.message}</p>
        )}
      </div>

      <div className={css.buttonsContainer}>
        <button type="submit" className={css.submitButton}>
          Save
        </button>
      </div>
    </form>
  );
};

export default EditTransactionForm;
