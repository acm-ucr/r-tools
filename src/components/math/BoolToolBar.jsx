"use client";
import React from "react";

const BoolToolBar = ({ and, or, not, setAnd, setOr, setNot }) => {
  const symbols = { and: "&", or: "|", not: "~" };

  function setSymbols(symbol, userInput) {
    switch (symbol) {
      case "and":
        setAnd(userInput);
        break;
      case "or":
        setOr(userInput);
        break;
      case "not":
        setNot(userInput);
        break;
      default:
        break;
    }
  }

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
              defaultValue={value}
              value={symbols[index]}
              onChange={(e) => {
                setSymbols(index, e.target.value);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BoolToolBar;
