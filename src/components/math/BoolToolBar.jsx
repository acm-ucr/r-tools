import React from "react";

const BoolToolBar = ({ and, or, not }) => {
  const symbols = { and: "&", or: "|", not: "~" };

  return (
    <div className=" flex-col grid max-w-xs grid-cols-3">
      {Object.entries(symbols).map(([symbol, value], index) => (
        <div className="flex-col grid w-20 grid-cols-2" key={index}>
          <p>{symbol}:</p>
          <div
            key={index}
            className="bg-rtools-blue-300 flex justify-center items-center w-12 h-6 rounded"
          >
            <input
              className="bg-transparent w-8 h-6 rounded outline-none"
              value={value}
              onChange={(e) => {
                setSymbols({ ...symbols, [symbol]: e.target.value });
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BoolToolBar;
