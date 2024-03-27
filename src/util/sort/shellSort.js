import { getArray } from "./visualize.js";

export const code = [
  "shellSort(arr,n);",
  "\xa0\xa0\xa0\xa0n = length(arr)",
  "\xa0\xa0\xa0\xa0for gap = floor(n/2) down to 1:",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0for i = gap to n-1:",
  " \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0temp = arr[i]",
  " \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0j = i",
  " \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0while j >= gap and arr[j-gap] > temp:",
  " \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0arr[j] = arr[j-gap]",
  " \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0j = j - gap",
  " \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0arr[j] = temp",
  " \xa0\xa0\xa0\xa0return arr",
];

export function* sort(arr) {
  yield { line: 0, array: getArray(arr, {}) };
  const n = arr.length;
  yield { line: 1, array: getArray(arr, { [n]: "n" }) };

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    yield { line: 2, array: getArray(arr, { [n]: "n", [gap]: "gap" }) };
    for (let i = gap; i < n; i++) {
      yield {
        line: 3,
        array: getArray(arr, { [n]: "n", [gap]: "gap", [i]: "i" }),
      };
      const temp = arr[i];
      yield {
        line: 4,
        array: getArray(arr, {
          [n]: "n",
          [gap]: "gap",
          [i]: "i",
        }),
      };
      let j;
      yield {
        line: 5,
        array: getArray(arr, {
          [n]: "n",
          [gap]: "gap",
          [i]: "i",
        }),
      };
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        yield {
          line: 6,
          array: getArray(arr, { [n]: "n", [gap]: "gap", [i]: "i", [j]: "j" }),
        };
        arr[j] = arr[j - gap];
        yield {
          line: 7,
          array: getArray(arr, { [n]: "n", [gap]: "gap", [i]: "i", [j]: "j" }),
        };
      }
      arr[j] = temp;
      yield {
        line: 8,
        array: getArray(arr, { [n]: "n", [gap]: "gap", [i]: "i", [j]: "j" }),
      };
    }
  }
}

export const example = {
  Python: `def shell_sort(arr):
"""
Sorts the array using the Shell Sort algorithm.
"""
n = len(arr)
gap = n // 2
while gap > 0:
    for i in range(gap, n):
        temp = arr[i]
        j = i
        while j >= gap and arr[j - gap] > temp:
            arr[j] = arr[j - gap]
            j -= gap
        arr[j] = temp
    gap //= 2

if __name__ == "__main__":
# Example usage:
arr = [64, 25, 12, 22, 11]
print("Original array:", arr)
shell_sort(arr)
print("Sorted array:", arr)
`,

  JavaScript: `const shellSort = (arr) => {
  /**
   * Sorts the array using the Shell Sort algorithm.
   */
  const n = arr.length;
  let gap = Math.floor(n / 2);
  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = temp;
    }
    gap = Math.floor(gap / 2);
  }
};

// Example usage:
const arr = [64, 25, 12, 22, 11];
console.log("Original array:", arr);
shellSort(arr);
console.log("Sorted array:", arr);
`,

  "C++": `#include <iostream>
#include <vector>

void shellSort(std::vector<int>& arr) {
    /**
     * Sorts the array using the Shell Sort algorithm.
     */
    int n = arr.size();
    int gap = n / 2;
    while (gap > 0) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j = i;
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
        gap /= 2;
    }
}

int main() {
    // Example usage:
    std::vector<int> arr = {64, 25, 12, 22, 11};
    std::cout << "Original array:";
    for (int num : arr) {
        std::cout << " " << num;
    }
    std::cout << std::endl;

    shellSort(arr);

    std::cout << "Sorted array:";
    for (int num : arr) {
        std::cout << " " << num;
    }
    std::cout << std::endl;

    return 0;
}
`,
};
