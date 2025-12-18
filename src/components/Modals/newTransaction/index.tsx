import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface NewTransactionModalProps {
  onClose: () => void;
}

interface NewTransactionFormData {
  description: string;
  value: string | null;
  date: string;
  category: string;
}

function NewTransactionModal({ onClose }: NewTransactionModalProps) {
  const [formData, setFormData] = useState<NewTransactionFormData>({
    description: "",
    value: null,
    date: "",
    category: "",
  });

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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(formData);
    onClose();
  }

  return (
    <div className="fixed w-full h-full bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-md flex flex-col gap-2 items-end w-full max-w-lg">
        <AiOutlineClose onClick={onClose} className="cursor-pointer" />
        <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
          <label htmlFor="description">Descrição</label>
          <input
            id="description"
            type="text"
            placeholder="Descrição"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <label htmlFor="value">Valor</label>
          <input
            id="value"
            type="text"
            placeholder="Ex: 100,00"
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          <label htmlFor="category">Categoria</label>
          <select
            id="category"
            name="category"
            value={formData.category || "select_category"}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="select_category" disabled>
              Selecione uma categoria
            </option>
            <option value="receita">Receita</option>
            <option value="despesa">Despesa</option>
            <option value="investimento">Investimento</option>
          </select>
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
