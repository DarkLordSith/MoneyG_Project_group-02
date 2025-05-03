import { useDispatch, useSelector } from "react-redux";
import { deleteTransaction } from "../../redux/transactions/operations";
import TransactionItem from "../TransactionItem/TransactionItem";
import useMedia from "../../hooks/useMedia";
import s from "./TransactionList.module.css";
import { selectTransactions } from "../../redux/transactions/selectors";
import MobileTransactionItem from "../TransactionItem/MobileTransactionItem";

const TransactionList = ({ onEdit }) => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectTransactions);
  const { isMobile } = useMedia();

  const handleDeleteTransaction = async (id) => {
    await dispatch(deleteTransaction(id));
  };

  return (
    <>
      {transactions.length === 0 ? (
        <div className={s.emptyContainer}>
          <p>Немає доступних записів.</p>
          <p>Додайте операцію</p>
        </div>
      ) : (
        <>
          <table className={s.dataGrid}>
            {!isMobile && (
              <thead className={s.gridHeader}>
                <tr className={s.headRow}>
                  <th className={s.dateSection}>Data</th>
                  <th className={s.typeSection}>Type</th>
                  <th className={s.categorySection}>Category</th>
                  <th className={s.noteSection}>Comment</th>
                  <th className={s.valueSection}>Amount</th>
                  <th className={s.controlsSection}></th>
                </tr>
              </thead>
            )}
            <tbody className={s.gridBody}>
              {Array.isArray(transactions) &&
                transactions
                  .filter((item) => item && item._id)
                  .map((operation) =>
                    isMobile ? (
                      <MobileTransactionItem
                        key={operation._id}
                        transaction={operation}
                        onEdit={onEdit}
                      />
                    ) : (
                      <TransactionItem
                        key={operation._id}
                        transaction={operation}
                        onEdit={onEdit}
                        handleRemove={handleDeleteTransaction}
                      />
                    )
                  )}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default TransactionList;
