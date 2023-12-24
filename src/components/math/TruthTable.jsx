import {
  getUniqueVariables,
  generateInputRows,
  formatExpression,
  evaluateExpression,
} from "@/util/math/TruthTable";

const TruthTable = ({ booleanEquations, symbols }) => {
  const uniqueVariables = getUniqueVariables(booleanEquations, symbols);
  const inputRows = generateInputRows(uniqueVariables.length);
  const variableRowValues = [];
  inputRows.forEach((row, rowIndex) => {
    const rowValue = {};
    uniqueVariables.forEach((variable, variableIndex) => {
      rowValue[variable] = inputRows[rowIndex][variableIndex] == "T" ? 1 : 0;
    });
    variableRowValues.push(rowValue);
  });

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
                          variableRowValues[rowIndex],
                          uniqueVariables,
                          symbols
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
