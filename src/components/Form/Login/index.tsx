import Button from "../button";

interface FormLoginProps {
  toggleOptions: () => void;
}

function FormLogin({ toggleOptions }: FormLoginProps) {
  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className=" mb-7 text-5xl">
        Eu <strong className="text-secondary-red">+</strong> Rico
      </h1>
      <div className="relative before:content-[''] before:bg-red-600 before:absolute before:top-0 before:h-full before:w-full before:z-[-1] before:opacity-50 before:rounded-lg before:blur-xs">
        <form
          action=""
          className="flex flex-col p-5 items-center justify-center h-full w-full gap-5 z-10"
        >
          <h1 className="text-2xl font-bold">Login</h1>
          <div className="flex flex-col gap-1 ">
            <label htmlFor="Email">Email</label>
            <input
              type="text"
              placeholder="Ex: teste@teste.com"
              className="bg-slate-100 text-slate-500 w-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="Password">Senha</label>
            <input
              type="password"
              placeholder="Password"
              className="bg-slate-100 text-slate-500 w-sm"
            />
          </div>
          <Button text="Login" />
          <div className="flex justify-between w-full">
            <span className="text-xs">Lembrar senha</span>
            <div>
              <span className="text-xs flex">
                Ainda não tem conta:{" "}
                <p onClick={() => toggleOptions()} className=" cursor-pointer">
                  Registre-se
                </p>
              </span>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

export default FormLogin;
