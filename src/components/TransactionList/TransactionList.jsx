import TransactionItem from "../TransactionItem/TransactionItem";
import useMedia from "../../hooks/useMedia";
import s from "./TransactionList.module.css";
import FormButton from "../common/FormButton/FormButton";

// Тестовий набір операцій
const sampleOperations = [
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

  // Використання тестових даних
  const operationsData = sampleOperations;
  // const loadingState = useSelector(selectTransactionsLoading);
  // const errorState = useSelector(selectTransactionsError);
  const loadingState = false;
  // const errorState = false;

  // Сортування за датою
  const sortedOperations = [...operationsData].sort(
    (prev, next) =>
      new Date(prev.transactionDate) - new Date(next.transactionDate)
  );

  // Адаптивний хук
  const { isMobile } = useMedia();

  return (
    <>
      {/* {loadingState && <Loader />} */}
      {/* {errorState && <p className={s.notificationBlock}>Щось пішло не так...</p>} */}
      {!loadingState && operationsData.length === 0 ? (
        <div className={s.emptyContainer}>
          <p>Немає доступних записів.</p>
          <p>Додайте операцію</p>
          <FormButton
            type="button"
            text={"Додати запис"}
            variant={"multiColorButton"}
            // handlerFunction={() => dispatch(openAddModal())}
          />
        </div>
      ) : (
        <div className={s.operationsPanel}>
          <table className={s.dataGrid}>
            {!isMobile && (
              <thead className={s.gridHeader}>
                <tr className={s.headRow}>
                  <th className={s.dateSection}>Date</th>
                  <th className={s.typeSection}>Type</th>
                  <th className={s.categorySection}>Category</th>
                  <th className={s.noteSection}>Comment</th>
                  <th
                    className={
                      operationsData.length === 0
                        ? s.hiddenControls
                        : s.valueSection
                    }
                  >
                    Sum
                  </th>
                  {operationsData.length !== 0 && (
                    <th className={s.controlsSection}></th>
                  )}
                </tr>
              </thead>
            )}
            <tbody className={s.gridBody}>
              {sortedOperations.map((operation) => (
                <TransactionItem key={operation.id} transaction={operation} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default TransactionList;
