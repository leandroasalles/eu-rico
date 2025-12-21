import FormLogin from "../../components/Form/Login";
import FormRegister from "../../components/Form/Register";
import { useState, useEffect } from "react";
import { Navigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { checkAuthState } from "../../redux/slices/userSlice";

function Login() {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [showSlogan, setShowSlogan] = useState(true);
  const [showSloganRegister, setShowSloganRegister] = useState(false);
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  function toggleOptions() {
    loginToggle();
    registerToggle();
    sloganLoginToggle();
    sloganRegisterToggle();
  }

  function loginToggle() {
    let showLoginVariable = showLogin;
    showLoginVariable = !showLoginVariable;
    setShowLogin(showLoginVariable);
    if (showLoginVariable) {
      document
        .getElementById("login")
        ?.classList.add("animate-fade-login-right");
      document
        .getElementById("login")
        ?.classList.remove("animate-fade-login-left");
      return;
    }
    document
      .getElementById("login")
      ?.classList.remove("animate-fade-login-right");
    document.getElementById("login")?.classList.add("animate-fade-login-left");
  }

  function registerToggle() {
    let showRegisterVariable = showRegister;
    showRegisterVariable = !showRegisterVariable;
    setShowRegister(showRegisterVariable);
    if (showRegisterVariable) {
      document
        .getElementById("register")
        ?.classList.add("animate-fade-register-left");
      document
        .getElementById("register")
        ?.classList.remove("animate-fade-register-right");
      return;
    }
    document
      .getElementById("register")
      ?.classList.add("animate-fade-register-right");
    document
      .getElementById("register")
      ?.classList.remove("animate-fade-register-left");
  }

  function sloganLoginToggle() {
    let showSloganVariable = showSlogan;
    showSloganVariable = !showSloganVariable;
    setShowSlogan(showSloganVariable);
    if (showSloganVariable) {
      document
        .getElementById("slogan-login")
        ?.classList.add("animate-show-slogan");
      document
        .getElementById("slogan-login")
        ?.classList.remove("animate-fade-slogan");
      return;
    }
    document
      .getElementById("slogan-login")
      ?.classList.add("animate-fade-slogan");
    document
      .getElementById("slogan-login")
      ?.classList.remove("animate-show-slogan");
  }

  function sloganRegisterToggle() {
    let showSloganRegisterVariable = showSloganRegister;
    showSloganRegisterVariable = !showSloganRegisterVariable;
    setShowSloganRegister(showSloganRegisterVariable);
    if (showSloganRegisterVariable) {
      document
        .getElementById("slogan-register")
        ?.classList.add("animate-show-slogan");
      document
        .getElementById("slogan-register")
        ?.classList.remove("animate-fade-slogan");
      return;
    }
    document
      .getElementById("slogan-register")
      ?.classList.add("animate-fade-slogan");
    document
      .getElementById("slogan-register")
      ?.classList.remove("animate-show-slogan");
  }
  return (
    <main className="bg-secondary-red h-svh w-full flex items-center justify-center text-white overflow-hidden">
      <div
        id="login"
        className="flex items-center justify-center h-full w-full bg-primary-red z-10 opacity-1 animate-fade-login-right relative"
      >
        <FormLogin toggleOptions={toggleOptions} />
        <div className="w-48 h-48 rounded-full absolute top-0 right-[-9%] bg-[#A82323]"></div>
        <div className="w-48 h-48 rounded-full absolute top-28 right-[-14%] bg-[#431010]"></div>
      </div>
      <div
        id="slogan-login"
        className="absolute right-[15%] flex flex-col items-end gap-3 opacity-1 animate-show-slogan"
      >
        <span className="text-7xl font-bold">
          Eu <span className="text-primary-red">+</span> Rico,
        </span>
        <span className="text-5xl">você com mais</span>
        <strong className="text-5xl">controle!</strong>
        <span className="text-5xl">você com mais</span>
        <strong className="text-5xl">riqueza!</strong>
      </div>
      <div
        id="register"
        className="flex items-center justify-center h-full w-full bg-primary-red z-10 opacity-0 "
      >
        <FormRegister toggleOptions={toggleOptions} />
        <div className="w-48 h-48 rounded-full absolute top-0 left-[-9%] bg-[#A82323]"></div>
        <div className="w-48 h-48 rounded-full absolute top-28 left-[-14%] bg-[#431010]"></div>
      </div>
      <div
        id="slogan-register"
        className="absolute right-[65%] flex flex-col items-end gap-3 opacity-0 z-0"
      >
        <span className="text-7xl font-bold">
          Eu <span className="text-primary-red">+</span> Rico,
        </span>
        <span className="text-5xl">você com mais</span>
        <strong className="text-5xl">controle!</strong>
        <span className="text-5xl">você com mais</span>
        <strong className="text-5xl">riqueza!</strong>
      </div>
    </main>
  );
}

export default Login;
