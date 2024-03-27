import { getArray } from "./visualize.js";

export const code = [
  "for i in range(arr.length - 1):",
  "\xa0\xa0\xa0\xa0min_index = i",
  "\xa0\xa0\xa0\xa0for j in range(i + 1, arr.length):",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0if arr[j] < arr[min_index]:",
  " \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0min_index = j",
  " \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0arr[i], arr[min_index] = arr[min_index], arr[i]",
  "return arr",
];

export function* sort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    yield { line: 0, array: getArray(arr, { [i]: "i" }) };
    let minIndex = i;
    yield { line: 1, array: getArray(arr, { [i]: "i", [minIndex]: "min" }) };
    for (let j = i + 1; j < arr.length; j++) {
      yield {
        line: 2,
        array: getArray(arr, { [i]: "i", [minIndex]: "min", [j]: "j" }),
      };
      yield {
        line: 3,
        array: getArray(arr, { [i]: "i", [minIndex]: "min", [j]: "j" }),
      };
      if (arr[j] < arr[minIndex]) {
        yield {
          line: 4,
          array: getArray(arr, { [i]: "i", [minIndex]: "min", [j]: "j" }),
        };
        minIndex = j;
        yield {
          line: 5,
          array: getArray(arr, { [i]: "i", [minIndex]: "min", [j]: "j" }),
        };
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    yield { line: 6, array: getArray(arr, { [i]: "i", [minIndex]: "min" }) };
  }
}

export const example = {
  Python: `def selection_sort(arr):
  """
  Sorts the array using the Selection Sort algorithm.
  """
  n = len(arr)
  for i in range(n - 1):
      min_index = i
      for j in range(i + 1, n):
          if arr[j] < arr[min_index]:
              min_index = j
      arr[i], arr[min_index] = arr[min_index], arr[i]

if __name__ == "__main__":
  # Example usage:
  arr = [64, 25, 12, 22, 11]
  print("Original array:", arr)
  selection_sort(arr)
  print("Sorted array:", arr)
`,

  JavaScript: `const selectionSort = (arr) => {
  /**
   * Sorts the array using the Selection Sort algorithm.
   */
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]; // Swap elements
  }
};

// Example usage:
const arr = [64, 25, 12, 22, 11];
console.log("Original array:", arr);
selectionSort(arr);
console.log("Sorted array:", arr);
`,

  "C++": `#include <iostream>
#include <vector>

void selectionSort(std::vector<int> &arr)
{
    /**
     * Sorts the array using the Selection Sort algorithm.
     */
    int n = arr.size();
    for (int i = 0; i < n - 1; i++)
    {
        int minIndex = i;
        for (int j = i + 1; j < n; j++)
        {
            if (arr[j] < arr[minIndex])
            {
                minIndex = j;
            }
        }
        std::swap(arr[i], arr[minIndex]); // Swap elements
    }
}

int main()
{
    // Example usage:
    std::vector<int> arr = {64, 25, 12, 22, 11};
    std::cout << "Original array:";
    for (int num : arr)
    {
        std::cout << " " << num;
    }
    std::cout << std::endl;

    selectionSort(arr);

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
