import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { updateTransaction } from '../../redux/transactions/operations'; // Операція для оновлення транзакції
import { toast } from 'react-toastify';
import styles from './EditTransactionForm.module.css'; // Стилі для форми

// Схема валідації
const validationSchema = Yup.object({
  sum: Yup.number().required("Поле обов'язкове").positive("Сума повинна бути позитивною"),
  date: Yup.date().required("Поле обов'язкове").nullable(),
  comment: Yup.string().required("Поле обов'язкове").max(255, "Максимальна кількість символів 255"),
});

const EditTransactionForm = ({ transaction, onClose }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      sum: transaction.sum,
      date: new Date(transaction.date),
      comment: transaction.comment,
    }
  });

  // Обробка сабміту форми
  const onSubmit = async (data) => {
    try {
      // Відправка запиту на оновлення транзакції
      await dispatch(updateTransaction({ id: transaction.id, ...data })).unwrap();
      toast.success('Транзакція оновлена успішно!');
      onClose(); // Закриття модалки
    } catch  {
      toast.error('Помилка при оновленні транзакції. Перевірте дані.');
    }
  };

  // Заповнення полів форми при редагуванні
  useEffect(() => {
    setValue('sum', transaction.sum);
    setValue('date', new Date(transaction.date));
    setValue('comment', transaction.comment);
  }, [transaction, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="sum" className={styles.label}>Сума</label>
        <input
          id="sum"
          type="number"
          step="0.01"
          {...register('sum')}
          className={`${styles.input} ${errors.sum ? styles.error : ''}`}
        />
        {errors.sum && <p className={styles.errorText}>{errors.sum.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="date" className={styles.label}>Дата</label>
        <DatePicker
          id="date"
          selected={new Date(transaction.date)}
          onChange={(date) => setValue('date', date)}
          dateFormat="yyyy/MM/dd"
          className={`${styles.input} ${errors.date ? styles.error : ''}`}
        />
        {errors.date && <p className={styles.errorText}>{errors.date.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="comment" className={styles.label}>Коментар</label>
        <textarea
          id="comment"
          {...register('comment')}
          className={`${styles.textarea} ${errors.comment ? styles.error : ''}`}
        />
        {errors.comment && <p className={styles.errorText}>{errors.comment.message}</p>}
      </div>

      <div className={styles.buttons}>
        <button type="button" onClick={onClose} className={styles.cancelButton}>Cancel</button>
        <button type="submit" className={styles.saveButton}>Save</button>
      </div>
    </form>
  );
};

export default EditTransactionForm;
