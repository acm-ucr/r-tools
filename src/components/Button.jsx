const Button = ({ onClick, text }) => {
  return (
    <button
      className="transition duration-200 ease-in-out rounded-full text-rtools-blue-400 p-2 spx-4 bg-rtools-green hover:opacity-80"
      onClick={onClick}
    >
      {text}
    </button>
  );
};


export default Button;
