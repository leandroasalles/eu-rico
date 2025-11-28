interface ButtonProps {
  text: string;
  disabled?: boolean;
}

function Button({ text, disabled = false }: ButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="bg-primary-red text-white px-4 py-2 rounded-md w-full hover:bg-primary-red/50 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {text}
    </button>
  );
}

export default Button;
