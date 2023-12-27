import { max, min } from "d3";
import { getTable } from "./visualize";

export const code = [
  "function bucketSort(arr, bucketSize):", // 0
  "# Determine the minimum and maximum values in the array", // 1
  "minValue = min(arr)", // 2
  "maxValue = max(arr)", // 3
  "", // 4
  "# Create buckets", // 5
  "bucketCount = floor((maxValue - minValue) / bucketSize) + 1", // 6
  "for j from 0 to bucketCount - 1:", // 7
  "\xa0\xa0\xa0\xa0buckets.push([])", // 8
  "",
  "# Distribute elements into buckets",
  "for k from 0 to arr.length - 1:",
  "\xa0\xa0\xa0\xa0bucketIndex = floor((arr[k] - minValue) / bucketSize)",
  "\xa0\xa0\xa0\xa0buckets[bucketIndex].push(arr[k])",
  "",
  "# Sort each bucket and concatenate them",
  "arr = []",
  "for m from 0 to bucketCount - 1:",
  "\xa0\xa0\xa0\xa0sort(buckets[m])",
  "\xa0\xa0\xa0\xa0arr = arr.concat(buckets[m])",
  "",
  "return arr",
];

export function* sort(arr) {
  const table = [];
  // create buckets
  const bucketSize = 5;
  yield {
    line: 0,
    tables: [getTable([arr], [])],
  };
  const minValue = min(arr);
  yield {
    line: 2,
    tables: [
      getTable([arr], [{ row: 0, col: arr.indexOf(minValue), color: "teal" }]),
    ],
  };
  const maxValue = max(arr);
  yield {
    line: 3,
    tables: [
      getTable(
        [arr],
        [
          { row: 0, col: arr.indexOf(minValue), color: "teal" },
          { row: 0, col: arr.indexOf(maxValue), color: "yellow" },
        ]
      ),
    ],
  };
  const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
  const buckets = [];
  for (let j = 0; j < bucketCount; j++) {
    yield {
      line: 7,
      tables: [getTable([arr], []), getTable(table, [])],
    };
    table.push([
      `${j * bucketSize + minValue}-${(j + 1) * bucketSize + minValue}`,
    ]);
    yield {
      line: 8,
      tables: [getTable([arr], []), getTable(table, [])],
    };
    buckets.push([]);
  }

  // Distribute elements into buckets
  for (let k = 0; k < arr.length; k++) {
    yield {
      line: 11,
      tables: [
        getTable([arr], [{ row: 0, col: k, color: "purple" }]),
        getTable(table, []),
      ],
    };
    const bucketIndex = Math.floor((arr[k] - minValue) / bucketSize);
    yield {
      line: 12,
      tables: [
        getTable([arr], [{ row: 0, col: k, color: "purple" }]),
        getTable(table, [{ row: bucketIndex, col: 0, color: "purple" }]),
      ],
    };
    buckets[bucketIndex].push(arr[k]);
    table[bucketIndex].push(arr[k]);
    yield {
      line: 13,
      tables: [
        getTable([arr], [{ row: 0, col: k, color: "purple" }]),
        getTable(table, [{ row: bucketIndex, col: null, color: "purple" }]),
      ],
    };
  }

  // Sort each bucket and concatenate them
  arr = [];
  yield {
    line: 16,
    tables: [getTable([arr]), getTable(table)],
  };
  for (let m = 0; m < buckets.length; m++) {
    yield {
      line: 17,
      tables: [
        getTable([arr]),
        getTable(table, [{ row: m, col: 0, color: "pink" }]),
      ],
    };
    buckets[m].sort((a, b) => a - b);
    table[m] = [table[m][0], ...buckets[m]];
    yield {
      line: 18,
      tables: [
        getTable([arr]),
        getTable(table, [{ row: m, col: null, color: "pink" }]),
      ],
    };
    const currentLengh = arr.length;
    arr = [...arr, ...buckets[m]];
    console.log(
      Array.from({ length: arr.length - currentLengh }).map((_, i) => ({
        row: 0,
        col: currentLengh + i,
        color: "pink",
      }))
    );
    yield {
      line: 19,
      tables: [
        getTable(
          [arr],
          Array.from({ length: arr.length - currentLengh }).map((_, i) => ({
            row: 0,
            col: currentLengh + i,
            color: "pink",
          }))
        ),
        getTable(table, [{ row: m, col: null, color: "pink" }]),
      ],
    };
  }

  return arr;
}

export const example = {
  Python: "",
  JavaScript: "",
  "C++": "",
};
