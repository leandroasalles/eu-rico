interface ButtonProps {
  text: string;
  onSubmitRegister: (e: React.FormEvent<HTMLFormElement>) => void;
}

function Button({ text, onSubmitRegister }: ButtonProps) {
  return (
    <button
      onClick={(e) => onSubmitRegister(e)}
      className="bg-primary-red text-white px-4 py-2 rounded-md w-full hover:bg-primary-red/50 transition-all duration-300 cursor-pointer"
    >
      {text}
    </button>
  );
}

export default Button;
