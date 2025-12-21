import { AiOutlineLogout } from "react-icons/ai";
import { useAppDispatch } from "../../redux/hooks";
import { logoutUser } from "../../redux/slices/userSlice";

function Header() {
  const dispatch = useAppDispatch();
  return (
    <header className="w-full h-20 bg-primary-red flex items-center justify-center">
      <div>
        <h1 className="text-5xl text-white">
          Eu <strong className="text-secondary-red">+</strong> Rico
        </h1>
      </div>
      <div className="absolute right-0">
        <button onClick={() => dispatch(logoutUser())}>
          <AiOutlineLogout color="white" size={25} className="cursor-pointer" />
        </button>
      </div>
    </header>
  );
}

export default Header;
