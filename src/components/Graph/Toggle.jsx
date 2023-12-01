const Toggle = ({ label, toggle, setToggle }) => {
  const handleClick = () => {
    setToggle(!toggle);
  };
  return (
    <button onClick={handleClick} className="flex gap-2">
      <div>{label}</div>
      {toggle ? (
        <div className="bg-rtools-blue-300 flex gap-1 rounded-full p-1">
          <div className="p-2 rounded-full " />
          <div className="p-2 rounded-full bg-rtools-green" />
        </div>
      ) : (
        <div className="bg-rtools-blue-300 flex gap-1 rounded-full p-1">
          <div className="p-2 rounded-full bg-rtools-blue-200" />
          <div className="p-2 rounded-full " />
        </div>
      )}
    </button>
  );
};

export default Toggle;
