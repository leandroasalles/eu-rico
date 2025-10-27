import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

function SideMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`transition-all duration-300 ease-in-out h-full bg-primary-red p-4 flex flex-col gap-8 ${
        isOpen ? "w-64" : "w-18"
      }`}
    >
      <AiOutlineMenu
        className="text-white text-4xl cursor-pointer hover:text-secondary-red"
        onClick={() => setIsOpen(!isOpen)}
      />
      <ul
        className={`flex flex-col gap-8  transition-all duration-200 ease-in-out whitespace-nowrap ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        <li className="text-white text-2xl border-b border-white cursor-pointer hover:text-secondary-red">
          Dashboard
        </li>
        <li className="text-white text-2xl border-b border-white cursor-pointer hover:text-secondary-red">
          Transações
        </li>
        <li className="text-white text-2xl border-b border-white cursor-pointer hover:text-secondary-red">
          Meu porquinho
        </li>
      </ul>
    </nav>
  );
}

export default SideMenu;
