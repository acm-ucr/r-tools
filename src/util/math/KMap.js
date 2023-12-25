/**
 * Calculate number of bits in x.
 * From https://en.wikipedia.org/wiki/Hamming_weight (use it for better implementations if needed)
 * (can be memoized)
 * @param {number} x int32 number
 * @return {number} 1 bits in x
 */
function popcount(x) {
  let count;
  x |= 0;
  for (count = 0; x; count++) x &= x - 1;
  return count;
}

/**
 * Returns all i such that x&(1<<i) (used to map int to terms)
 * (can be memoized)
 * @param {number} x int32 number
 * @return {Array.<number>} locations of 1-bits in x
 */
function poplocation(x) {
  const out = [];
  let count = 0;
  x |= 0;
  while (x) {
    if (x & 1) out.push(count);
    x >>= 1;
    count++;
  }
  return out;
}

/**
 * Returns what groups should be highlighted for the KMap given outputs and variables.
 * @param {Array.<-1|0|1>} outputs list of outputs from TruthTableUtils.generateTable, -1 denotes F, 1 denotes T, 0 denotes X (don't cares)
 * @param {Array.<string>} variables list of variables to process
 * @return {{expressionSOP: string}} KMap simplified expression in SOP form
 */
export default function kMapSolver(outputs, variables) {
  const n = variables.length;
  if (n > 31) throw new Error("only supports up to 31 bits"); // might work with 32 bits
  const masks = [...new Array(n + 1)].map(() => []);
  for (let i = 0 | 0; i < 1 << n; ++i) {
    // masks to use to cover them
    masks[popcount(i)].push(i);
  }

  const mintermBitmask = []; // in each entry: 1 bit denotes the variable is used
  const mintermInversionBitmask = []; // in each entry: 1 bit denotes the variable is inverted
  for (let k = 0; k < masks.length; ++k) {
    const maskList = masks[k];
    for (const mask of maskList) {
      // what variables we'll use => bits that need to be checked
      for (let invBits = 0 | 0; invBits < 1 << n; ++invBits) {
        if ((mask & invBits) !== invBits) continue; // make sure invBit mask overlaps with actual mask (containing bits to read)
        const xorMask = mask ^ invBits;
        const invertedMask = (mask ^ ~invBits) & mask;
        let ok = true; // does it conflict with a F [-1]
        const used = []; // what indices where it overlap with an existing T [1]
        for (let i = 0; i < 1 << n; ++i) {
          // validating each truth value (the ith input)
          const normal = (i & xorMask) === xorMask; // requires a 1 matches the xorMask
          const inverted = (~i & invertedMask) === invertedMask; // requires a 0 matches the invertedMask
          if (normal && inverted) {
            // if it matches one of the used variables, needs to check
            if (outputs[i] === -1) {
              ok = false;
              break;
            } else if (outputs[i] === 1) {
              used.push(i);
            }
          }
        }
        if (ok && used.length) {
          mintermBitmask.push(mask);
          mintermInversionBitmask.push(invertedMask);
          // mark as used
          for (const i of used) {
            outputs[i] = 0;
          }
        }
      }
    }
  }
  const minterms = [];
  for (let i = 0; i < mintermBitmask.length; ++i) {
    const mask = mintermBitmask[i];
    const inversionMask = mintermInversionBitmask[i];
    const terms = poplocation(mask).map((k) => {
      const inverted = inversionMask & (1 << k);
      const variable = variables[k];
      return inverted ? variable + "'" : variable;
    }); // consists of X and X' strings
    const minterm = terms.join("") || "1"; // joining variables with AND
    minterms.push(minterm);
  }
  return {
    expressionSOP: minterms.join("+"),
    // joining minterms with OR
  };
}
