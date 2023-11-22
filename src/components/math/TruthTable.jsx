const TruthTable = ({ booleanEquations, symbols }) => {
  const getUniqueVariables = (equations) => {
    const uniqueVariables = [];
    const booleanSymbols = Object.values(symbols);
    const otherSymbols = [" ", "(", ")"];
    const symbolsToRemove = [...booleanSymbols, ...otherSymbols];

    equations.forEach((equation) => {
      let equationWithoutSymbols = equation;
      symbolsToRemove.forEach((symbol) => {
        equationWithoutSymbols = equationWithoutSymbols.replaceAll(symbol, "");
      });
      equationWithoutSymbols.split("").forEach((character) => {
        uniqueVariables.push(character);
      });
    });

    return [...new Set(uniqueVariables)];
  };

  const uniqueVariables = getUniqueVariables(booleanEquations);

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
  const inputRows = generateInputRows(uniqueVariables.length);

  const variableRowValues = [];
  inputRows.forEach((row, rowIndex) => {
    const rowValue = {};
    uniqueVariables.forEach((variable, variableIndex) => {
      rowValue[variable] = inputRows[rowIndex][variableIndex] == "T" ? 1 : 0;
    });
    variableRowValues.push(rowValue);
  });

  const formatNotOperator = (inputString, notSymbol) => {
    const characters = inputString.split("");

    for (let i = 0; i < characters.length; i++) {
      if (characters[i] == notSymbol) {
        if (characters[i - 1] != ")") {
          [characters[i], characters[i - 1]] = [characters[i - 1], "!"];
        } else {
          let rightParCount = 1;
          let k = i - 2;
          while (rightParCount != 0 && k >= 0) {
            if (characters[k] == ")") {
              rightParCount++;
            }
            if (characters[k] == "(") {
              rightParCount--;
            }
            --k;
          }
          k += 1;
          for (let j = i; j > k; j--) {
            characters[j] = characters[j - 1];
          }
          characters[k] = "!";
        }
      }
    }
    const result = characters.join("");
    return result;
  };

  const formatExpression = (expression, variableValues) => {
    let modifiedExpression = expression;

    modifiedExpression = formatNotOperator(modifiedExpression, symbols["not"]);
    uniqueVariables.forEach((variable) => {
      modifiedExpression = modifiedExpression.replaceAll(
        variable,
        variableValues[variable]
      );
    });
    modifiedExpression = modifiedExpression.replaceAll(symbols["and"], "&");
    modifiedExpression = modifiedExpression.replaceAll(symbols["or"], "|");
    modifiedExpression = modifiedExpression.replaceAll(" ", "");
    return modifiedExpression;
  };

  const evaluateExpressionWithoutParentheses = (expression) => {
    let result = expression;

    // Evaluating negations
    for (let i = 0; i < result.length; i++) {
      if (result[i] === "!") {
        result =
          result.slice(0, i) +
          (result[i + 1] == "1" ? "0" : "1") +
          result.slice(i + 2);
      }
    }
    // Evaluating ANDs
    for (let i = 0; i < result.length; i++) {
      if (result[i] === "&") {
        result =
          result.slice(0, i - 1) +
          (result[i - 1] == "1" && result[i + 1] == "1" ? "1" : "0") +
          result.slice(i + 2);
        i--;
      }
    }
    // Evaluating ORs
    for (let i = 0; i < result.length; i++) {
      if (result[i] === "|") {
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

  return (
    <div className="flex flex-row justify-center gap-2">
      <table className="border-collapse bg-white text-rtools-blue-200 rounded-tl-2xl rounded-bl-2xl">
        <thead>
          <tr>
            {uniqueVariables.map((variable, key) => (
              <th
                key={key}
                className={`text-center border-black p-2 ${
                  key === uniqueVariables.length - 1
                    ? `border-b`
                    : `border-r border-b`
                }`}
              >
                {variable}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {inputRows.map((row, key) => (
            <tr key={key}>
              {row.map((character, key2) => (
                <td
                  key={key2}
                  className={`border-black p-4 text-center
                    ${key === inputRows.length - 1 ? `` : `border-t border-b`}
                    ${key2 === row.length - 1 ? `` : `border-r`}`}
                >
                  {character}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <table className="border-collapse bg-white text-rtools-blue-200 rounded-tr-2xl rounded-br-2xl">
        <thead>
          <tr>
            {booleanEquations.map((equation, key) => (
              <th
                key={key}
                className={`whitespace-nowrap text-center border-black p-2 ${
                  key === booleanEquations.length - 1
                    ? `border-b`
                    : `border-r border-b`
                }`}
              >
                {equation}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from(
            { length: Math.pow(2, uniqueVariables.length) },
            (_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from(
                  { length: booleanEquations.length },
                  (_, columnIndex) => (
                    <td
                      key={columnIndex}
                      className={`border-black p-4 text-center
                    ${
                      rowIndex ===
                      Math.pow(2, uniqueVariables.length).length - 1
                        ? ``
                        : `border-t`
                    }
                    ${
                      columnIndex === booleanEquations.length - 1
                        ? ``
                        : `border-r`
                    }`}
                    >
                      {evaluateExpression(
                        formatExpression(
                          booleanEquations[columnIndex],
                          variableRowValues[rowIndex]
                        )
                      )}
                    </td>
                  )
                )}
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TruthTable;
