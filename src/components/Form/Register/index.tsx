import { auth } from "../../../services/firebase/firebaseconnection";
import {
  createUserWithEmailAndPassword,
  // updateProfile,
  // onAuthStateChanged,
} from "firebase/auth";

import Button from "../button";
import { useState } from "react";

interface FormRegisterProps {
  toggleOptions: () => void;
}

interface UserData {
  nome: string;
  email: string;
  senha: string;
}

function FormRegister({ toggleOptions }: FormRegisterProps) {
  const [userDataRegister, setUserDataRegister] = useState<UserData>({
    nome: "",
    email: "",
    senha: "",
  });
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function onSubmitRegister(
    e: React.FormEvent<HTMLFormElement>,
    nome: string,
    email: string,
    senha: string
  ) {
    e.preventDefault();
    const userData: UserData = { nome, email, senha };
    setUserDataRegister(userData);
    handleRegister(userData);
  }

  async function handleRegister(userData: UserData) {
    await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.senha
    ).catch((error) => {
      console.log(error);
    });

    setNome("");
    setEmail("");
    setSenha("");
    setUserDataRegister({
      nome: "",
      email: "",
      senha: "",
    });
  }

  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className=" mb-7 text-5xl">
        Eu <strong className="text-secondary-red">+</strong> Rico
      </h1>
      <div className="relative before:content-[''] before:bg-red-600 before:absolute before:top-0 before:h-full before:w-full before:z-[-1] before:opacity-50 before:rounded-lg before:blur-xs">
        <form
          className="flex flex-col p-5 items-center justify-center h-full w-full gap-5 z-10"
          onSubmit={(e) => onSubmitRegister(e, nome, email, senha)}
        >
          <h1 className="text-2xl font-bold">Login</h1>
          <div className="flex flex-col gap-1">
            <label htmlFor="Email">Nome</label>
            <input
              type="text"
              placeholder="Nome"
              className="bg-slate-100 text-slate-500 w-sm"
              onChange={(e) => setNome(e.target.value)}
              value={nome}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="Email">Email</label>
            <input
              type="text"
              placeholder="Ex: teste@teste.com"
              className="bg-slate-100 text-slate-500 w-sm"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="Password">Senha</label>
            <input
              type="password"
              placeholder="Password"
              className="bg-slate-100 text-slate-500 w-sm"
              onChange={(e) => setSenha(e.target.value)}
              value={senha}
            />
          </div>
          <Button text="Registrar" />
          <div className="flex justify-between w-full">
            <span className="text-xs">Lembrar senha</span>
            <span className="text-xs">
              Já tem conta:{" "}
              <span onClick={() => toggleOptions()} className="cursor-pointer">
                Faça login!
              </span>
            </span>
          </div>
        </form>
      </div>
    </main>
  );
}

export default FormRegister;
