"use client";

import Input from "../Input";
import BoolToolBar from "./BoolToolBar";
import { useState } from "react";

const BoolWrapper = ({ title }) => {
  const [symbols, setSymbols] = useState({
    and: "&",
    or: "|",
    not: "'",
  });
  const [value, setValue] = useState("");
  const onClick = () => {
    console.log("clicking");
  };
  const onChange = (e) => {
    console.log(`changing: ${e}`);
  };
  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl font-bold">{title}</div>
      <div className="rounded-3xl w-24 h-1.5 my-1 flex-shrink-0 bg-rtools-green" />
      <div className="w-[36rem] mt-9">
        <Input
          placeholder="ex. A & B | C | (A' & B | C')"
          button={"ADD"}
          onClick={onClick}
          value={value}
          setValue={setValue}
          clear={true}
          thick={true}
          onChange={onChange}
        />
      </div>
      <div className="my-3">
        <BoolToolBar symbols={symbols} setSymbols={setSymbols} />
      </div>
    </div>
  );
};

export default BoolWrapper;
