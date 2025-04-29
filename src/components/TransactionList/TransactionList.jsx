//import React, { useEffect, useState } from "react";//
//import { useDispatch, useSelector } from "react-redux";
//import { fetchTransactions } from "../../redux/transactions/operations";
//import TransactionItem from "../TransactionItem/TransactionItem";
//import useMedia from "../../hooks/useMedia";
//import s from "./TransactionList.module.css";
//import FormButton from "../common/FormButton/FormButton";
//import Loader from "../Loader/Loader"; // Підключення Loader для стану завантаження

//const TransactionList = () => {
//  const dispatch = useDispatch();

  // Дані з Redux
//  const transactions = useSelector((state) => state.transactions.items);
//  const loadingState = useSelector((state) => state.transactions.isLoading);
//  const errorState = useSelector((state) => state.transactions.error);

  // Фільтрація за типом транзакцій
//  const [filter, setFilter] = useState("ALL");

//  const filteredOperations = transactions
 //   .filter((operation) => {//
 //     if (filter === "ALL") return true;
 //     return operation.type === filter;
//    })
//    .sort(//
//      (prev, next) =>
 //       new Date(prev.transactionDate) - new Date(next.transactionDate)
//    );
//
//  // Адаптивний хук
//  const { isMobile } = useMedia();
//
//  const handleFilterChange = (newFilter) => {//
 //   setFilter(newFilter);
//  };
//
//  useEffect(() => {//
//    dispatch(fetchTransactions());
//  }, [dispatch]);
//
 // return (
//    <>
//      {loadingState && <Loader />}
//    //  {errorState && (//
 //       <p className={s.notificationBlock}>Щось пішло не так...</p>
//      )}
//      {!loadingState && transactions.length === 0 ? (//
//        <div className={s.emptyContainer}>
//          <p>Немає доступних записів.</p>
//          <p>Додайте операцію</p>
//          <FormButton
//            type="button"
//            text={"Додати запис"}
//            variant={"multiColorButton"}
//            // handlerFunction={() => dispatch(openAddModal())}
//          />
//        </div>
//   //   ) : (
//        <div className={s.operationsPanel}>
//          {/* Фільтрація */}
//          <div className={s.filters}>
//            <FormButton
//              type="button"
//              text={"Всі"}
//              variant={"filterButton"}
//              handlerFunction={() => handleFilterChange("ALL")}
//            />
//            <FormButton
//              type="button"
//              text={"Прибуток"}
//              variant={"filterButton"}
//              handlerFunction={() => handleFilterChange("INCOME")}
//            />
//            <FormButton
//              type="button"
//              text={"Витрати"}
//              variant={"filterButton"}
//              handlerFunction={() => handleFilterChange("EXPENSE")}
//            />
//          </div>
//
 //         {/* Відображення транзакцій */}
//          <table className={s.dataGrid}>
//            {!isMobile && (
//              <thead className={s.gridHeader}>
//                <tr className={s.headRow}>
//                  <th className={s.dateSection}>Дата</th>
//                  <th className={s.typeSection}>Тип</th>
//                  <th className={s.categorySection}>Категорія</th>
//                  <th className={s.noteSection}>Коментар</th>
//                  <th className={s.valueSection}>Сума</th>
//                  <th className={s.controlsSection}></th>
//                </tr>
//              </thead>
//            )}
//            <tbody className={s.gridBody}>
//              {filteredOperations.map((operation) => (
//                <TransactionItem key={operation.id} transaction={operation} />
//              ))}
 //           </tbody>
//          </table>
//
//          {/* Мобільний вигляд */}
//          {isMobile && (
//            <div className={s.mobileView}>
//              {filteredOperations.map((operation) => (
//                <div key={operation.id} className={s.transactionItem}>
//                  <div>{operation.transactionDate}</div>
//                  <div>{operation.type}</div>
//                  <div>{operation.comment}</div>
//                  <div>{operation.amount}</div>
//                </div>
//              ))}
 //           </div>
//          )}
//        </div>
//      )}
//    </>
//  );
//};
//
//export default TransactionList;
