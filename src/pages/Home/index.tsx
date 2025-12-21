import Header from "../../components/Header";
import SideMenu from "../../components/SideMenu";
import ResumeCard from "../../components/Cards/resumeCard";
import NewTransactionModal from "../../components/Modals/newTransaction";
import TransactionsList from "../../components/TransactionsList";

import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import {
  getTransactions,
  filterTransactions,
} from "../../redux/slices/transactionsSlice";

import { useState, useEffect } from "react";

function Home() {
  const dispatch = useAppDispatch();
  const { transactions } = useAppSelector((state) => state.transactions);
  const { user } = useAppSelector((state) => state.user);

  const [saldo, setSaldo] = useState(0);
  const [receitas, setReceitas] = useState(0);
  const [despesas, setDespesas] = useState(0);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);

  useEffect(() => {
    handleReceitas();
    handleDespesas();
    setSaldo(receitas + despesas);
  }, [transactions, receitas, despesas]);

  function handleReceitas() {
    if (transactions.length === 0) {
      setReceitas(0);
      return;
    }
    setReceitas(
      transactions
        .filter((transaction) => transaction.type === "receita")
        .reduce((acc, curr) => acc + Number(curr.value), 0)
    );
  }

  function handleDespesas() {
    if (transactions.length === 0) {
      setDespesas(0);
      return;
    }
    setDespesas(
      transactions
        .filter((transaction) => transaction.type === "despesa")
        .reduce((acc, curr) => acc + Number(curr.value), 0)
    );
  }

  async function handleFilter() {
    if (user) {
      await dispatch(getTransactions({ userUid: user.uid, month: 0, year: 0 }));

      if (month !== 0 && year !== 0) {
        dispatch(filterTransactions({ month: month, year: year }));
      }
      setMonth(0);
      setYear(0);
    }
  }

  return (
    <div className="w-full h-svh flex flex-col bg-background">
      <Header />
      <div className="flex w-full h-full">
        <SideMenu />
        <div className="w-full h-full p-12 flex flex-col overflow-hidden">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-4xl font-bold">Visão geral</h1>
            <button
              onClick={() => setIsNewTransactionModalOpen(true)}
              className="bg-green-600 text-white rounded-md border-black border-1 cursor-pointer hover:bg-green-700 transition-all duration-300"
            >
              Nova transação
            </button>
          </div>
          <div className="w-full flex justify-between">
            <ResumeCard title="Saldo atual" value={saldo} />
            <ResumeCard title="Receitas" value={receitas} />
            <ResumeCard title="Despesas" value={despesas} />
          </div>
          <div className="w-fit flex items-center pb-4 gap-4">
            <select
              name="month"
              id="month"
              value={month}
              className="border-1 border-gray-300 rounded-md bg-white w-full"
              onChange={(e) => setMonth(Number(e.target.value))}
            >
              <option value="0" disabled>
                Selecione um mês
              </option>
              <option value="1">Janeiro</option>
              <option value="2">Fevereiro</option>
              <option value="3">Março</option>
              <option value="4">Abril</option>
              <option value="5">Maio</option>
              <option value="6">Junho</option>
              <option value="7">Julho</option>
              <option value="8">Agosto</option>
              <option value="9">Setembro</option>
              <option value="10">Outubro</option>
              <option value="11">Novembro</option>
              <option value="12">Dezembro</option>
            </select>
            <select
              name="year"
              id="year"
              value={year}
              className="border-1 border-gray-300 rounded-md bg-white w-full"
              onChange={(e) => setYear(Number(e.target.value))}
            >
              <option value="0" disabled>
                Selecione um ano
              </option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>
            <button
              className="bg-green-600 text-white rounded-md border-black border-1 cursor-pointer hover:bg-green-700 transition-all duration-300"
              onClick={handleFilter}
            >
              Filtrar
            </button>
          </div>
          <TransactionsList />
        </div>
      </div>
      {isNewTransactionModalOpen && (
        <NewTransactionModal
          onClose={() => setIsNewTransactionModalOpen(false)}
        />
      )}
    </div>
  );
}

export default Home;
