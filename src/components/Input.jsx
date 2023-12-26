const Input = ({
  placeholder,
  button,
  onClick,
  value,
  setValue,
  clear,
  thick,
}) => {
  const handleClear = () => {
    setValue("");
  };
  const handleInputChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };
  return (
    <form
      className="justify-center flex items-center w-full"
      onSubmit={(e) => {
        e.preventDefault();
        if (onClick) onClick();
      }}
    >
      <div
        className={`flex rounded-full w-full ${
          thick ? "p-2 px-3" : "p-1"
        } items-center bg-rtools-blue-300`}
      >
        <input
          className="w-full placeholder:text-rtools-blue-100 text-white focus:outline-none bg-transparent px-3"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          type="text"
        />
        {button && (
          <button
            className={`hover:opacity-90 rounded-full text-rtools-blue-400 ${
              thick && "p-2"
            } px-4 bg-rtools-green`}
          >
            {button}
          </button>
        )}
      </div>
      {clear && (
        <button onClick={handleClear} className="px-3">
          clear
        </button>
      )}
    </form>
  );
};

export default Input;
