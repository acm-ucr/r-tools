class TruthTableUtils {
  /**
   * Takes a list of equations (strings) and symbols to get unique variables
   * @param {Array.<string>} equations equations to process
   * @return {Array.<string>} a list of unique variables seen in the equations
   */
  static getUniqueVariables(equations) {
    const variables = new Set();
    const symbolsToRemove = ["∧", "∨", "¬", "(", ")"];

    equations.forEach((equation) => {
      equation.split("").forEach((character) => {
        if (!symbolsToRemove.includes(character)) variables.add(character);
      });
    });
    return [...variables];
  }

  /**
   * Returns all possible inputs for n binary inputs. An input is an array of chars that can be either 'T' or 'F'
   * @param {number} n number of inputs
   * @return {Array.<Array.<'T'|'F'>>} an array of inputs
   */
  static generateInputRows(n) {
    if (n === 0) {
      return [[]];
    } else {
      const prevArrays = TruthTableUtils.generateInputRows(n - 1);
      return [
        ...prevArrays.map((arr) => ["T", ...arr]),
        ...prevArrays.map((arr) => ["F", ...arr]),
      ];
    }
  }
  /**
   * Returns all possible inputs for each unique variable.
   * @param {Array.<string>} uniqueVariables an array of unique variable
   * @param {Array.<Array.<'T'|'F'>>} inputRows an array of inputs
   * @return {Array.<Array.<T>>} an array of inputs
   */
  static generateVariableRowValues(uniqueVariables, inputRows) {
    const variableRowValues = [];
    inputRows.forEach((row, rowIndex) => {
      const rowValue = {};
      uniqueVariables.forEach((variable, variableIndex) => {
        rowValue[variable] = inputRows[rowIndex][variableIndex] == "T" ? 1 : 0;
      });
      variableRowValues.push(rowValue);
    });
    return variableRowValues;
  }

  /**
   * Handles not operator
   * @param {string} inputString express to process
   * @param {string} notSymbol string that represents the NOT operator
   * @return {string} equation that is processed with nots?
   */
  static formatNotOperator(inputString, notSymbol) {
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
  }

  /**
   * Formats an expression with given variable substitutions and symbol substitutions.
   * @param {string} expression expression to format with operator symbol aliases and variable substitutions (this is a template)
   * @param {Object.<string, 'T'|'F'>} variableValues variable name to variable value map
   * @param {Array.<string>} uniqueVariables a list of unique variables (generated from variableValues through getUniqueVariables)
   * @return {string} formatted expression with symbol replacements
   */
  static formatExpression(expression, variableValues, uniqueVariables) {
    let modifiedExpression = expression;

    uniqueVariables.forEach((variable) => {
      modifiedExpression = modifiedExpression.replaceAll(
        variable,
        variableValues[variable]
      );
    });
    return modifiedExpression;
  }

  /**
   * Evaluates an expression consisting of known values and operators. (does not support parentheses).
   * @param {string} expression fixed boolean expression to evaluate
   * @return {'0'|'1'} value of the evaluated expression
   */
  static evaluateExpressionWithoutParentheses(expression) {
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
  }

  /**
   * Evaluates an expression consisting of known values, operators, and parentheses.
   * @param {string} expression fixed boolean expression to evaluate
   * @return {'0'|'1'} value of the evaluated expression
   */
  static evaluateExpressionWithParentheses(expression) {
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
        const parRes = TruthTableUtils.evaluateExpressionWithParentheses(
          result.substring(i + 1, j)
        );
        result = result.slice(0, i) + parRes + result.slice(j + 1);
        i = 0;
      }
    }
    return TruthTableUtils.evaluateExpressionWithoutParentheses(result);
  }

  /**
   * Evaluates a boolean expression. REQUIRES BOOLEAN LITERALS IN 1/0 FORM!
   * @param {string} expression boolean expression to evaluate
   * @return {'T'|'F'} value of the evaluated expression
   */
  static evaluateExpression(expression) {
    try {
      let result = "ERROR";
      const evaluation =
        TruthTableUtils.evaluateExpressionWithParentheses(expression);
      if (evaluation == "1") result = "T";
      if (evaluation == "0") result = "F";
      return result;
    } catch (error) {
      return "ERROR";
    }
  }

  /**
   * Generates the implicit table for a particular input using bitmasks. Returns null if invalid input.
   * @param {string} expression expression to generate table (all possible inputs)
   * @return {null|{variables: Array.<string>, result: Array.<-1|1>}}
   * variable ordering used, and result[i] is the result when i is used as inputs.
   *
   * jth bit (1<<j) of i is substituted for variables[j], if jth bit is 1, use T, otherwise use F.
   * The binary representation of i (which input) is used to determine the values of the variables.
   * Binary representation is used so checking what inputs can be covered by a specific minterm is easier to check.
   *
   * -1 denotes F, 1 denotes T (0 to denote X).
   */
  static generateTable(expression) {
    try {
      const variables = TruthTableUtils.getUniqueVariables([expression]);
      const n = variables.length;
      return {
        variables: variables,
        result: [...new Array(2 ** n)].map((_, i) =>
          TruthTableUtils.evaluateExpression(
            TruthTableUtils.formatExpression(
              expression,
              Object.fromEntries(
                variables.map((variable, j) => [
                  variable,
                  i & (1 << j) ? "1" : "0",
                ])
              ),
              variables
            )
          ) === "T"
            ? 1
            : -1
        ),
      };
    } catch (error) {
      return null;
    }
  }

  /**
   * replace the operators with the symbols
   * @param {string} input expression to generate table (all possible inputs)
   * @param {{and: string, or: string, not: string}} symbols operator mapping
   * @return {null|string} formatted expression
   */
  static formatInput(input, symbols) {
    const formatedEquation = input
      .replaceAll(/\s/g, "")
      .replaceAll(symbols.and, "∧")
      .replaceAll(symbols.or, "∨")
      .replaceAll(symbols.not, "¬");
    const valid = new RegExp(
      "^(([()]*)([¬]*)[A-Za-z ]([∧∨]([(]*)([¬]*)[A-Za-z][)]*)*)$",
      "g"
    );

    if (!valid.test(formatedEquation)) return null;
    return formatedEquation;
  }
  /**
   * generate the output table
   * @param {Array.<string>} uniqueVariables an array of the unique variables
   * @param {Array.<string>} booleanEquations operator mapping
   * @param {Array.<string>} inputRows operator mapping
   * @return {Array.<string>} formatted expression
   */
  static generateOutputRows(uniqueVariables, booleanEquations, inputRows) {
    const variableRowValues = generateVariableRowValues(
      uniqueVariables,
      inputRows
    );
    return Array.from(
      { length: Math.pow(2, uniqueVariables.length) },
      (_, rowIndex) =>
        Array.from({ length: booleanEquations.length }, (_, columnIndex) =>
          evaluateExpression(
            formatExpression(
              booleanEquations[columnIndex],
              variableRowValues[rowIndex],
              uniqueVariables
            )
          )
        )
    );
  }
}

export default TruthTableUtils;
export const {
  getUniqueVariables,
  generateVariableRowValues,
  generateInputRows,
  generateOutputRows,
  formatNotOperator,
  formatExpression,
  formatInput,
  evaluateExpressionWithParentheses,
  evaluateExpressionWithoutParentheses,
  evaluateExpression,
  generateTable,
} = TruthTableUtils;
