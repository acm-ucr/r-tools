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
  Python:
    'def quick_sort(arr, low, high):\n    if low < high:\n        # Find pivot element such that\n        partitionIndex = partition(arr, low, high)\n\n        # Recursively sort the two halves\n        quick_sort(arr, low, partitionIndex - 1)\n        quick_sort(arr, partitionIndex + 1, high)\n\n\ndef partition(arr, low, high):\n    pivot = arr[high]\n    i = low - 1\n\n    for j in range(low, high):\n        # If current element is smaller than or equal to pivot \n        if arr[j] <= pivot:\n            i += 1\n\n            # Swap elements at i and j\n            arr[i], arr[j] = arr[j], arr[i]\n\n    # Swap pivot element to its correct position\n    arr[i + 1], arr[high] = arr[high], arr[i + 1]\n\n    # Return the index of the pivot element\n    return i + 1\n\n# Example usage:\nmy_array = [64, 25, 12, 22, 11]\nquick_sort(my_array, 0, len(my_array) - 1)\nprint("Sorted array:", my_array)  # Output: [11, 12, 22, 25, 64]',
  JavaScript:
    'function quickSort(arr, low, high) {\n    if (low < high) {\n        // Find pivot element such that\n        let partitionIndex = partition(arr, low, high);\n\n        // Recursively sort the two halves\n        quickSort(arr, low, partitionIndex - 1);\n        quickSort(arr, partitionIndex + 1, high);\n    }\n}\n\nfunction partition(arr, low, high) {\n    let pivot = arr[high];\n    let i = low - 1;\n\n    for (let j = low; j < high; j++) {\n        // If current element is smaller than or equal to pivot\n        if (arr[j] <= pivot) {\n            i++;\n\n            // Swap elements at i and j\n            [arr[i], arr[j]] = [arr[j], arr[i]];\n        }\n    }\n\n    // Swap pivot element to its correct position\n    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];\n\n    // Return the index of the pivot element\n    return i + 1;\n}\n\n// Example usage:\nlet myArray = [64, 25, 12, 22, 11];\nquickSort(myArray, 0, myArray.length - 1);\nconsole.log("Sorted array:", myArray);  // Output: [11, 12, 22, 25, 64]',
  "C++":
    '#include <iostream>\n\nvoid quickSort(int arr[], int low, int high) {\n    if (low < high) {\n        // Find pivot element such that\n        int partitionIndex = partition(arr, low, high);\n\n        // Recursively sort the two halves\n        quickSort(arr, low, partitionIndex - 1);\n        quickSort(arr, partitionIndex + 1, high);\n    }\n}\n\nint partition(int arr[], int low, int high) {\n    int pivot = arr[high];\n    int i = low - 1;\n\n    for (int j = low; j < high; j++) {\n        // If current element is smaller than or equal to pivot\n        if (arr[j] <= pivot) {\n            i++;\n\n            // Swap elements at i and j\n            std::swap(arr[i], arr[j]);\n        }\n    }\n\n    // Swap pivot element to its correct position\n    std::swap(arr[i + 1], arr[high]);\n\n    // Return the index of the pivot element\n    return i + 1;\n}\n\nint main() {\n    // Example usage:\n    int myArray[] = {64, 25, 12, 22, 11};\n    int n = sizeof(myArray) / sizeof(myArray[0]);\n\n    quickSort(myArray, 0, n - 1);\n\n    std::cout << "Sorted array: ";\n    for (int i = 0; i < n; i++) {\n        std::cout << myArray[i] << " ";  // Output: [11, 12, 22, 25, 64]\n    }\n\n    return 0;\n}',
};
