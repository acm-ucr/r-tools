import { getArray } from "./visualize.js";

export const code = [
  "for i in range(arr.length - 1):",
  "\xa0\xa0\xa0\xa0for j in range(arr.length - i - 1):",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0if arr[j] > arr[j + 1]:",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0arr[j], arr[j + 1] = arr[j + 1], arr[j]",
  "return arr",
];

export function* sort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      yield {
        line: 1,
        array: getArray(arr, { [j]: "j", [j + 1]: "j+1" }),
      };
      if (arr[j] > arr[j + 1]) {
        yield {
          line: 2,
          array: getArray(arr, { [j]: "j", [j + 1]: "j+1" }),
        };
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        yield { line: 3, array: getArray(arr, { [j]: "j" }) };
      }
    }
  }
}

export const example = {
  Python: `def bubble_sort(arr):
  # Sorts the array using the Bubble Sort algorithm.
  n = len(arr)
  for i in range(n - 1):
      # Last i elements are already in place
      for j in range(n - i - 1):
          # Traverse the array from 0 to n-i-1
          # Swap if the element found is greater
          # than the next element
          if arr[j] > arr[j + 1]:
              # Swap arr[j] and arr[j+1]
              arr[j], arr[j + 1] = arr[j + 1], arr[j]

if __name__ == "__main__":
  # Example usage:
  arr = [64, 34, 25, 12, 22, 11, 90]
  print("Original array:", arr)
  bubble_sort(arr)
  print("Sorted array:", arr)`,

  JavaScript: `const bubbleSort = (arr) => {
  /**
   * Sorts the array using the Bubble Sort algorithm.
   */
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    // Last i elements are already in place
    for (let j = 0; j < n - i - 1; j++) {
      // Traverse the array from 0 to n-i-1
      // Swap if the element found is greater
      // than the next element
      if (arr[j] > arr[j + 1]) {
        // Swap arr[j] and arr[j+1]
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
};

// Example usage:
const arr = [64, 34, 25, 12, 22, 11, 90];
console.log("Original array:", arr);
bubbleSort(arr);
console.log("Sorted array:", arr);

`,

  "C++": `#include <iostream>
#include <vector>

void bubbleSort(std::vector<int>& arr) {
    /**
     * Sorts the array using the Bubble Sort algorithm.
     */
    const int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        // Last i elements are already in place
        for (int j = 0; j < n - i - 1; j++) {
            // Traverse the array from 0 to n-i-1
            // Swap if the element found is greater
            // than the next element
            if (arr[j] > arr[j + 1]) {
                // Swap arr[j] and arr[j+1]
                std::swap(arr[j], arr[j + 1]);
            }
        }
    }
}

int main() {
    // Example usage:
    std::vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    std::cout << "Original array: ";
    for (int num : arr) {
        std::cout << num << " ";
    }
    std::cout << std::endl;

    bubbleSort(arr);

    std::cout << "Sorted array: ";
    for (int num : arr) {
        std::cout << num << " ";
    }
    std::cout << std::endl;

    return 0;
}
`,
};
