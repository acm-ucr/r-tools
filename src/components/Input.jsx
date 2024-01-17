const Input = ({
  placeholder,
  button,
  onSubmit,
  value,
  setValue,
  clear,
  thick,
  onClick,
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
      onClick={onClick}
      className="justify-center flex items-center w-full"
      onSubmit={(e) => {
        e.preventDefault();
        if (onSubmit) onSubmit();
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
        <div onClick={handleClear} className="px-3">
          clear
        </div>
      )}
    </form>
  );
};

export default Input;
