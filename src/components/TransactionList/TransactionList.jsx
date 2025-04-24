import TransactionItem from "../TransactionItem/TransactionItem";
import useMedia from "../../hooks/useMedia";
import s from "./TransactionList.module.css";
import FormButton from "../common/FormButton/FormButton";

const mockTransactions = [
  {
    id: "1",
    transactionDate: "2023-01-04",
    amount: -300,
    categoryId: "1",
    type: "EXPENSE",
    comment: "Gift for your wife",
  },
  {
    id: "2",
    transactionDate: "2023-01-05",
    amount: 8000,
    categoryId: "2",
    type: "INCOME",
    comment: "January bonus",
  },
  {
    id: "3",
    transactionDate: "2023-01-07",
    amount: -1000,
    categoryId: "3",
    type: "EXPENSE",
    comment: "Oil",
  },
  {
    id: "4",
    transactionDate: "2023-01-07",
    amount: -280,
    categoryId: "4",
    type: "EXPENSE",
    comment: "Vegetables for the week",
  },
  {
    id: "5",
    transactionDate: "2023-01-07",
    amount: 1000,
    categoryId: "2",
    type: "INCOME",
    comment: "Gift",
  },
];

const TransactionList = () => {
  // const dispatch = useDispatch();
  const transactions = mockTransactions;
  // const isLoading = useSelector(selectTransactionsLoading);
  // const isError = useSelector(selectTransactionsError);
  const isLoading = false;
  // const isError = false;

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(a.transactionDate) - new Date(b.transactionDate)
  );

  const { isMobile } = useMedia();

  return (
    <>
      {/* {isLoading && <Loader />} */}
      {/* {isError && <p className={s.messageText}>Oops, something went wrong...</p>} */}
      {!isLoading && transactions.length === 0 ? (
        <div className={s.container}>
          <p>No transactions available yet.</p>
          <p>Let's add your first transaction:</p>
          <FormButton
            type="button"
            text={"Add transaction"}
            variant={"multiColorButton"}
            // handlerFunction={() => dispatch(openAddModal())}
          />
        </div>
      ) : (
        <div className={s.transactionsWrapper}>
          <table className={s.tableDataContainer}>
            {!isMobile && (
              <thead className={s.tableHeader}>
                <tr className={s.tr}>
                  <th className={s.dateColumn}>Date</th>
                  <th className={s.typeColumn}>Type</th>
                  <th className={s.categoryColumn}>Category</th>
                  <th className={s.commentColumn}>Comment</th>
                  <th
                    className={
                      transactions.length === 0
                        ? s.hiddenActions
                        : s.amountColumn
                    }
                  >
                    Sum
                  </th>
                  {transactions.length !== 0 && <th className={s.actions}></th>}
                </tr>
              </thead>
            )}
            <tbody className={s.th}>
              {sortedTransactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default TransactionList;
