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
  Python: `def selection_sort(arr):
    n = len(arr)

    for i in range(n - 1):
      # Assume the current index is the minimum  
      min_index = i

      # Check the rest of the array to find the minimum element
      for j in range(i + 1, n):  
        if arr[j] < arr[min_index]:
          min_index = j

      # Swap the found minimum element with the first element
      arr[i], arr[min_index] = arr[min_index], arr[i]

# Example usage:
my_array = [64, 25, 12, 22, 11]
selection_sort(my_array)
print("Sorted array:", my_array) # Output:[11, 12, 22, 25, 64]`,

  JavaScript: `const selection_sort = arr => {
    const n = arr.length;
  
    for (let i = 0; i < n - 1; i++) {
        // Assume the current index is the minimum
        let minIndex = i;
  
        // Check the rest of the array to find the minimum element
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
          }
        }
  
    // Swap the found minimum element with the first element  
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
}

// Example usage:
let myArray = [64, 25, 12, 22, 11];
selectionSort(myArray);
console.log("Sorted array:", myArray); // Output:[11, 12, 22, 25, 64]
  `,

  "C++": `#include <iostream>
  
void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        // Assume the current index is the minimum
        int minIndex = i;
  
        // Check the rest of the array to find the minimum element
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
  
        // Swap the found minimum element with the first element
        std::swap(arr[i], arr[minIndex]);
    }
}
  
int main() {
    // Example usage:
    int myArray[] = {64, 25, 12, 22, 11};
    int n = sizeof(myArray) / sizeof(myArray[0]);
  
    selectionSort(myArray, n);
  
    std::cout << "Sorted array: ";
    for (int i = 0; i < n; i++) {
        std::cout << myArray[i] << " ";
    }
    // Output: Sorted array: 11 12 22 25 64
  
    return 0;
}`,
};
