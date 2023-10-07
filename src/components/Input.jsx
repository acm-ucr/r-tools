const Input = ({
  placeholder,
  button,
  onClick,
  dropDown,
  value,
  setValue,
  clear,
}) => {
  const handleClear = () => {
    setValue("");
  };
  const handleInputChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };
  return (
    <div className="justify-center flex items-center">
      <div className="flex rounded-full w-full px-3 p-2 items-center bg-rtools-blue-300">
        <div className="flex px-3 w-full">
          <input
            className="w-full text-rtools-blue-100 focus:outline-none bg-transparent "
            placeholder={placeholder}
            value={value}
            onChange={handleInputChange}
          />
        </div>
        <button
          className="rounded-full text-rtools-blue-400 p-2 px-4 bg-rtools-green"
          onClick={onClick}
        >
          {button}
        </button>
      </div>
      {clear && (
        <button onClick={handleClear} className="px-3">
          clear
        </button>
      )}
    </div>
  );
};

export default Input;
