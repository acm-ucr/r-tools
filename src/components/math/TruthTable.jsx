import { useMemo } from "react";
import Table from "../Table";

const TruthTable = ({ booleanEquations }) => {
  const uniqueVariables = useMemo(() => {
    const variables = new Set();
    const symbolsToRemove = ["∧", "∨", "¬", "(", ")"];

    booleanEquations.forEach((equation) => {
      equation.split("").forEach((character) => {
        if (!symbolsToRemove.includes(character)) variables.add(character);
      });
    });
    return [...variables];
  }, [booleanEquations]);

  const generateInputRows = (n) => {
    if (n === 0) {
      return [[]];
    } else {
      const prevArrays = generateInputRows(n - 1);
      return [
        ...prevArrays.map((arr) => ["T", ...arr]),
        ...prevArrays.map((arr) => ["F", ...arr]),
      ];
    }
  };
  const inputRows = useMemo(
    () => generateInputRows(uniqueVariables.length),
    [uniqueVariables]
  );
  const formatExpression = (expression, variableValues) => {
    let modifiedExpression = expression;

    uniqueVariables.forEach((variable) => {
      modifiedExpression = modifiedExpression.replaceAll(
        variable,
        variableValues[variable]
      );
    });
    return modifiedExpression;
  };

  const variableRowValues = useMemo(() => {
    const variableRowValues = [];
    inputRows.forEach((row, rowIndex) => {
      const rowValue = {};
      uniqueVariables.forEach((variable, variableIndex) => {
        rowValue[variable] = inputRows[rowIndex][variableIndex] == "T" ? 1 : 0;
      });
      variableRowValues.push(rowValue);
    });
    return variableRowValues;
  }, [inputRows]);

  const evaluateExpressionWithoutParentheses = (expression) => {
    let result = expression;

    // Evaluating negations
    for (let i = 0; i < result.length; i++) {
      if (result[i] === "¬") {
        result =
          result.slice(0, i) +
          (result[i + 1] == "1" ? "0" : "1") +
          result.slice(i + 2);
      }
    }
    // Evaluating ANDs
    for (let i = 0; i < result.length; i++) {
      if (result[i] === "∧") {
        result =
          result.slice(0, i - 1) +
          (result[i - 1] == "1" && result[i + 1] == "1" ? "1" : "0") +
          result.slice(i + 2);
        i--;
      }
    }
    // Evaluating ORs
    for (let i = 0; i < result.length; i++) {
      if (result[i] === "∨") {
        result =
          result.slice(0, i - 1) +
          (result[i - 1] == "1" || result[i + 1] == "1" ? "1" : "0") +
          result.slice(i + 2);
        i--;
      }
    }

    return result;
  };

  const evaluateExpressionWithParentheses = (expression) => {
    let result = expression;
    for (let i = 0; i < result.length; i++) {
      if (result[i] == "(") {
        let parCount = 1;
        let j = i + 1;
        while (parCount != 0 && j < result.length) {
          if (result[j] == "(") parCount += 1;
          if (result[j] == ")") parCount -= 1;
          j++;
        }
        j--;
        const parRes = evaluateExpressionWithParentheses(
          result.substring(i + 1, j)
        );
        result = result.slice(0, i) + parRes + result.slice(j + 1);
        i = 0;
      }
    }
    return evaluateExpressionWithoutParentheses(result);
  };

  const evaluateExpression = (expression) => {
    try {
      let result = "ERROR";
      const evaluation = evaluateExpressionWithParentheses(expression);
      if (evaluation == "1") result = "T";
      if (evaluation == "0") result = "F";
      return result;
    } catch (error) {
      return "ERROR";
    }
  };

  const generateOutputRows = () => {
    return Array.from(
      { length: Math.pow(2, uniqueVariables.length) },
      (_, rowIndex) =>
        Array.from({ length: booleanEquations.length }, (_, columnIndex) =>
          evaluateExpression(
            formatExpression(
              booleanEquations[columnIndex],
              variableRowValues[rowIndex]
            )
          )
        )
    );
  };

  return (
    <div className="flex flex-row justify-center gap-1 max-h-[50vh] overflow-y-scroll">
      <Table matrix={inputRows} roundedLeft={true} header={uniqueVariables} />
      <Table
        matrix={generateOutputRows()}
        roundedRight={true}
        header={booleanEquations}
      />
    </div>
  );
};

export default TruthTable;
