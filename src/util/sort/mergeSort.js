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
  Python: `def merge(arr, left, mid, right):
# Merges two subarrays of arr[].
n1 = mid - left + 1
n2 = right - mid

# Create temporary arrays
L = arr[left:mid + 1]
R = arr[mid + 1:right + 1]

# Initial indexes of first and second subarrays
i = j = 0

# Initial index of merged subarray
k = left

# Merge the temporary arrays back into arr[left:right+1]
while i < n1 and j < n2:
    if L[i] <= R[j]:
        arr[k] = L[i]
        i += 1
    else:
        arr[k] = R[j]
        j += 1
    k += 1

# Copy the remaining elements of L[], if any
while i < n1:
    arr[k] = L[i]
    i += 1
    k += 1

# Copy the remaining elements of R[], if any
while j < n2:
    arr[k] = R[j]
    j += 1
    k += 1

def merge_sort(arr, left, right):
# Sorts the array using the Merge Sort algorithm.
if left < right:
    # Find the middle point
    mid = (left + right) // 2

    # Sort first and second halves
    merge_sort(arr, left, mid)
    merge_sort(arr, mid + 1, right)

    # Merge the sorted halves
    merge(arr, left, mid, right)

if __name__ == "__main__":
# Example usage:
arr = [12, 11, 13, 5, 6, 7]
print("Original array:", arr)
merge_sort(arr, 0, len(arr) - 1)
print("Sorted array:", arr)
`,
  JavaScript: `const merge = (arr, left, mid, right) => {
  /**
   * Merges two subarrays of arr[].
   */
  const n1 = mid - left + 1;
  const n2 = right - mid;

  // Create temporary arrays
  const L = arr.slice(left, mid + 1);
  const R = arr.slice(mid + 1, right + 1);

  // Initial indexes of first and second subarrays
  const i = 0;
  const j = 0;

  // Initial index of merged subarray
  let k = left;

  // Merge the temporary arrays back into arr[left:right+1]
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    k++;
  }

  // Copy the remaining elements of L[], if any
  while (i < n1) {
    arr[k] = L[i];
    i++;
    k++;
  }

  // Copy the remaining elements of R[], if any
  while (j < n2) {
    arr[k] = R[j];
    j++;
    k++;
  }
};

const mergeSort = (arr, left, right) => {
  /**
   * Sorts the array using the Merge Sort algorithm.
   */
  if (left < right) {
    // Find the middle point
    const mid = Math.floor((left + right) / 2);

    // Sort first and second halves
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);

    // Merge the sorted halves
    merge(arr, left, mid, right);
  }
};

// Example usage:
const arr = [12, 11, 13, 5, 6, 7];
console.log("Original array:", arr);
mergeSort(arr, 0, arr.length - 1);
console.log("Sorted array:", arr);
`,
  "C++": `#include <iostream>
#include <vector>

void merge(std::vector<int> &arr, int left, int mid, int right)
{
    /**
     * Merges two subarrays of arr[].
     */
    int n1 = mid - left + 1;
    int n2 = right - mid;

    // Create temporary arrays
    std::vector<int> L(n1);
    std::vector<int> R(n2);

    // Copy data to temporary arrays L[] and R[]
    for (int i = 0; i < n1; i++)
    {
        L[i] = arr[left + i];
    }
    for (int j = 0; j < n2; j++)
    {
        R[j] = arr[mid + 1 + j];
    }

    // Merge the temporary arrays back into arr[left:right+1]
    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2)
    {
        if (L[i] <= R[j])
        {
            arr[k] = L[i];
            i++;
        }
        else
        {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    // Copy the remaining elements of L[], if any
    while (i < n1)
    {
        arr[k] = L[i];
        i++;
        k++;
    }

    // Copy the remaining elements of R[], if any
    while (j < n2)
    {
        arr[k] = R[j];
        j++;
        k++;
    }
}

void mergeSort(std::vector<int> &arr, int left, int right)
{
    /**
     * Sorts the array using the Merge Sort algorithm.
     */
    if (left < right)
    {
        // Find the middle point
        int mid = left + (right - left) / 2;

        // Sort first and second halves
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);

        // Merge the sorted halves
        merge(arr, left, mid, right);
    }
}

int main()
{
    // Example usage:
    std::vector<int> arr = {12, 11, 13, 5, 6, 7};
    std::cout << "Original array:";
    for (int num : arr)
    {
        std::cout << " " << num;
    }
    std::cout << std::endl;

    mergeSort(arr, 0, arr.size() - 1);

    std::cout << "Sorted array:";
    for (int num : arr)
    {
        std::cout << " " << num;
    }
    std::cout << std::endl;

    return 0;
}
`,
};
