import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../redux/transactions/operations";
import { selectTransactions } from "../../redux/transactions/selectors";
import { selectIsLoading } from "../../redux/transactions/selectors";
import TransactionsList from "../../components/TransactionList/TransactionList";
import Loader from "../../components/Loader/Loader";
import ButtonAddTransactions from "../../components/ButtonAddTransactions/ButtonAddTransactions";
import { ModalEditTransaction } from "../../components/ModalEditTransaction/ModalEditTransaction";

const HomeTab = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectTransactions);
  const isLoading = useSelector(selectIsLoading);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const openEditModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedTransaction(null);
    setIsEditModalOpen(false);
  };

  return (
    <div>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          {transactions.length > 0 ? (
            <TransactionsList
              transactions={transactions}
              onEdit={openEditModal}
            />
          ) : (
            <div>
              <p>Немає транзакцій. Додайте свою першу транзакцію!</p>
            </div>
          )}
        </>
      )}
      <ButtonAddTransactions />
      {isEditModalOpen && selectedTransaction && (
        <ModalEditTransaction
          transaction={selectedTransaction}
          onClose={closeEditModal}
        />
      )}
    </div>
  );
};

export default HomeTab;

/*
СКЕЛЕТ ДЛЯ ТЕБЕ:

- Тут ми одразу диспатчимо операції отримання транзакцій і категорій
- Виводимо Loader під час завантаження
- Якщо транзакції є — рендеримо TransactionsList
- Якщо немає — показуємо заглушку
- Важливо: верстку моб/планшет/десктоп налаштовуємо через CSS у HomeTab.module.css
*/

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTransactions } from "../../redux/transactions/operations";
// import TransactionsList from "../TransactionsList/TransactionsList";
// import ButtonAddTransaction from "../ButtonAddTransaction/ButtonAddTransaction";

// const HomeTab = () => {
//   const dispatch = useDispatch();
//   const transactions = useSelector((state) => state.transactions.items);

//   useEffect(() => {
//     dispatch(fetchTransactions());
//   }, [dispatch]);

//   return (
//     <section>
//       {transactions.length ? (
//         <TransactionsList transactions={transactions} />
//       ) : (
//         <p>No transactions yet</p>
//       )}
//       <ButtonAddTransaction />
//     </section>
//   );
// };
