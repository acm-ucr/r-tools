import { getTable } from "./visualize.js";
let tables = [];

export const code = [
  "function merge_sort(arr)",
  "\xa0\xa0\xa0\xa0if length of arr <=1",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0return arr",
  "\xa0\xa0\xa0\xa0middle = floor(arr.length/2)",
  "\xa0\xa0\xa0\xa0left_half = arr[0 to middle - 1]",
  "\xa0\xa0\xa0\xa0right_half = arr[middle to end]",
  "\xa0\xa0\xa0\xa0sorted_left = merge_sort(left_half)",
  "\xa0\xa0\xa0\xa0sorted_right = merge_sort(right_half)",
  "\xa0\xa0\xa0\xa0result = merge(sortedLeft, sortedRight)",
  "",
  "function merge(sorted_left, sorted_right)",
  "\xa0\xa0\xa0\xa0result = []",
  "\xa0\xa0\xa0\xa0leftIndex=0",
  "\xa0\xa0\xa0\xa0rightIndex=0",
  "\xa0\xa0\xa0\xa0while leftIndex < length of sorted_left and rightIndex < length of sorted_right",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0if sorted_left[leftIndex] < sorted_right[rightIndex]",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0append left[leftIndex] to result",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0++leftIndex",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0else",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0append right[rightIndex] to result",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0++rightIndex",
  "\xa0\xa0\xa0\xa0append remaining elements to result",
  "\xa0\xa0\xa0\xa0return result",
];

function* mergeSort(arr, level, start, end) {
  if (arr.length <= 1) {
    if (level < tables.length / 2) tables[level][0].push(arr[0]); // for odd number array, you can't split it evenly, so add the signle element to the next row
    return arr;
  } else {
    const middle = Math.floor(arr.length / 2);
    const leftHalf = arr.slice(0, middle);
    const rightHalf = arr.slice(middle);
    // highlight the middle element
    yield {
      line: 3,
      tables: tables.map((table, index) => {
        if (index === level - 1) {
          return getTable(table, [
            {
              row: 0,
              col: middle + start,
              color: "teal",
            },
          ]);
        }
        return table;
      }),
    };
    // highlight the left half and the right half in the last level
    yield {
      line: 3,
      tables: tables.map((table, index) => {
        if (index === level - 1) {
          return getTable(table, [
            ...Array.from({ length: leftHalf.length }, (_, index) => ({
              row: 0,
              col: start + index,
              color: "purple",
            })),
            ...Array.from({ length: rightHalf.length }, (_, index) => ({
              row: 0,
              col: start + middle + index,
              color: "pink",
            })),
          ]);
        }
        return table;
      }),
    };
    // add the left part into the current level
    const leftStart = tables[level][0].length; // start of left half in the current level, this is used for highlighting and  in the merge function to get replaced by the sorted array
    tables[level][0] = [...tables[level][0], ...leftHalf];
    const leftEnd = tables[level][0].length; // end of left half in the current level

    // add a space and the right part into the current level
    const rightStart = tables[level][0].length + 1; //
    tables[level][0] = [...tables[level][0], "\xa0\xa0", ...rightHalf];
    const rightEnd = tables[level][0].length;

    // highlight the left half in the last level and the current level
    yield {
      line: 4,
      tables: tables.map((table, index) => {
        if (index === level - 1) {
          // highlight the left half in the last level
          return getTable(
            table,
            Array.from({ length: leftHalf.length }, (_, index) => ({
              row: 0,
              col: start + index,
              color: "purple",
            }))
          );
        }
        if (index === level) {
          // highlight the left half in the current level
          return getTable(
            table,
            Array.from({ length: leftHalf.length }, (_, index) => ({
              row: 0,
              col: leftStart + index,
              color: "purple",
            }))
          );
        }
        return table;
      }),
    };
    // highlight the right half in the last level and the current level
    yield {
      line: 5,
      tables: tables.map((table, index) => {
        if (index === level - 1) {
          // highlight the right half in the last level
          return getTable(
            table,
            Array.from({ length: rightHalf.length }, (_, index) => ({
              row: 0,
              col: start + middle + index,
              color: "pink",
            }))
          );
        }
        if (index === level) {
          // highlight the right half in the current level
          return getTable(
            table,
            Array.from({ length: rightHalf.length }, (_, index) => ({
              row: 0,
              col: rightStart + index,
              color: "pink",
            }))
          );
        }
        return table;
      }),
    };
    // highlight the left half in the current level
    yield {
      line: 6,
      tables: tables.map((table, index) => {
        if (index === level) {
          // highlight the left half in the current level
          return getTable(
            table,
            Array.from({ length: leftHalf.length }, (_, index) => ({
              row: 0,
              col: leftStart + index,
              color: "purple",
            }))
          );
        }
        return table;
      }),
    };
    const sortedLeft = yield* mergeSort(
      leftHalf,
      level + 1,
      leftStart,
      leftEnd
    );

    // highlight the right half in the current level
    yield {
      line: 7,
      tables: tables.map((table, index) => {
        if (index === level) {
          // highlight the right half in the current level
          return getTable(
            table,
            Array.from({ length: rightHalf.length }, (_, index) => ({
              row: 0,
              col: rightStart + index,
              color: "pink",
            }))
          );
        }
        return table;
      }),
    };
    const sortedRight = yield* mergeSort(
      rightHalf,
      level + 1,
      rightStart,
      rightEnd
    );
    // highlight the left half and the right half in the last level and the current level
    yield {
      line: 8,
      tables: tables.map((table, index) => {
        if (index === level - 1) {
          return getTable(table, [
            ...Array.from({ length: leftHalf.length }, (_, index) => ({
              row: 0,
              col: start + index,
              color: "yellow",
            })),
            ...Array.from({ length: rightHalf.length }, (_, index) => ({
              row: 0,
              col: start + middle + index,
              color: "yellow",
            })),
          ]);
        }
        if (index === level) {
          // highlight the left and the right half in the current level
          return getTable(table, [
            ...Array.from({ length: leftHalf.length }, (_, index) => ({
              row: 0,
              col: leftStart + index,
              color: "yellow",
            })),
            ...Array.from({ length: rightHalf.length }, (_, index) => ({
              row: 0,
              col: rightStart + index,
              color: "yellow",
            })),
          ]);
        }
        return table;
      }),
    };
    return yield* merge(sortedLeft, sortedRight, level - 1, start, end);
  }
}
function* merge(sortedLeft, sortedRight, level, start, end) {
  tables[tables.length - 1][0] = [];
  // clear the array to merge in the last level
  for (let i = start; i < end; i++) {
    tables[level][0][i] = "\xa0\xa0";
  }
  const result = [];
  // highlight the part to merge in the last level
  yield {
    line: 11,
    tables: tables.map((table, index) => {
      if (index === level) {
        return getTable(
          table,
          Array.from({ length: end - start }, (_, index) => ({
            row: 0,
            col: start + index,
            color: "yellow",
          }))
        );
      }
      return table;
    }),
  };
  let currentIndex = start;
  let leftIndex = 0;
  let rightIndex = 0;

  // highlight the leftIndex in the merge level
  yield {
    line: 12,
    tables: tables.map((table, index) => {
      if (index === level + 1) {
        return getTable(table, [{ row: 0, col: leftIndex, color: "purple" }]);
      }
      return table;
    }),
  };
  // highlight the leftIndex and the rightIndex in the merge level
  yield {
    line: 13,
    tables: tables.map((table, index) => {
      if (index === level + 1) {
        return getTable(table, [
          { row: 0, col: leftIndex, color: "purple" },
          { row: 0, col: sortedLeft.length + rightIndex + 1, color: "pink" },
        ]);
      }
      return table;
    }),
  };
  while (leftIndex < sortedLeft.length && rightIndex < sortedRight.length) {
    if (sortedLeft[leftIndex] < sortedRight[rightIndex]) {
      // highlight the leftIndex and the rightIndex in the merge level and the currentIndex in the last level
      yield {
        line: 15,
        tables: tables.map((table, index) => {
          if (index === level + 1) {
            return getTable(table, [
              { row: 0, col: leftIndex, color: "purple" },
              {
                row: 0,
                col: sortedLeft.length + rightIndex + 1,
                color: "pink",
              },
            ]);
          }
          if (index === level) {
            return getTable(table, [
              { row: 0, col: currentIndex, color: "purple" },
            ]);
          }
          return table;
        }),
      };
      result.push(sortedLeft[leftIndex]);
      tables[level][0][currentIndex] = sortedLeft[leftIndex];
      // highlight the leftIndex and rightIndex in the merge level and the currentIndex in the last level
      yield {
        line: 16,
        tables: tables.map((table, index) => {
          if (index === level + 1) {
            return getTable(table, [
              { row: 0, col: leftIndex, color: "purple" },
              {
                row: 0,
                col: sortedLeft.length + rightIndex + 1,
                color: "pink",
              },
            ]);
          }
          if (index === level) {
            return getTable(table, [
              { row: 0, col: currentIndex, color: "purple" },
            ]);
          }
          return table;
        }),
      };
      leftIndex++;
      currentIndex++;
      // highlight the leftIndex and the rightIndex in the merge level
      yield {
        line: 17,
        tables: tables.map((table, index) => {
          if (index === level + 1) {
            return getTable(table, [
              { row: 0, col: leftIndex, color: "purple" },
              {
                row: 0,
                col: sortedLeft.length + rightIndex + 1,
                color: "pink",
              },
            ]);
          }
          return table;
        }),
      };
    } else {
      // highlight the leftIndex and the rightIndex in the merge level and the currentIndex in the last level
      yield {
        line: 18,
        tables: tables.map((table, index) => {
          if (index === level + 1) {
            return getTable(table, [
              { row: 0, col: leftIndex, color: "purple" },
              {
                row: 0,
                col: sortedLeft.length + rightIndex + 1,
                color: "pink",
              },
            ]);
          }
          if (index === level) {
            return getTable(table, [
              { row: 0, col: currentIndex, color: "pink" },
            ]);
          }
          return table;
        }),
      };
      result.push(sortedRight[rightIndex]);
      tables[level][0][currentIndex] = sortedRight[rightIndex];
      // highlight the leftIndex and rightIndex in the merge level and the currentIndex in the last level
      yield {
        line: 19,
        tables: tables.map((table, index) => {
          if (index === level + 1) {
            return getTable(table, [
              { row: 0, col: leftIndex, color: "purple" },
              {
                row: 0,
                col: sortedLeft.length + rightIndex + 1,
                color: "pink",
              },
            ]);
          }
          if (index === level) {
            return getTable(table, [
              { row: 0, col: currentIndex, color: "pink" },
            ]);
          }
          return table;
        }),
      };
      currentIndex++;
      rightIndex++; // highlight the leftIndex and the rightIndex in the merge level
      yield {
        line: 20,
        tables: tables.map((table, index) => {
          if (index === level + 1) {
            return getTable(table, [
              { row: 0, col: leftIndex, color: "purple" },
              {
                row: 0,
                col: sortedLeft.length + rightIndex + 1,
                color: "pink",
              },
            ]);
          }
          return table;
        }),
      };
    }
  }

  if (leftIndex >= sortedLeft.length) {
    for (rightIndex; rightIndex < sortedRight.length; rightIndex++) {
      result.push(sortedRight[rightIndex]);
      tables[level][0][currentIndex] = sortedRight[rightIndex];
      // highlight the  rightIndex in the merge level and the currentIndex in the last level
      yield {
        line: 21,
        tables: tables.map((table, index) => {
          if (index === level + 1) {
            return getTable(table, [
              {
                row: 0,
                col: sortedLeft.length + rightIndex + 1,
                color: "pink",
              },
            ]);
          }
          if (index === level) {
            return getTable(table, [
              { row: 0, col: currentIndex, color: "pink" },
            ]);
          }
          return table;
        }),
      };
      currentIndex++;
    }
  } else {
    for (leftIndex; leftIndex < sortedLeft.length; leftIndex++) {
      result.push(sortedLeft[leftIndex]);
      tables[level][0][currentIndex] = sortedLeft[leftIndex];
      // highlight the leftIndex in the merge level and the currentIndex in the last level
      yield {
        line: 21,
        tables: tables.map((table, index) => {
          if (index === level + 1) {
            return getTable(table, [
              { row: 0, col: leftIndex, color: "purple" },
            ]);
          }
          if (index === level) {
            return getTable(table, [
              { row: 0, col: currentIndex, color: "purple" },
            ]);
          }
          return table;
        }),
      };
      currentIndex++;
    }
  }
  tables[level + 1][0] = [];
  yield { line: 24, tables: tables };
  return result;
}
export function* sort(arr) {
  tables = Array.from({ length: Math.ceil(Math.log2(arr.length)) + 2 }, () => [
    [],
  ]); // initialize tables to size of log(n)
  tables[0] = [arr];
  yield { line: 0, tables: tables };
  yield* mergeSort(arr, 1, 0, arr.length);
}
export const example = {
  Python: `def merge_sort (arr):
    \n  if len(arr) <= 1: 
    \n    return arr 
    \n\n  #Split the array into two halves
    \n  middle = len(arr) // 2 
    \n  left_half = arr[:middle]
    \n  right_half = arr[middle:]
    \n\n  #Recursive call to merge_sort for each half
    \n  sorted_left = merge_sort(left_half)
    \n  sorted_right = merge_sort(right_half)
    \n\n  #Merge the sorted halves
    \n  return merge(sorted_left, sorted_right)
    \n\ndef merge(left, right):
    \n  result = []
    \n  left_index = 0
    \n  right_index = 0
    \n\n  while left_index < len(left) and right_index < len(right):
    \n    if left[left_index] < right[right_index]:
    \n      result.append(left[left_index])
    \n      left_index += 1
    \n    else:
    \n      result.append(right[right_index])
    \n      right_index += 1
    \n\n  # Append any remaining elements from left and right arrays
    \n  result.extend(left[left_index:])
    \n  result.extend(right[right_index:])
    \n\n  return result
    \n\n# Example usage:
    \nunsorted_array = [8,4,1,7,3,5,2,6]
    \nsorted_array = merge_sort(unsorted_array)
    \nprint(sorted_array)`,
  JavaScript: `const mergeSort = (arr) => {
    \n  if (arr.length <= 1) {
    \n    return arr;
    \n  }
    \n\n  // Split the array into two halves
    \n  const middle = Math.floor(arr.length / 2);
    \n  const leftHalf = arr.slice(0, middle);
    \n  const rightHalf = arr.slice(middle);
    \n\n  // Recursive call to mergeSort for each half
    \n  const sortedLeft = mergeSort(leftHalf);
    \n  const sortedRight = mergeSort(rightHalf);
    \n\n  // Merge the sorted halves
    \n  return merge(sortedLeft, sortedRight);
    \n}
    \n\const merge = (left, right) => {
    \n  let result = [];
    \n  let leftIndex = 0;
    \n  let rightIndex = 0;
    \n\n  // Compare elments and merge them in sorted order
    \n  while (leftIndex < left.length && rightIndex < right.length) {
    \n    if (left[leftIndex] < right[rightIndex]) {
    \n      result.push(left[leftIndex]);
    \n      leftIndex++
    \n    } else {
    \n      result.push(right[rightIndex]);
    \n      rightIndex++;
    \n    }
    \n  }
    \n\n //Append any remaining elements from the left and right arrays
    \n  return result.concat(left.slice(leftIndex), right.slice(rightIndex));
    \n}
    \n\n// Example usage:
    \nconst unsortedArray = [8, 4, 1, 7, 3, 5, 2, 6];
    \nconst sortedArray = mergeSort(unsortedArray);
    \nconsole.log(sortedArray);`,
  "C++": `#include <iostream>
#include <vector>
using namespace std;

void merge(vector<int>& arr, int left, int middle, int right) {
  int n1  = middle - left + 1;
  int n2 = right - middle;

  // Create temporary arrays
  vector<int> leftArray(n1);
  vector<int> rightArray(n2);

  // Copy data to temporary arrays leftArray[] and rightArray[]
  for(int i = 0; i < n1; i++)
    leftArray.at(i) =  arr.at(left + i);
  for (int j = 0; j < n2; j++)
    rightArray.at(j) = arr.at(middle + 1 + j);

  // Merge the temporary arrays back into arr[left..right] 
  int i = 0; // Initial index of left subarray
  int j = 0; // Initial index of right subarray
  int k = left; // Initial index of merged subarray

  while (i < n1 && j < n2) {
    if (leftArray.at(i) <= rightArray.at(j)) {
      arr.at(k) = leftArray.at(i);
      i++;
    } else {
      arr.at(k) = rightArray.at(j);
      j++;
    }
    k++;
  }

  // Copy the reamining elements of leftArray[], if there are any
  while (i < n1) {
    arr.at(k) = leftArray.at(i);
    i++;
    k++;
  }

  // Copy the remaining elements of rightArray[], if there are any
  while (j < n2) {
    arr.at(k) = rightArray.at(j);
    j++;
    k++;
  }
}

void mergeSort(vector<int>& arr, int left, int right) {
  if (left < right) {
    // Same as (left + right) / 2, but avoids overflow for large left and right
    int middle = left + (right - left) / 2;

    // Sort first and second halves
    mergeSort(arr, left, middle);
    mergeSort(arr, middle + 1, right);

    // Merge the sorted halves
    merge(arr, left, middle, right);
  }
}

int main() {
  // Example usage:
  vector<int> unsortedArray = {8, 4, 1, 7, 3, 5, 2, 6};

  // Perform merge sort
  mergeSort(unsortedArray, 0, unsortedArray.size() - 1);

  // Print the sorted array
 for (const auto& num : unsortedArray) {
    cout << num << " ";
  }

  return 0;
}`,
};
