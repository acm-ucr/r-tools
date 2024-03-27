import { getArray } from "./visualize.js";

export const code = [
  "isSorted(arr):", // 0
  "\xa0\xa0\xa0\xa0for (i = 1; i < arr.length; i++):",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0if (arr[i] < arr[i - 1]):",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0return false",
  "\xa0\xa0\xa0\xa0return true",
  "",
  "shuffle(arr):", // 6
  "\xa0\xa0\xa0\xa0for (i = 0; i < arr.length; i++):",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0random = random(0, arr.length - 1)",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0arr[i], arr[random] = arr[random], arr[i]",
  "\xa0\xa0\xa0\xa0return arr",
  "",
  "bogosort(arr):", // 12
  "\xa0\xa0\xa0\xa0while (!isSorted(arr)):",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0arr = shuffle(arr)",
  "\xa0\xa0\xa0\xa0return arr",
];

function* isSorted(arr) {
  yield { line: 0, array: getArray(arr, {}) };
  for (let i = 1; i < arr.length; i++) {
    yield { line: 2, array: getArray(arr, { [i]: "i", [i - 1]: "i-1" }) };
    if (arr[i] < arr[i - 1]) {
      yield { line: 3, array: getArray(arr, {}) };
      return false;
    }
    yield { line: 1, array: getArray(arr, { [i + 1]: "i+1" }) };
  }
  yield { line: 4, array: getArray(arr, {}) };
  return true;
}

function* shuffle(arr) {
  yield { line: 6, array: getArray(arr, {}) };
  for (let i = 0; i < arr.length; i++) {
    yield { line: 7, array: getArray(arr, { [i]: "i" }) };
    const random = Math.floor(Math.random() * arr.length);
    yield {
      line: 8,
      array: getArray(arr, { [i]: "i", [random]: "random" }),
    };
    yield {
      line: 9,
      array: getArray(arr, { [i]: "i", [random]: "random" }),
    };
    const swap = arr[random];
    arr[random] = arr[i];
    arr[i] = swap;
    yield {
      line: 9,
      array: getArray(arr, { [i]: "i", [random]: "random" }),
    };
    yield { line: 7, array: getArray(arr, { [i + 1]: "i+1" }) };
  }
  yield { line: 10, array: getArray(arr, {}) };
  return arr;
}

export function* sort(arr) {
  yield { line: 12, array: getArray(arr, {}) };
  yield { line: 13, array: getArray(arr, {}) };
  let arrIsSorted = yield* isSorted(arr);
  while (!arrIsSorted) {
    yield { line: 13, array: getArray(arr, {}) };
    yield { line: 14, array: getArray(arr, {}) };
    arr = yield* shuffle(arr);
    yield { line: 14, array: getArray(arr, {}) };
    yield { line: 13, array: getArray(arr, {}) };
    arrIsSorted = yield* isSorted(arr);
    yield { line: 13, array: getArray(arr, {}) };
  }
  yield { line: 15, array: getArray(arr, {}) };
}

export const example = {
  Python: `import random
def is_sorted(arr):
    # Check if the array is sorted.
    for i in range(len(arr) - 1):
        if arr[i] > arr[i + 1]:
            return False
    return True

def bogo_sort(arr):
    # Sorts the array using Bogo Sort algorithm.
    while not is_sorted(arr):
        random.shuffle(arr)
    return arr

if __name__ == "__main__":
    # Example usage:
    arr = [3, 1, 5, 2, 4]
    print("Original array:", arr)
    sorted_arr = bogo_sort(arr)
    print("Sorted array:", sorted_arr)

`,
  JavaScript: `// Function to check if the array is sorted
const isSorted = arr => {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false;
        }
    }
    return true;
};

// Function to shuffle the array
const shuffleArray = arr => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
};

// Function to perform Bogo Sort
const bogoSort = arr => {
    while (!isSorted(arr)) {
        shuffleArray(arr);
    }
    return arr;
};

// Example usage:
const arr = [3, 1, 5, 2, 4];
console.log("Original array:", arr);
const sortedArr = bogoSort(arr.slice()); // Create a copy of the original array to avoid modifying it
console.log("Sorted array:", sortedArr);  
`,
  "C++": `#include <iostream>
#include <vector>
#include <algorithm>
#include <random>

// Function to check if the array is sorted
bool isSorted(const std::vector<int>& arr) {
    for (size_t i = 0; i < arr.size() - 1; ++i) {
        if (arr[i] > arr[i + 1]) {
            return false;
        }
    }
    return true;
}

// Function to shuffle the array
void shuffleArray(std::vector<int>& arr) {
    std::random_device rd;
    std::mt19937 gen(rd());

    for (size_t i = arr.size() - 1; i > 0; --i) {
        std::uniform_int_distribution<size_t> dis(0, i);
        size_t j = dis(gen);
        std::swap(arr[i], arr[j]); // Swap elements
    }
}

// Function to perform Bogo Sort
void bogoSort(std::vector<int>& arr) {
    while (!isSorted(arr)) {
        shuffleArray(arr);
    }
}

int main() {
    // Example usage:
    std::vector<int> arr = {3, 1, 5, 2, 4};
    std::cout << "Original array: ";
    for (int num : arr) {
        std::cout << num << " ";
    }
    std::cout << std::endl;

    bogoSort(arr);

    std::cout << "Sorted array: ";
    for (int num : arr) {
        std::cout << num << " ";
    }
    std::cout << std::endl;

    return 0;
}

`,
};
