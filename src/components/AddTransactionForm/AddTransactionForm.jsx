import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { addTransaction } from "../../redux/transactions/operations";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    then: yup.string().required("Оберіть категорію витрат"),
    otherwise: yup.string(),
  }),
  comment: yup.string().required("Введіть коментар"),
});

const AddTransactionForm = ({ onClose }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      type: "expense",
      sum: "",
      date: new Date(),
      category: "",
      comment: "",
    },
  });

  const type = watch("type");

  const onSubmit = async (data) => {
    try {
      await dispatch(addTransaction(data)).unwrap();
      toast.success("Транзакція додана успішно!");
      onClose();
    } catch (error) {
      toast.error(`Помилка при додаванні: ${error.message || "Спробуйте ще раз."}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>
          <input type="radio" value="expense" {...register("type")} defaultChecked /> Витрата
        </label>
        <label>
          <input type="radio" value="income" {...register("type")} /> Дохід
        </label>
      </div>

      <input type="number" placeholder="Сума" {...register("sum")} />
      {errors.sum && <p>{errors.sum.message}</p>}

      <DatePicker
        selected={watch("date")}
        onChange={(date) => setValue("date", date)}
        dateFormat="dd/MM/yyyy"
      />
      {errors.date && <p>{errors.date.message}</p>}

      {type === "expense" && (
        <>
          <select {...register("category")}>
            <option value="">Оберіть категорію</option>
            <option value="products">Продукти</option>
            <option value="transport">Транспорт</option>
            {/* додай інші категорії */}
          </select>
          {errors.category && <p>{errors.category.message}</p>}
        </>
      )}

      <input type="text" placeholder="Коментар" {...register("comment")} />
      {errors.comment && <p>{errors.comment.message}</p>}

      <button type="submit">Add</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};

export default AddTransactionForm;
