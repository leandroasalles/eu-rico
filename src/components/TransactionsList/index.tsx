import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getTransactions } from "../../redux/slices/transactionsSlice";

export default function TransactionsList() {
  const dispatch = useAppDispatch();
  const { transactions } = useAppSelector((state) => state.transactions);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(getTransactions());
    }
  }, [dispatch, user]);

  return (
    <div className="w-full h-full bg-white rounded-md p-4 overflow-auto text-center">
      <div className="flex font-bold mb-5">
        <span className="w-full">Data da transação</span>
        <span className="w-full">Categoria da transação</span>
        <span className="w-full">Valor da transação</span>
      </div>
      {transactions.length === 0 ? (
        <div className="text-gray-500 mt-4">Nenhuma transação encontrada</div>
      ) : (
        transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex mb-2 pb-2 border-b border-gray-300"
          >
            <span className="w-full">
              {new Date(transaction.date.replace(/-/g, "/")).toLocaleDateString(
                "pt-BR"
              )}
            </span>
            <span className="w-full">{transaction.category}</span>
            <span className="w-full">R$ {transaction.value}</span>
          </div>
        ))
      )}
    </div>
  );
}
