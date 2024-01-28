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
  Python:
    'def insertion_sort(arr):\n    for i in range(1, len(arr)):\n      key = arr[i]\n      # Move elements of arr[0..i-1] that are greater than key to one position ahead of their current position\n      j = j - 1\n\n      while j >= 0 and key < arr[j]:\n        arr[j+1] = arr[j]\n        j -= 1\n      arr[j+1] = key\n\n# Example usage:\nmy_array = [12, 11, 13, 5, 6]\ninsertion_sort(my_array)\nprint("Sorted array:", my_array) # output:[5, 6, 11, 12, 13]',
  JavaScript:
    'function insertionSort(arr) {\n  let n = arr.length;\n\n  for (let i = 1; i < n - 1; i++) {\n    let key =  arr[i];\n    let j = i - 1;    \n\n    // Move elements of arr[0..i-1] that are greater than key to one position ahead of their current position\n    while (j >= 0 && arr[j] > key) {\n      arr[j+1] = arr[j];\n      j = j - 1;\n    }\n    arr[j+1] = key;\n  }\n}\n\n// Example usage:\nlet myArray = [12, 11, 13, 5, 6];\ninerstionSort(myArray);\nconsole.log("Sorted array:", myArray);',
  "C++":
    '#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid insertionSort(vector<int>& arr) {\n\n  for (int i = 1; i < arr.size(); i++) {\n    int key = arr[i];\n    int j = i - 1;\n\n    // Move elements of arr[0..i-1] that are greater than key to one position ahead of their current position\n    while (j >= 0 && arr[j] > key) {\n      arr[j+1] = arr[j];\n      j = j - 1;\n    }\n    arr[j+1] = key;\n  }\n}\n\nint main() {\n  // Example usage:\n  vector<int> myVector = {12, 11, 13, 5, 6};\n  insertionSort(myVector);\n\n  cout << "Sorted array: ";\n\n  for (int i = 0; i < myVector.size(); i++) {\n    cout << myVector.at(i) << " ";\n  }\n\n  return 0;\n}',
};
