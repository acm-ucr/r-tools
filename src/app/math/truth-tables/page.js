"use client";

import BoolWrapper from "@/components/math/BoolWrapper";
import TruthTable from "@/components/math/TruthTable";
import Equations from "@/components/math/Equations";
import { useState } from "react";

const page = () => {
  const [equations, setEquations] = useState([
    "x | y",
    "x & y & z",
    "x' | y'",
    "x | (y & z)",
    "x & (y' | z)",
  ]);
  const [value, setValue] = useState("");
  const [symbols, setSymbols] = useState({ and: "&", or: "|", not: "'" });
  const [update, setUpdate] = useState(false); // Used to force an update lol
  const onClick = () => {
    const newUpdate = !update;
    setUpdate(newUpdate);
    const oldEquations = equations;
    oldEquations.push(value);
    setEquations(oldEquations);
  };

  const onChange = (e) => {};

  return (
    <div key={update}>
      <BoolWrapper
        title="Truth Table Generator"
        onClick={onClick}
        value={value}
        setValue={setValue}
        onChange={onChange}
        symbols={symbols}
        setSymbols={setSymbols}
      />
      <div className="flex items-start flex-wrap gap-16 justify-center h-full">
        <Equations equations={equations} setEquations={setEquations} />
        <TruthTable booleanEquations={equations} symbols={symbols} />
      </div>
    </div>
  );
};

export default page;
