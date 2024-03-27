import { getArray } from "./visualize.js";

export const code = [
  "function quickSort(arr, low, high) {",
  "\xa0\xa0\xa0\xa0function partition(arr, low, high) {",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0let pivot = arr[high];",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0let i = low - 1;",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0for (let j = low; j < high; j++) {",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0if (arr[j] < pivot) {",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0i++;",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0[arr[i], arr[j]] = [arr[j], arr[i]];",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0}",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0}",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0return i + 1;",
  "\xa0\xa0\xa0\xa0}",
  "\xa0\xa0\xa0\xa0if (low < high) {",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0let partitionIndex = partition(arr, low, high);",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0quickSort(arr, low, partitionIndex - 1);",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0quickSort(arr, partitionIndex + 1, high);",
  "\xa0\xa0\xa0\xa0}",
  "}",
];

export function* sort(arr, low, high) {
  function* partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      yield { line: 5, array: getArray(arr, [i, j, high], [j]) };
      if (arr[j] < pivot) {
        yield { line: 6, array: getArray(arr, [i, j, high], [j]) };
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        yield { line: 7, array: getArray(arr, [i, j, high], [j]) };
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    yield { line: 9, array: getArray(arr, [i + 1, high]) };

    return i + 1;
  }

  if (low < high) {
    const partitionIndex = yield* partition(arr, low, high);
    yield* quickSort(arr, low, partitionIndex - 1);
    yield* quickSort(arr, partitionIndex + 1, high);
  }
}

export const example = {
  Python: `def partition(arr, low, high):
"""
Picks the last element as pivot, places the pivot element at its correct position in sorted array,
and places all smaller elements (smaller than pivot) to left of pivot and all greater elements to right of pivot.
"""
pivot = arr[high]  # pivot
i = low - 1  # Index of smaller element

for j in range(low, high):
    # If current element is smaller than or equal to pivot
    if arr[j] <= pivot:
        i += 1  # increment index of smaller element
        arr[i], arr[j] = arr[j], arr[i]

arr[i + 1], arr[high] = arr[high], arr[i + 1]
return i + 1


def quick_sort(arr, low, high):
"""
The main function that implements QuickSort
"""
if low < high:
    # pi is partitioning index, arr[p] is now at right place
    pi = partition(arr, low, high)

    # Separately sort elements before partition and after partition
    quick_sort(arr, low, pi - 1)
    quick_sort(arr, pi + 1, high)

if __name__ == "__main__":
# Example usage:
arr = [10, 7, 8, 9, 1, 5]
print("Original array:", arr)
quick_sort(arr, 0, len(arr) - 1)
print("Sorted array:", arr)
`,
  JavaScript: `const partition = (arr, low, high) => {
  /**
   * Picks the last element as pivot, places the pivot element at its correct position in sorted array,
   * and places all smaller elements (smaller than pivot) to left of pivot and all greater elements to right of pivot.
   */
  const pivot = arr[high]; // pivot
  let i = low - 1; // Index of smaller element

  for (let j = low; j < high; j++) {
    // If current element is smaller than or equal to pivot
    if (arr[j] <= pivot) {
      i++; // increment index of smaller element
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
};

const quickSort = (arr, low, high) => {
  /**
   * The main function that implements QuickSort
   */
  if (low < high) {
    // pi is partitioning index, arr[p] is now at right place
    const pi = partition(arr, low, high);

    // Separately sort elements before partition and after partition
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
};

// Example usage:
const arr = [10, 7, 8, 9, 1, 5];
console.log("Original array:", arr);
quickSort(arr, 0, arr.length - 1);
console.log("Sorted array:", arr);
`,

  "C++": `#include <iostream>
#include <vector>

int partition(std::vector<int> &arr, int low, int high)
{
    /**
     * Picks the last element as pivot, places the pivot element at its correct position in sorted array,
     * and places all smaller elements (smaller than pivot) to left of pivot and all greater elements to right of pivot.
     */
    int pivot = arr[high]; // pivot
    int i = low - 1;       // Index of smaller element

    for (int j = low; j < high; j++)
    {
        // If current element is smaller than or equal to pivot
        if (arr[j] <= pivot)
        {
            i++; // increment index of smaller element
            std::swap(arr[i], arr[j]);
        }
    }

    std::swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(std::vector<int> &arr, int low, int high)
{
    /**
     * The main function that implements QuickSort
     */
    if (low < high)
    {
        // pi is partitioning index, arr[p] is now at right place
        int pi = partition(arr, low, high);

        // Separately sort elements before partition and after partition
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int main()
{
    // Example usage:
    std::vector<int> arr = {10, 7, 8, 9, 1, 5};
    std::cout << "Original array:";
    for (int num : arr)
    {
        std::cout << " " << num;
    }
    std::cout << std::endl;

    quickSort(arr, 0, arr.size() - 1);

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
