import s from "./TransactionItem.module.css";
import { LuPencil } from "react-icons/lu";

const formatLocalDate = (isoDate) => {
  const settings = { day: "2-digit", month: "2-digit", year: "2-digit" };
  return new Date(isoDate).toLocaleDateString("uk-UA", settings);
};

function MobileTransactionItem({ transaction, onEdit, handleRemove }) {
  if (!transaction || !transaction._id) return null;

  return (
    <tr
      className={
        transaction.type === "income" ? s.recordLine : s.recordLineNegative
      }
    >
      <td className={s.timeCell}>
        <span className={s.timeLabel}>Date</span>
        {formatLocalDate(transaction.date)}
      </td>
      <td className={s.kindCell}>
        <span className={s.kindLabel}>Type</span>
        {transaction.type === "income" ? "+" : "-"}
      </td>
      <td className={s.groupCell}>
        <span className={s.groupLabel}>Category</span>
        {transaction.category}
      </td>
      <td className={s.remarkCell}>
        <span className={s.remarkLabel}>Comment</span>
        <p>{transaction.comment}</p>
      </td>
      <td
        className={
          transaction.type === "income" ? s.incomeValue : s.outflowValue
        }
      >
        <span className={s.sumLabel}>Sum</span>
        {transaction.sum ? transaction.sum?.toFixed(2) : "0.00"}
      </td>
      <td className={s.manageCell}>
        <button type="button" className={s.eraseBtn} onClick={handleRemove}>
          Delete
        </button>
        <button
          type="button"
          className={s.modifyBtn}
          onClick={() => onEdit(transaction)}
        >
          <LuPencil style={{ width: "14px", height: "14px" }} />
          <span className={s.mobileEditText}>Edit</span>
        </button>
      </td>
    </tr>
  );
}

export default MobileTransactionItem;
