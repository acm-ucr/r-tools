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

  const mintermBitmask = [];
  for (const masklist of masks) {
    for (const mask of masklist) {
      let ok = true; // does it conflict with a F [-1]
      let used = false; // does it overlap with an existing T [1]
      for (let i = 0 | 0; i < 1 << n; ++i) {
        if ((i & mask) == mask) {
          if (outputs[i] === -1) {
            ok = false;
            break;
          } else if (outputs[i] === 1) {
            used = true;
            outputs[i] = 0;
          }
        }
      }
      if (ok && used) {
        mintermBitmask.push(mask);
      }
    }
  }
  const minterms = mintermBitmask.map((mask) =>
    poplocation(mask).map((i) => variables[i])
  );
  return {
    expressionSOP: minterms.map((x) => x.join("")).join("+"),
  };
}
