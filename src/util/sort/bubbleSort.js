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
  Python: `def bubbleSort(arr):
    n = len(arr)

    # Iterate through all array elements
    for i in range(n - 1):

      # Last i elements are already sorted, so we don't need to check them
      for j in range(n - i - 1):

        # Swap if the element found is greater than the next element
        if arr[j] > arr[j + 1]:
          arr[j], arr[j + 1] = arr[j + 1], arr[j]

# Example usage:
my_array = [64, 25, 12, 22, 11]
bubble_sort(my_array)
print("Sorted array:", my_array)  # Output: [11, 12, 22, 25, 64]`,

  JavaScript: `const bubbleSort = arr => {
    const n = arr.length;

    // Iterate through all array elements
    for (let i = 0; i < n - 1; i++) {

        // Last i elements are already sorted, so we don't need to check them
        for (let j = 0; j < n - i - 1; j++) {

            // Swap if the element found is greater than the next element
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
}

// Example usage:
let myArray = [64, 25, 12, 22, 11];
bubbleSort(myArray);
console.log("Sorted array:", myArray); // Output: [11, 12, 22, 25, 64]`,

  "C++": `#include <iostream>
#include <vector>
  
void bubbleSort(std::vector<int>& vect) {

    int n = vect.size();
    for (int i = 0; i < n - 1; i++) {

        // Last i elements are already sorted, so we don't need to check them
        for (int j = 0; j < n - i - 1; j++) {

            // Swap if the element found is greater than the next element
            if (vect[j] > vect[j + 1]) {
                std::swap(vect[j], vect[j + 1]);
            }
        }
    }
}

int main() {
    // Example usage:
    std::vector<int> myVector = {64, 25, 12, 22, 11};

    bubbleSort(myVector);

    std::cout << "Sorted vector: ";
    for (int i = 0; i < myVector.size(); i++) {
        std::cout << myVector.at(i) << " ";
    }
    // Output: Sorted vector: 11 12 22 25 64

    return 0;
}`,
};
