"use client"; // This is a client component

import React from "react";
import { useState } from "react";

const BoolToolBar = () => {
  const [and, setAnd] = useState("");
  const [or, setOr] = useState("");
  const [not, setNot] = useState("");

  function isAnd(input) {
    setAnd(input.target.value);
  }

  function isOr(input) {
    setOr(input.target.value);
  }

  function isNot(input) {
    setNot(input.target.value);
  }

  return (
    <div className=" flex-col grid max-w-xs grid-cols-3">
      <div className="flex-col grid w-20 grid-cols-2">
        <p>and:</p>
        <div className="bg-rtools-blue-300 w-12 flex justify-center items-center h-8 rounded">
          <input
            className="bg-transparent w-8 h-8 rounded outline-none"
            value={and}
            onChange={isAnd}
          />
        </div>
      </div>
      <div className="flex-col grid max-w-xs gap-x-20 grid-cols-2">
        <div className="flex-col grid w-12 grid-cols-2">
          <p>or:</p>
          <div className="bg-rtools-blue-300 flex justify-center items-center w-12 h-8 rounded">
            <input
              className="bg-transparent w-8 h-8 rounded outline-none"
              value={or}
              onChange={isOr}
            />
          </div>
        </div>
        <div className="flex-col grid w-20 grid-cols-2">
          <p>not:</p>
          <div className="bg-rtools-blue-300 flex justify-center items-center w-12 h-8 rounded">
            <input
              className="bg-transparent w-8 h-8 rounded outline-none"
              value={not}
              onChange={isNot}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoolToolBar;
