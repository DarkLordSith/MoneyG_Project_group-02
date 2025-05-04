import React, { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./AddTransactionForm.module.css";
import CustomSelect from "../CustomSelect/CustomSelect";
import { addTransaction } from "../../redux/transactions/operations";

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

const AddTransactionForm = ({
  closeModal,
  transactionType,
  transactionToEdit,
  onFormRef,
  showErrors = false,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isDesktop = useMediaQuery({ minWidth: 1280 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1279 });
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      type: transactionToEdit?.type || transactionType || "expense",
      sum: transactionToEdit?.sum || "",
      date: transactionToEdit?.date
        ? new Date(transactionToEdit.date)
        : new Date(),
      category: transactionToEdit?.category || "",
      comment: transactionToEdit?.comment || "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (transactionType && !transactionToEdit) {
      setValue("type", transactionType);
    }
    if (transactionToEdit) {
      setValue("type", transactionToEdit.type);
      setValue("sum", transactionToEdit.sum);
      setValue("date", new Date(transactionToEdit.date));
      setValue(
        "category",
        transactionToEdit.category === "Incomes"
          ? ""
          : transactionToEdit.category
      );
      setValue("comment", transactionToEdit.comment);
    }
  }, [transactionType, transactionToEdit, setValue]);

  useEffect(() => {
    if (showErrors) {
      trigger();
    }
  }, [showErrors, trigger]);

  const type = watch("type");
  const selectedDate = watch("date");
  const selectedCategory = watch("category");

  const onSubmit = useCallback(
    async (data) => {
      try {
        const payload = {
          ...data,
          date: new Date(data.date).toISOString(),
          category: data.type === "income" ? "Incomes" : data.category,
        };

        if (transactionToEdit) {
          console.log("Обновление транзакции:", {
            id: transactionToEdit.id,
            ...payload,
          });
        } else {
          await dispatch(addTransaction(payload)).unwrap();
        }
        closeModal();
      } catch (error) {
        console.error("Ошибка при операции с транзакцией:", error);
      }
    },
    [transactionToEdit, closeModal, dispatch]
  );

  const submitHandler = useCallback(
    () => handleSubmit(onSubmit)(),
    [handleSubmit, onSubmit]
  );

  useEffect(() => {
    if (onFormRef) {
      onFormRef(submitHandler, isValid);
    }
  }, [submitHandler, isValid, onFormRef]);

  const formClasses = `${styles.form} ${isMobile ? styles.formMobile : ""} ${isTablet ? styles.formTablet : ""} ${isDesktop ? styles.formDesktop : ""}`;

  return (
    <form className={formClasses} onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register("type")} value={type} />

      {type === "expense" && (
        <div className={styles.field}>
          <CustomSelect
            options={categories}
            onChange={(e) =>
              setValue("category", e.target.value, { shouldValidate: true })
            }
            placeholder="Select a category"
            value={selectedCategory || ""}
            name="category"
          />
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

      <div
        className={`${styles.inputRow} ${isMobile ? styles.inputRowMobile : ""}`}
      >
        <div className={styles.field}>
          <input
            type="number"
            placeholder="0.00"
            step="0.01"
            {...register("sum")}
            className={styles.noArrows}
          />
          {errors.sum && <p className={styles.error}>{errors.sum.message}</p>}
        </div>

        <div className={styles.field}>
          <div className={styles.datePickerWrapper}>
            <DatePicker
              selected={selectedDate}
              onChange={(date) =>
                setValue("date", date, { shouldValidate: true })
              }
              dateFormat="dd.MM.yyyy"
              className={styles.datePicker}
              placeholderText="DD.MM.YYYY"
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

      <div className={styles.field}>
        <input type="text" placeholder="Comment" {...register("comment")} />
        {errors.comment && (
          <p className={styles.error}>{errors.comment.message}</p>
        )}
      </div>
      <button type="submit" style={{ display: "none" }} aria-hidden="true">
        Submit
      </button>
    </form>
  );
};

export default AddTransactionForm;
