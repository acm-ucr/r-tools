import { getArray } from "./visualize.js";

export const code = [
  "insertionSort(arr):",
  "\xa0\xa0\xa0\xa0for i in range(1, len(arr)):",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0key = arr[i]",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0j = i - 1",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0while j >= 0 and key < arr[j]:",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0arr[j + 1] = arr[j]",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0j -= 1",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0arr[j + 1] = key",
];

export function* sort(arr) {
  const n = arr.length;
  yield { line: 1, array: getArray(arr, [0]) };
  for (let i = 1; i < n; i++) {
    yield { line: 2, array: getArray(arr, [i]) };
    const key = arr[i];
    yield { line: 3, array: getArray(arr, [i]) };
    let j = i - 1;
    yield { line: 4, array: getArray(arr, [i, j]) };
    while (j >= 0 && arr[j] > key) {
      yield { line: 5, array: getArray(arr, [i, j]) };
      arr[j + 1] = arr[j];
      yield { line: 6, array: getArray(arr, [i, j]) };
      j = j - 1;
    }
    yield { line: 7, array: getArray(arr, [i, j]) };
    arr[j + 1] = key;
  }
  yield { line: 7, array: getArray(arr, []) };
}

export const example = {
  Python: `def insertion_sort(arr):
  # Sorts the array using the Insertion Sort algorithm.
  for i in range(1, len(arr)):
      key = arr[i]
      j = i - 1
      # Move elements of arr[0..i-1] that are greater than key to one position ahead of their current position
      while j >= 0 and arr[j] > key:
          arr[j + 1] = arr[j]
          j -= 1
      arr[j + 1] = key

if __name__ == "__main__":
  # Example usage:
  arr = [12, 11, 13, 5, 6]
  print("Original array:", arr)
  insertion_sort(arr)
  print("Sorted array:", arr)
`,
  JavaScript: `const insertionSort = (arr) => {
  /**
   * Sorts the array using the Insertion Sort algorithm.
   */
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    // Move elements of arr[0..i-1] that are greater than key to one position ahead of their current position
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
};

// Example usage:
const arr = [12, 11, 13, 5, 6];
console.log("Original array:", arr);
insertionSort(arr);
console.log("Sorted array:", arr);
`,
  "C++": `#include <iostream>
#include <vector>

void insertionSort(std::vector<int> &arr)
{
    /**
     * Sorts the array using the Insertion Sort algorithm.
     */
    for (size_t i = 1; i < arr.size(); i++)
    {
        int key = arr[i];
        int j = i - 1;
        // Move elements of arr[0..i-1] that are greater than key to one position ahead of their current position
        while (j >= 0 && arr[j] > key)
        {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

int main()
{
    // Example usage:
    std::vector<int> arr = {12, 11, 13, 5, 6};
    std::cout << "Original array:";
    for (int num : arr)
    {
        std::cout << " " << num;
    }
    std::cout << std::endl;

    insertionSort(arr);

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
