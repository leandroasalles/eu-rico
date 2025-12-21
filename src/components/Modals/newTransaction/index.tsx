import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { type TransactionData } from "../../../types/transaction";
import { db } from "../../../services/firebase/firebaseconnection";
import { collection, addDoc } from "firebase/firestore";
import { v4 as createUuid } from "uuid";
import { getTransactions } from "../../../redux/slices/transactionsSlice";
import { categoriesList } from "../../../types/categoriesList";

interface NewTransactionModalProps {
  onClose: () => void;
}

function NewTransactionModal({ onClose }: NewTransactionModalProps) {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<TransactionData>({
    id: "",
    value: null,
    date: "",
    category: "",
    userId: user?.uid || "",
  });
  const [error, setError] = useState<string | null>(null);

  function formatCurrencyValue(value: string): string {
    if (value === "") {
      return "";
    }
    const formatedValue = (Number(value) / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    return formatedValue.toString();
  }

  function sanitizateValue(value: string): string {
    return value.replace(/\D/g, "");
  }

  function isCategoryValid(): boolean {
    return formData.category !== "" && formData.category !== "select_category";
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user) {
      return;
    }

    if (!isCategoryValid()) {
      setError("Selecione uma categoria");
      return;
    }

    const transactionsCollection = collection(db, "transactions");
    const newTransaction = {
      id: createUuid(),
      value: formData.value,
      date: formData.date,
      category: formData.category,
      userId: user?.uid || "",
    };
    await addDoc(transactionsCollection, newTransaction);
    dispatch(getTransactions(user?.uid));
    onClose();
  }

  return (
    <div className="fixed w-full h-full bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-md flex flex-col gap-2 items-end w-full max-w-lg">
        <AiOutlineClose onClick={onClose} className="cursor-pointer" />
        <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
          <label htmlFor="value">Valor</label>
          <input
            id="value"
            type="text"
            placeholder="Ex: 100,00"
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-1 border-gray-300 rounded-md p-2"
            required
            value={formData.value ?? ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                value: formatCurrencyValue(sanitizateValue(e.target.value)),
              })
            }
          />
          <label htmlFor="date">Data</label>
          <input
            id="date"
            type="date"
            placeholder="Data"
            required
            className="border-1 border-gray-300 rounded-md p-2"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          <label htmlFor="category">Categoria</label>
          <select
            id="category"
            name="category"
            className="border-1 border-gray-300 rounded-md p-2"
            value={formData.category || "select_category"}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="select_category" disabled>
              Selecione uma categoria
            </option>
            {categoriesList.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="bg-green-600 text-white rounded-md border-black border-1 cursor-pointer hover:bg-green-700 transition-all duration-300 mt-4"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewTransactionModal;
