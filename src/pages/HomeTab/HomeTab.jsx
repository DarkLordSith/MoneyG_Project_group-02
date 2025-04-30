import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../redux/transactions/operations";
import { selectTransactions } from "../../redux/transactions/selectors";
import { selectIsLoading } from "../../redux/transactions/selectors";
import TransactionsList from "../../components/TransactionList/TransactionList";
import Loader from "../../components/Loader/Loader";

const HomeTab = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectTransactions);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <div>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          {transactions.length > 0 ? (
            <TransactionsList />
          ) : (
            <div>
              <p>Немає транзакцій. Додайте свою першу транзакцію!</p>
            </div>
          )}
        </>
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
