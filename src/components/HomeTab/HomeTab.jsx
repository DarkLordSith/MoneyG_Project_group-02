import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../../actions/transactions';
import { fetchCategories } from '../../actions/categories';

const HomeTab = () => {
  const dispatch = useDispatch();

  // Дані з Redux
  const { transactions, loading: loadingTransactions, error: transactionsError } = useSelector(state => state.transactions);
  const { categories, loading: loadingCategories, error: categoriesError } = useSelector(state => state.categories);

  // Викликаємо запити при завантаженні компонента
  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div>
      <h1>Транзакції</h1>
      {loadingTransactions ? (
        <p>Завантаження...</p>
      ) : transactionsError ? (
        <p>{transactionsError}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Дата</th>
              <th>Сума</th>
              <th>Категорія</th>
              <th>Опис</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>{transaction.amount}</td>
                <td>{categories.find(cat => cat.id === transaction.categoryId)?.name}</td>
                <td>{transaction.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h1>Категорії</h1>
      {loadingCategories ? (
        <p>Завантаження...</p>
      ) : categoriesError ? (
        <p>{categoriesError}</p>
      ) : (
        <ul>
          {categories.map(category => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomeTab;
