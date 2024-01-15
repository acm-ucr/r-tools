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
  Python: `def quick_sort(arr, low, high):
  if low < high:
    # Find pivot element such that 
    partitionIndex = partition(arr, low, high)

    # Recursively sort the two halves
    quick_sort(arr, low, partitionIndex - 1)
    quick_sort(arr, partitionIndex + 1, high)


def partition(arr, low, high):
  pivot = arr[high]
  i = low - 1

  for j in range(low, high):
    # If current element is smaller than or equal to pivot
    if arr[j] <= pivot:
      i += 1

      # Swap elements at i and j
      arr[i], arr[j] = arr[j], arr[i]

  # Swap pivot element to its correct position
  arr[i + 1], arr[high] = arr[high], arr[i + 1]

  # Return the index of the pivot element
  return i + 1

# Example usage:
my_array = [64, 25, 12, 22, 11]
quick_sort(my_array, 0, len(my_array) - 1)
print("Sorted array:", my_array)  # Output: [11, 12, 22, 25, 64]
`,
  JavaScript: `const quickSort = (arr, low, high) => {
    if (low < high) {
  
      // Find pivot element such that
      let partitionIndex = partition(arr, low, high);
  
      // Recursively sort the two halves
      quickSort(arr, low, partitionIndex - 1);
      quickSort(arr, partitionIndex + 1, high);
  
    }
  
}

const partition = (arr, low, high) => {
  let pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
  
    // If current element is smaller than or equal to pivot
    if (arr[j] <= pivot) {
      i++;
  
      // Swap elements at i and j
      [arr[i], arr[j]] = [arr[j], arr[i]];
  
    }
  
  }
  
  // Swap pivot element to its correct position
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  
  // Return the index of the pivot element
  return i + 1;
  
}
  
// Example usage:
  
let myArray = [64, 25, 12, 22, 11]; 
quickSort(myArray, 0, myArray.length - 1);
console.log("Sorted array:", myArray); // Output: [11, 12, 22, 25, 64]`,

  "C++": `#include <iostream>

int partition(int arr[], int low, int high) {
  int pivot = arr[high];
  int i = low - 1;
  
  for (int j = low; j < high; j++) {
    // If current element is smaller than or equal to pivot
    if (arr[j] <= pivot) {
      i++;
  
      // Swap elements at i and j
      std::swap(arr[i], arr[j]);
    }
  }
  
  // Swap pivot element to its correct position
  std::swap(arr[i + 1], arr[high]);
  
  // Return the index of the pivot element
  return i + 1;
  
}

void quickSort(int arr[], int low, int high) {
  if (low < high) {
  
    // Find pivot element such that
    int partitionIndex = partition(arr, low, high);  
  
    // Recursively sort the two halves 
    quickSort(arr, low, partitionIndex - 1);
    quickSort(arr, partitionIndex + 1, high);
  
  }
  
}

int main() {
  
  // Example usage:
  int myArray[] = {64, 25, 12, 22, 11};
  int n = sizeof(myArray) / sizeof(myArray[0]);
  quickSort(myArray, 0, n - 1);
  std::cout << "Sorted array: ";
  for (int i = 0; i < n; i++) {
    std::cout << myArray[i] << " "; // Output: [11, 12, 22, 25, 64] 
  }
  
  return 0;
  
}`,
};
