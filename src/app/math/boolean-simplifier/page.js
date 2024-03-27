"use client";

import BoolWrapper from "@/components/math/BoolWrapper";
import kMapSolver from "@/util/math/KMap";
import { formatInput, generateTable } from "@/util/math/TruthTable";
import { useState } from "react";

const page = () => {
  const [value, setValue] = useState("(A*B)+(!A*C)+((A+B)*C)");
  const [expression, setExpression] = useState("");
  const [symbols, setSymbols] = useState({ and: "*", or: "+", not: "!" });

  const [expressionSOP, setExpressionSOP] = useState("");
  const onClick = () => {
    try {
      const formatedInput = formatInput(value, symbols);
      setExpression(formatedInput);
      const table = generateTable(formatedInput); // might return null if failed
      if (table !== null) {
        const { result, variables } = table;
        const { expressionSOP } = kMapSolver(result, variables);
        setExpressionSOP(expressionSOP);
      } else throw new Error("could not generate table");
    } catch (error) {
      console.info("crashed while in kmap solver");
      console.error(error);
      setExpressionSOP("???");
    }
  };

  return (
    <>
      <BoolWrapper
        title="Boolean Equation Simplifier"
        value={value}
        setValue={setValue}
        symbols={symbols}
        setSymbols={setSymbols}
        onClick={onClick}
        description="Input a boolean expression\n\nAdjust individual boolean operators by modifying the symbol box next to its respective operator located below the input box."
      />
      {expression && (
        <div className="flex items-center justify-center m-1">
          <div>Eq:</div>
          <div className="bg-rtools-blue-300 p-2 px-4 rounded-md ml-2">
            {expression}
          </div>
        </div>
      )}
      {expressionSOP && (
        <div className="flex items-center justify-center m-1">
          <div>SOP:</div>
          <div className="bg-rtools-blue-300 p-2 px-4 rounded-md ml-2">
            {expressionSOP}
          </div>
        </div>
      )}
    </>
  );
};

export default page;
