import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../redux/transactions/operations";
import { selectTransactions } from "../../redux/transactions/selectors";
// import { selectIsLoading } from "../../redux/transactions/selectors";
import TransactionsList from "../../components/TransactionList/TransactionList";
import Loader from "../../components/Loader/Loader";
import ButtonAddTransactions from "../../components/ButtonAddTransactions/ButtonAddTransactions";
import { ModalEditTransaction } from "../../components/ModalEditTransaction/ModalEditTransaction";
import EmptyTransactionsButton from "../../components/EmptyTransactionsButton/EmptyTransactionsButton";

const HomeTab = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectTransactions);
  // const isLoading = useSelector(selectIsLoading);

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
      {/* {isLoading && <Loader />}
      {!isLoading && ( */}

      {transactions.length > 0 ? (
        <TransactionsList transactions={transactions} onEdit={openEditModal} />
      ) : (
        <EmptyTransactionsButton />
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
