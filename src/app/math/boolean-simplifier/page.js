"use client";

import BoolWrapper from "@/components/math/BoolWrapper";
import kMapSolver from "@/util/math/KMap";
import { formatInput, generateTable } from "@/util/math/TruthTable";
import { useState, useEffect } from "react";

const page = () => {
  const [value, setValue] = useState("(A*B)+(!A*C)+((A+B)*C)");
  const [expression, setExpression] = useState("");
  const [symbols, setSymbols] = useState({ and: "*", or: "+", not: "!" });

  const [expressionSOP, setExpressionSOP] = useState("");

  useEffect(() => {
    try {
      setExpression(formatInput(value, symbols));
      const table = generateTable(expression); // might return null if failed
      console.log(table);
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
  }, [value, symbols]);

  return (
    <>
      <BoolWrapper
        title="Boolean Equation Simplifier"
        value={value}
        setValue={setValue}
        symbols={symbols}
        setSymbols={setSymbols}
        description="Input a boolean expression\n\nAdjust individual boolean operators by modifying the symbol box next to its respective operator located below the input box."
      />
      <div>{"Eq:" + expression}</div>
      <div>{"SOP:" + expressionSOP}</div>
    </>
  );
};

export default page;
