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
  Python:
    'def bubble_sort(arr):\n    n = len(arr)\n\n    # Iterate through all array elements\n    for i in range(n - 1):\n        # Last i elements are already sorted, so we don\'t need to check them\n\n        for j in range(n - i - 1):\n            # Swap if the element found is greater than the next element\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n\n# Example usage:\nmy_array = [64, 25, 12, 22, 11]\nbubble_sort(my_array)\nprint("Sorted array:", my_array)  # Output: [11, 12, 22, 25, 64]',
  JavaScript:
    'function bubbleSort(arr) {\n    const n = arr.length;\n\n    // Iterate through all array elements\n    for (let i = 0; i < n - 1; i++) {\n        // Last i elements are already sorted, so we don\'t need to check them\n\n        for (let j = 0; j < n - i - 1; j++) {\n            // Swap if the element found is greater than the next element\n            if (arr[j] > arr[j + 1]) {\n                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n            }\n        }\n    }\n}\n\n// Example usage:\nlet myArray = [64, 25, 12, 22, 11];\nbubbleSort(myArray);\nconsole.log("Sorted array:", myArray);',
  "C++":
    '//#include <iostream>\n\nvoid bubbleSort(int arr[], int n) {\n    // Iterate through all array elements\n    for (int i = 0; i < n - 1; i++) {\n        // Last i elements are already sorted, so we don\'t need to check them\n\n        for (int j = 0; j < n - i - 1; j++) {\n            // Swap if the element found is greater than the next element\n            if (arr[j] > arr[j + 1]) {\n                std::swap(arr[j], arr[j + 1]);\n            }\n        }\n    }\n}\n\nint main() {\n    // Example usage:\n    int myArray[] = {64, 25, 12, 22, 11};\n    int n = sizeof(myArray) / sizeof(myArray[0]);\n\n    bubbleSort(myArray, n);\n\n    std::cout << "Sorted array: ";\n    for (int i = 0; i < n; i++) {\n        std::cout << myArray[i] << " ";\n    }\n\n    return 0;\n}',
};
