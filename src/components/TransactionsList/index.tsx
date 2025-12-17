export default function TransactionsList() {
  return (
    <div className="w-full h-full bg-white rounded-md p-4 overflow-auto text-center">
      <div className="flex font-bold mb-5">
        <span className="w-full">Data da transação</span>
        <span className="w-full">Categoria da transação</span>
        <span className="w-full">Valor da transação</span>
      </div>
      <div className="flex mb-2 pb-2 border-b border-gray-300">
        <span className="w-full">Data</span>
        <span className="w-full">Salão</span>
        <span className="w-full">R$ 235,55</span>
      </div>
    </div>
  );
}
