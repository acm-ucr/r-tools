"use client";

import Input from "@/components/Input";
import kMapSolver from "@/util/math/KMap";
import { generateTable } from "@/util/math/TruthTable";
import { useState, useEffect } from "react";

const page = () => {
  const [expression, setExpression] = useState("(A*B)+(A*C)+((A+B)*C)");
  const [symbols] = useState({ and: "*", or: "+", not: "!" });

  const [expressionSOP, setExpressionSOP] = useState("");
  useEffect(() => {
    try {
      const table = generateTable(expression, symbols); // might return null if failed
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
  }, [expression, symbols]);

  return (
    <div className="flex flex-col">
      <Input value={expression} setValue={setExpression}></Input>
      <div>{"Eq:" + expression}</div>
      <div>{"SOP:" + expressionSOP}</div>
    </div>
  );
};

export default page;
