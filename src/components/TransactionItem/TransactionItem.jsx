import s from "./TransactionItem.module.css";
import { LuPencil } from "react-icons/lu";

const formatLocalDate = (isoDate) => {
  const settings = { day: "2-digit", month: "2-digit", year: "2-digit" };
  return new Date(isoDate).toLocaleDateString("uk-UA", settings);
};

function TransactionItem({ transaction, onEdit, handleRemove }) {
  if (!transaction || !transaction._id) return null;

  return (
    <tr className={s.recordLine}>
      <td className={s.timeCell}>{formatLocalDate(transaction.date)}</td>
      <td className={s.kindCell}>
        {transaction.type === "income" ? "+" : "-"}
      </td>
      <td className={s.groupCell}>{transaction.category}</td>
      <td className={s.remarkCell}>{transaction.comment}</td>
      <td
        className={
          transaction.type === "income" ? s.incomeValue : s.outflowValue
        }
      >
        {transaction.sum?.toFixed(2)}
      </td>
      <td className={s.manageCell}>
        <button
          type="button"
          className={s.modifyBtn}
          onClick={() => onEdit(transaction)}
        >
          <LuPencil style={{ width: "14px", height: "14px" }} />
        </button>
        <button
          type="button"
          className={s.eraseBtn}
          onClick={() => handleRemove(transaction._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default TransactionItem;
