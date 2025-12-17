import Header from "../../components/Header";
import SideMenu from "../../components/SideMenu";
import ResumeCard from "../../components/Cards/resumeCard";
import NewTransactionModal from "../../components/Modals/newTransaction";
import TransactionsList from "../../components/TransactionsList";
import { useState, useEffect } from "react";

function Home() {
  const [saldo, setSaldo] = useState(0);
  const [receitas, setReceitas] = useState(500);
  const [despesas, setDespesas] = useState(-100);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);
  useEffect(() => {
    handleSaldo();
  }, [receitas, despesas]);

  function handleSaldo() {
    const saldo = [receitas, despesas];
    const saldoTotal = saldo.reduce((acc, curr) => acc + curr, 0);
    setSaldo(saldoTotal);
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
