// components/EditTransactionForm/EditTransactionForm.jsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      amount: transaction.amount,
      date: new Date(transaction.date),
      comment: transaction.comment || "",
    },
  });

  useEffect(() => {
    setValue("amount", transaction.amount);
  }, [transaction.amount, setValue]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        sum: data.amount,
        type: transaction.type,
        category: transaction.category,
        comment: data.comment,
        date: new Date(data.date).toISOString(),
      };
      console.log("Submitting:", payload);
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
      <h2 className={css.title}>Edit transaction</h2>
      <div className={css.typeLabelWrapper}>
        <span
          className={
            '${css.typeLabel} ${transaction.type === "income" ? css.income:css.expense'
          }
        >
          {" "}
          {transaction.type === "income" ? "Income" : "Expense"}
        </span>
      </div>
      {/* Sum */}
      <label>
        <input type="number" step="0.01" {...register("amount")} />
        {errors.amount && <p className={css.error}>{errors.amount.message}</p>}
      </label>

      {/* Date */}
      <label>
        <DatePicker
          selected={watch("date")}
          onChange={(date) => setValue("date", date)}
          dateFormat="dd/MM/yyyy"
          className={css.datePicker}
        />
        {errors.date && <p className={css.error}>{errors.date.message}</p>}
      </label>

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

      <div className={css.buttons}>
        <button type="submit" className={css.submitButton}>
          Save
        </button>
        <button type="button" onClick={onClose} className={css.cancelButton}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditTransactionForm;
