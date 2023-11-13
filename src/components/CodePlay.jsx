const CodePlay = ({ code, currLine }) => {
  return (
    <div className="rounded-lg bg-rtools-blue-300">
      <div className="flex justify-between p-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-full bg-rtools-pink-200" />
          <div className="p-1.5 rounded-full bg-rtools-yellow-200" />
          <div className="p-1.5 rounded-full bg-rtools-teal-200" />
        </div>
      </div>
      <hr className="p-0 m-0 opacity-100 border-3 text-rtools-blue-100" />
      <div className={`rounded-xl bg-[#1e1e1e] w-full p-1 mx-2.5 my-3`}>
        {code.map((line, index) => (
          <div
            key={index}
            className={`${
              index === currLine ? "bg-blue-400/40" : "bg-transparent"
            }`}
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodePlay;
