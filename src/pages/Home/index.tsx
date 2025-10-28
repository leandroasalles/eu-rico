import Header from "../../components/Header";
import SideMenu from "../../components/sideMenu";
import ResumeCard from "../../components/Cards/resumeCard";
import { useState, useEffect } from "react";

function Home() {
  const [saldo, setSaldo] = useState(0);
  const [receitas, setReceitas] = useState(500);
  const [despesas, setDespesas] = useState(-100);

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
        <div className="w-full flex justify-evenly">
          <ResumeCard title="Saldo atual" value={saldo} />
          <ResumeCard title="Receitas" value={receitas} />
          <ResumeCard title="Despesas" value={despesas} />
        </div>
      </div>
    </div>
  );
}

export default Home;
