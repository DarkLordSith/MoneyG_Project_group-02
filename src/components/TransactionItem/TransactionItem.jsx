// src/components/TransactionItem/TransactionItem.jsx
// import { useDispatch } from "react-redux";
import useMedia from "../../hooks/useMedia";
// import { deleteTransaction } from "../../redux/transactions/operations";
// import { openEditModal, addEditId } from "../../redux/modals/slice";
import s from "./TransactionItem.module.css";
// import { selectCategories } from "../../redux/statistics/selectors";
import { LuPencil } from "react-icons/lu";
// import { getBalanceThunk } from "../../redux/auth/operations";

const getTransactionCategory = (categoryId, categories) => {
  const transactionCategory = categories.find((item) => item.id === categoryId);
  if (!transactionCategory) return;
  return transactionCategory.name;
};

const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
  return new Date(dateString).toLocaleDateString("uk-UA", options);
};

const mockCategories = [
  { id: "1", name: "Gifts" },
  { id: "2", name: "Salary" },
  { id: "3", name: "Transport" },
  { id: "4", name: "Groceries" },
];

function TransactionItem({ transaction }) {
  const sum = Math.abs(transaction.amount);
  const formSum = new Intl.NumberFormat().format(sum);
  const categories = mockCategories;
  const category = getTransactionCategory(transaction.categoryId, categories);
  const { isMobile } = useMedia();

  const onEdit = () => {
    // dispatch(addEditId(transaction.id));
    // dispatch(openEditModal());
  };

  const onDelete = async () => {
    // await dispatch(deleteTransaction(transaction.id));
    // dispatch(getBalanceThunk());
  };

  return !isMobile ? (
    <tr className={s.transactionRow}>
      <td className={s.columnDate}>
        {formatDate(transaction.transactionDate)}
      </td>
      <td className={s.columnType}>
        {transaction.type === "INCOME" ? "+" : "-"}
      </td>
      <td className={s.columnCategory}>{category}</td>
      <td className={s.columnDescription}>{transaction.comment}</td>
      <td
        className={
          transaction.type === "INCOME" ? s.profitAmount : s.lossAmount
        }
      >
        {formSum}
      </td>
      <td className={s.controlsCell}>
        <button type="button" className={s.modifyButton} onClick={onEdit}>
          <LuPencil style={{ width: "14px", height: "14px" }} />
        </button>
        <button type="button" className={s.removeButton} onClick={onDelete}>
          Delete
        </button>
      </td>
    </tr>
  ) : (
    <tr
      className={
        transaction.type === "INCOME"
          ? s.transactionRow
          : s.transactionRowExpense
      }
    >
      <td className={s.columnDate}>
        <span className={s.labelDate}>Date</span>
        {formatDate(transaction.transactionDate)}
      </td>
      <td className={s.columnType}>
        <span className={s.labelType}>Type</span>
        {transaction.type === "INCOME" ? "+" : "-"}
      </td>
      <td className={s.columnCategory}>
        <span className={s.labelCategory}>Category</span>
        {category}
      </td>
      <td className={s.columnDescription}>
        <span className={s.labelDescription}>Comment</span>
        <p>{transaction.comment}</p>
      </td>
      <td
        className={
          transaction.type === "INCOME" ? s.profitAmount : s.lossAmount
        }
      >
        <span className={s.labelAmount}>Sum</span>
        {formSum}
      </td>
      <td className={s.controlsCell}>
        <button type="button" className={s.removeButton} onClick={onDelete}>
          Delete
        </button>
        <button type="button" className={s.modifyButton} onClick={onEdit}>
          <LuPencil style={{ width: "14px", height: "14px" }} />
          Edit
        </button>
      </td>
    </tr>
  );
}

export default TransactionItem;
