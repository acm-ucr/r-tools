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

  const description =
    "Input a boolean expression like: A & B | C | (A' & B | C')\n\nClick ADD to add the inputted expression to the expressions list that are shown as a column on the truth table.\n\nRemove expressions from the expressions list by hovering over the expression table and clicking the cross.\n\nAdjust individual boolean operators by modifying the symbol box next to its respective operator located below the input box.";

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
        description={description}
      />
      <div className="flex items-start flex-wrap gap-16 justify-center h-full">
        <Equations equations={equations} setEquations={setEquations} />
        <TruthTable booleanEquations={equations} symbols={symbols} />
      </div>
    </div>
  );
};

export default page;
