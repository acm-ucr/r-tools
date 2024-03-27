import { getArrayColor, getTable } from "./visualize.js";

export const code = [
  "function heapSort(arr):",
  "\xa0\xa0\xa0\xa0n = arr.length",
  "\xa0\xa0\xa0\xa0// Build a max heap (rearrange array)",
  "\xa0\xa0\xa0\xa0for i from floor(n/2) - 1 to 0:",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0heapify(arr, i, n)",
  "",
  "\xa0\xa0\xa0\xa0// One by one extract elements from the heap",
  "\xa0\xa0\xa0\xa0for i from n - 1 to 1:",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0// Swap the root (maximum element) with the last element",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0swap(arr[0], arr[i])",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0// Call heapify on the reduced heap",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0heapify(arr, 0, i)",
  "",
  "function heapify(arr, i, n):",
  "\xa0\xa0\xa0\xa0largest = i",
  "\xa0\xa0\xa0\xa0left = 2 * i + 1",
  "\xa0\xa0\xa0\xa0right = 2 * i + 2",
  "\xa0\xa0\xa0\xa0// Compare with left child",
  "\xa0\xa0\xa0\xa0if left < n and arr[left] > arr[largest]:",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0largest = left",
  "\xa0\xa0\xa0\xa0// Compare with right child",
  "\xa0\xa0\xa0\xa0if right < n and arr[right] > arr[largest]:",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0largest = right",
  "",
  "\xa0\xa0\xa0\xa0// Swap if the largest is not the root",
  "\xa0\xa0\xa0\xa0if largest != i:",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0swap(arr[i], arr[largest])",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0// Recursively heapify the affected sub-tree",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0heapify(arr, largest, n)",
  "",
];

function* heapify(arr, i, n) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  yield {
    line: 14,
    array: getTable([arr], [{ row: 0, col: largest, color: "purple" }]),
    heap: getArrayColor(arr, { [largest]: "purple" }),
  };
  yield {
    line: 15,
    array: getTable(
      [arr],
      [
        { row: 0, col: largest, color: "purple" },
        { row: 0, col: left, color: "purple" },
      ]
    ),
    heap: getArrayColor(arr, { [largest]: "purple", [left]: "purple" }),
  };
  yield {
    line: 16,
    array: getTable(
      [arr],
      [
        { row: 0, col: largest, color: "purple" },
        { row: 0, col: left, color: "purple" },
        { row: 0, col: right, color: "purple" },
      ]
    ),
    heap: getArrayColor(arr, {
      [largest]: "purple",
      [left]: "purple",
      [right]: "purple",
    }),
  };
  if (left < n && arr[left] > arr[largest]) {
    yield {
      line: 18,
      array: getTable(
        [arr],
        [
          { row: 0, col: largest, color: "purple" },
          { row: 0, col: left, color: "purple" },
        ]
      ),
      heap: getArrayColor(arr, {
        [largest]: "purple",
        [left]: "purple",
      }),
    };
    largest = left;
    yield {
      line: 19,
      array: getTable(
        [arr],
        [
          { row: 0, col: largest, color: "purple" },
          { row: 0, col: left, color: "purple" },
        ]
      ),
      heap: getArrayColor(arr, {
        [largest]: "purple",
        [left]: "purple",
      }),
    };
  }
  if (right < n && arr[right] > arr[largest]) {
    yield {
      line: 21,
      array: getTable(
        [arr],
        [
          { row: 0, col: largest, color: "purple" },
          { row: 0, col: right, color: "purple" },
        ]
      ),
      heap: getArrayColor(arr, {
        [largest]: "purple",
        [right]: "purple",
      }),
    };
    largest = right;
    yield {
      line: 22,
      array: getTable(
        [arr],
        [
          { row: 0, col: largest, color: "purple" },
          { row: 0, col: right, color: "purple" },
        ]
      ),
      heap: getArrayColor(arr, {
        [largest]: "purple",
        [right]: "purple",
      }),
    };
  }
  if (largest != i) {
    const swap = arr[i];
    arr[i] = arr[largest];
    arr[largest] = swap;
    yield {
      line: 27,
      array: getTable(
        [arr],
        [
          { row: 0, col: largest, color: "purple" },
          { row: 0, col: i, color: "purple" },
          { row: 0, col: right, color: "purple" },
        ]
      ),
      heap: getArrayColor(arr, { [largest]: "purple", [i]: "purple" }),
    };
    yield {
      line: 28,
      array: getTable([arr], [{ row: 0, col: largest, color: "teal" }]),
      heap: getArrayColor(arr, { [largest]: "teal" }),
    };
    yield* heapify(arr, largest, n);
  }
}

export function* sort(arr) {
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    yield {
      line: 3,
      array: getTable([arr], [{ row: 0, col: i, color: "teal" }]),
      heap: getArrayColor(arr, { [i]: "teal" }),
    };
    yield {
      line: 4,
      array: getTable([arr], [{ row: 0, col: i, color: "teal" }]),
      heap: getArrayColor(arr, { [i]: "teal" }),
    };
    yield* heapify(arr, i, arr.length);
  }

  for (let i = arr.length - 1; i > 0; i--) {
    yield {
      line: 7,
      array: getTable(
        [arr],
        [
          { row: 0, col: i, color: "pink" },
          { row: 0, col: 0, color: "pink" },
        ]
      ),

      heap: getArrayColor(arr, { [i]: "pink", 0: "pink" }),
    };
    const swap = arr[i];
    arr[i] = arr[0];
    arr[0] = swap;
    yield {
      line: 9,
      array: getTable(
        [arr],
        [
          { row: 0, col: i, color: "pink" },
          { row: 0, col: 0, color: "pink" },
        ]
      ),
      heap: getArrayColor(arr, { [i]: "pink", 0: "pink" }),
    };
    yield* heapify(arr, 0, i);
  }
}

export const example = {
  Python: `def heapify(arr, n, i):
  # Heapifies the subtree rooted at index i.
  largest = i  # Initialize largest as root
  left = 2 * i + 1  # left child
  right = 2 * i + 2  # right child

  # If left child exists and is greater than root
  if left < n and arr[left] > arr[largest]:
      largest = left

  # If right child exists and is greater than largest so far
  if right < n and arr[right] > arr[largest]:
      largest = right

  # If largest is not root, swap root with largest and heapify the affected subtree
  if largest != i:
      arr[i], arr[largest] = arr[largest], arr[i]
      heapify(arr, n, largest)

def heap_sort(arr):
  # Sorts the array using Heap Sort algorithm.
  n = len(arr)

  # Build max heap
  for i in range(n // 2 - 1, -1, -1):
      heapify(arr, n, i)

  # Extract elements from heap one by one
  for i in range(n - 1, 0, -1):
      arr[i], arr[0] = arr[0], arr[i]  # Swap root with last element
      heapify(arr, i, 0)  # Heapify the reduced heap

if __name__ == "__main__":
  # Example usage:
  arr = [12, 11, 13, 5, 6, 7]
  print("Original array:", arr)
  heap_sort(arr)
  print("Sorted array:", arr)
`,
  JavaScript: `const heapify = (arr, n, i) => {
  /**
   * Heapifies the subtree rooted at index i.
   */
  let largest = i; // Initialize largest as root
  const left = 2 * i + 1; // left child
  const right = 2 * i + 2; // right child

  // If left child exists and is greater than root
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  // If right child exists and is greater than largest so far
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  // If largest is not root, swap root with largest and heapify the affected subtree
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
};

const heapSort = (arr) => {
  /**
   * Sorts the array using Heap Sort algorithm.
   */
  const n = arr.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    [arr[0], arr[i]] = [arr[i], arr[0]];

    // call max heapify on the reduced heap
    heapify(arr, i, 0);
  }
};

// Example usage:
const arr = [12, 11, 13, 5, 6, 7];
console.log("Original array:", arr);
heapSort(arr);
console.log("Sorted array:", arr);
`,
  "C++": `#include <iostream>
#include <vector>

void heapify(std::vector<int>& arr, int n, int i) {
    /**
     * Heapifies the subtree rooted at index i.
     */
    int largest = i; // Initialize largest as root
    int left = 2 * i + 1; // left child
    int right = 2 * i + 2; // right child

    // If left child exists and is greater than root
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    // If right child exists and is greater than largest so far
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    // If largest is not root, swap root with largest and heapify the affected subtree
    if (largest != i) {
        std::swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(std::vector<int>& arr) {
    /**
     * Sorts the array using Heap Sort algorithm.
     */
    int n = arr.size();

    // Build max heap
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    // Extract elements from heap one by one
    for (int i = n - 1; i > 0; i--) {
        // Move current root to end
        std::swap(arr[0], arr[i]);

        // call max heapify on the reduced heap
        heapify(arr, i, 0);
    }
}

int main() {
    // Example usage:
    std::vector<int> arr = {12, 11, 13, 5, 6, 7};
    std::cout << "Original array:";
    for (int num : arr) {
        std::cout << " " << num;
    }
    std::cout << std::endl;

    heapSort(arr);

    std::cout << "Sorted array:";
    for (int num : arr) {
        std::cout << " " << num;
    }
    std::cout << std::endl;

    return 0;
}
`,
};
