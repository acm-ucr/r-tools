import React from "react";

const BoolToolBar = ({ symbols, setSymbols }) => {
  return (
    <div className="flex flex-row gap-4 max-w-xs">
      {Object.entries(symbols).map(([symbol, value], index) => (
        <div className="flex gap-1" key={index}>
          <p>{symbol}:</p>
          <div
            key={index}
            className="bg-rtools-blue-300 flex justify-center items-center w-12 h-6 rounded"
          >
            <input
              className="bg-transparent w-8 h-6 rounded outline-none"
              value={symbols[symbol]}
              type="text"
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
