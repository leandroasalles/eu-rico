interface ButtonProps {
  text: string;
}

function Button({ text }: ButtonProps) {
  return (
    <button
      type="submit"
      className="bg-primary-red text-white px-4 py-2 rounded-md w-full hover:bg-primary-red/50 transition-all duration-300 cursor-pointer"
    >
      {text}
    </button>
  );
}

export default Button;
