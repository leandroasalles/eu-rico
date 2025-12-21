import Header from "../../components/Header";
import SideMenu from "../../components/SideMenu";
import ResumeCard from "../../components/Cards/resumeCard";
import NewTransactionModal from "../../components/Modals/newTransaction";
import TransactionsList from "../../components/TransactionsList";
import { useAppSelector } from "../../redux/hooks";
import { useState, useEffect } from "react";

function Home() {
  const [saldo, setSaldo] = useState(0);
  const [receitas, setReceitas] = useState(0);
  const [despesas, setDespesas] = useState(0);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);
  const { transactions } = useAppSelector((state) => state.transactions);
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
