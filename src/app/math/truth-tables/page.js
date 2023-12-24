"use client";

import BoolWrapper from "@/components/math/BoolWrapper";
import Equations from "@/components/math/Equations";
import TruthTable from "@/components/math/TruthTable";
import { useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const [equations, setEquations] = useState([]);
  const [value, setValue] = useState("");
  const [symbols, setSymbols] = useState({ and: "&", or: "|", not: "!" });

  const onClick = () => {
    if (value === "") {
      toast("Please enter an equation");
      return;
    }
    const formatedEquation = value
      .replaceAll(/\s/g, "")
      .replaceAll(symbols.and, "∧")
      .replaceAll(symbols.or, "∨")
      .replaceAll(symbols.not, "¬");
    const valid = new RegExp(
      "^(([()]*)([¬]*)[A-Za-z ]([∧∨]([(]*)([¬]*)[A-Za-z][)]*)*)$",
      "g"
    );

    if (!valid.test(formatedEquation)) {
      toast("❌ Please enter a valid equation");
      return;
    }
    if (equations.includes(formatedEquation)) {
      toast("❌ Equation already exists");
      return;
    }
    setEquations([...equations, formatedEquation]);
    setValue("");
  };
  const description =
    "Input a boolean expression\n\nClick ADD to add the inputted expression to the expressions list that are shown as a column on the truth table.\n\nRemove expressions from the expressions list by hovering over the expression table and clicking the cross.\n\nAdjust individual boolean operators by modifying the symbol box next to its respective operator located below the input box.";

  return (
    <>
      <BoolWrapper
        title="Truth Table Generator"
        onClick={onClick}
        value={value}
        setValue={setValue}
        symbols={symbols}
        setSymbols={setSymbols}
        description={description}
      />
      <div className="flex gap-3">
        <Equations equations={equations} setEquations={setEquations} />
        <TruthTable booleanEquations={equations} symbols={symbols} />
      </div>
    </>
  );
};

export default page;
