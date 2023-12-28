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
      if (arr[j] < arr[minIndex]) {
        yield {
          line: 3,
          array: getArray(arr, { [i]: "i", [minIndex]: "min", [j]: "j" }),
        };
        minIndex = j;
        yield {
          line: 4,
          array: getArray(arr, { [i]: "i", [minIndex]: "min", [j]: "j" }),
        };
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    yield { line: 5, array: getArray(arr, { [i]: "i", [minIndex]: "min" }) };
  }
}

export const example = {
  Python:
    'def selection_sort(arr):\nn = len(arr)\n\nfor i in range(n - 1):\n    # Assume the current index is the minimum\n    min_index = i\n\n    # Check the rest of the array to find the minimum element\n    for j in range(i + 1, n):\n        if arr[j] < arr[min_index]:\n            min_index = j\n\n    # Swap the found minimum element with the first element\n    arr[i], arr[min_index] = arr[min_index], arr[i]\n\n# Example usage:\nmy_array = [64, 25, 12, 22, 11]\nselection_sort(my_array)\nprint("Sorted array:", my_array) # output:[11, 12, 22, 25, 64]',
  JavaScript:
    'function selectionSort(arr) {\n    const n = arr.length;\n\n    for (let i = 0; i < n - 1; i++) {\n        // Assume the current index is the minimum\n        let minIndex = i;\n\n        // Check the rest of the array to find the minimum element\n        for (let j = i + 1; j < n; j++) {\n            if (arr[j] < arr[minIndex]) {\n                minIndex = j;\n            }\n        }\n\n        // Swap the found minimum element with the first element\n        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];\n    }\n}\n\n// Example usage:\nlet myArray = [64, 25, 12, 22, 11];\nselectionSort(myArray);\nconsole.log("Sorted array:", myArray);',
  "C++":
    '#include <iostream>\n\nvoid selectionSort(int arr[], int n) {\n    for (int i = 0; i < n - 1; i++) {\n        // Assume the current index is the minimum\n        int minIndex = i;\n\n        // Check the rest of the array to find the minimum element\n        for (int j = i + 1; j < n; j++) {\n            if (arr[j] < arr[minIndex]) {\n                minIndex = j;\n            }\n        }\n\n        // Swap the found minimum element with the first element\n        std::swap(arr[i], arr[minIndex]);\n    }\n}\n\nint main() {\n    // Example usage:\n    int myArray[] = {64, 25, 12, 22, 11};\n    int n = sizeof(myArray) / sizeof(myArray[0]);\n\n    selectionSort(myArray, n);\n\n    std::cout << "Sorted array: ";\n    for (int i = 0; i < n; i++) {\n        std::cout << myArray[i] << " ";\n    }\n\n    return 0;\n}',
};
