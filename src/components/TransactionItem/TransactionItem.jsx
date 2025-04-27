// src/components/TransactionItem/TransactionItem.jsx
// import { useDispatch } from "react-redux";
import useMedia from "../../hooks/useMedia";
// import { deleteTransaction } from "../../redux/transactions/operations";
// import { openEditModal, addEditId } from "../../redux/modals/slice";
import s from "./TransactionItem.module.css";
// import { selectCategories } from "../../redux/statistics/selectors";
import { LuPencil } from "react-icons/lu";
// import { getBalanceThunk } from "../../redux/auth/operations";

// Отримання категорії за ідентифікатором
const retrieveCategory = (catId, categoriesList) => {
  const foundCategory = categoriesList.find((element) => element.id === catId);
  if (!foundCategory) return;
  return foundCategory.name;
};

// Форматування дати в локальний формат
const formatLocalDate = (isoDate) => {
  const settings = { day: "2-digit", month: "2-digit", year: "2-digit" };
  return new Date(isoDate).toLocaleDateString("uk-UA", settings);
};

// Тестові дані категорій
const sampleCategories = [
  { id: "1", name: "Other" },
  { id: "2", name: "Income" },
  { id: "3", name: "Car" },
  { id: "4", name: "Prodycts" },
];

function TransactionItem({ transaction }) {
  // Обчислення суми та форматування
  const absoluteSum = Math.abs(transaction.amount);
  const formattedSum = new Intl.NumberFormat().format(absoluteSum);

  // Використання тестових категорій
  const categoriesList = sampleCategories;
  const categoryName = retrieveCategory(transaction.categoryId, categoriesList);

  // Адаптивний хук
  const { isMobile } = useMedia();

  // Обробник редагування
  const handleEdit = () => {
    // dispatch(addEditId(transaction.id));
    // dispatch(openEditModal());
  };

  // Обробник видалення
  const handleRemove = async () => {
    // await dispatch(deleteTransaction(transaction.id));
    // dispatch(getBalanceThunk());
  };

  // Десктопна версія
  return !isMobile ? (
    <tr className={s.recordLine}>
      <td className={s.timeCell}>
        {formatLocalDate(transaction.transactionDate)}
      </td>
      <td className={s.kindCell}>
        {transaction.type === "INCOME" ? "+" : "-"}
      </td>
      <td className={s.groupCell}>{categoryName}</td>
      <td className={s.remarkCell}>{transaction.comment}</td>
      <td
        className={
          transaction.type === "INCOME" ? s.incomeValue : s.outflowValue
        }
      >
        {formattedSum}
      </td>
      <td className={s.manageCell}>
        <button type="button" className={s.modifyBtn} onClick={handleEdit}>
          <LuPencil style={{ width: "14px", height: "14px" }} />
        </button>
        <button type="button" className={s.eraseBtn} onClick={handleRemove}>
          Delete
        </button>
      </td>
    </tr>
  ) : (
    // Мобільна версія
    <tr
      className={
        transaction.type === "INCOME" ? s.recordLine : s.recordLineNegative
      }
    >
      <td className={s.timeCell}>
        <span className={s.timeLabel}>Date</span>
        {formatLocalDate(transaction.transactionDate)}
      </td>
      <td className={s.kindCell}>
        <span className={s.kindLabel}>Type</span>
        {transaction.type === "INCOME" ? "+" : "-"}
      </td>
      <td className={s.groupCell}>
        <span className={s.groupLabel}>Category</span>
        {categoryName}
      </td>
      <td className={s.remarkCell}>
        <span className={s.remarkLabel}>Comment</span>
        <p>{transaction.comment}</p>
      </td>
      <td
        className={
          transaction.type === "INCOME" ? s.incomeValue : s.outflowValue
        }
      >
        <span className={s.sumLabel}>Sum</span>
        {formattedSum}
      </td>
      <td className={s.manageCell}>
        <button type="button" className={s.eraseBtn} onClick={handleRemove}>
          Delete
        </button>
        <button type="button" className={s.modifyBtn} onClick={handleEdit}>
          <LuPencil style={{ width: "14px", height: "14px" }} />
          <span className={s.mobileEditText}>Edit</span>
        </button>
      </td>
    </tr>
  );
}

export default TransactionItem;
