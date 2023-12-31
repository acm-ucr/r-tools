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
  Python:
    "def heapify(arr, N, i):\n    largest = i  # Initialize largest as root\n    l = 2 * i + 1     # left = 2*i + 1\n    r = 2 * i + 2     # right = 2*i + 2\n \n    # See if left child of root exists and is\n    # greater than root\n    if l < N and arr[largest] < arr[l]:\n        largest = l\n \n    # See if right child of root exists and is\n    # greater than root\n    if r < N and arr[largest] < arr[r]:\n        largest = r\n \n    # Change root, if needed\n    if largest != i:\n        arr[i], arr[largest] = arr[largest], arr[i]  # swap\n \n        # Heapify the root.\n        heapify(arr, N, largest)\n \ndef heapSort(arr):\n    N = len(arr)\n \n    # Build a maxheap.\n    for i in range(N//2 - 1, -1, -1):\n        heapify(arr, N, i)\n \n    # One by one extract elements\n    for i in range(N-1, 0, -1):\n        arr[i], arr[0] = arr[0], arr[i]  # swap\n        heapify(arr, i, 0)",
  JavaScript:
    "function sort( arr)\n{\n    var N = arr.length;\n\n    // Build heap (rearrange array)\n    for (var i = Math.floor(N / 2) - 1; i >= 0; i--)\n        heapify(arr, N, i);\n\n    // One by one extract an element from heap\n    for (var i = N - 1; i > 0; i--) {\n        // Move current root to end\n        var temp = arr[0];\n        arr[0] = arr[i];\n        arr[i] = temp;\n\n        // call max heapify on the reduced heap\n        heapify(arr, i, 0);\n    }\n}\n\n// To heapify a subtree rooted with node i which is\n// an index in arr[]. n is size of heap\nfunction heapify(arr, N, i)\n{\n    var largest = i; // Initialize largest as root\n    var l = 2 * i + 1; // left = 2*i + 1\n    var r = 2 * i + 2; // right = 2*i + 2\n\n    // If left child is larger than root\n    if (l < N && arr[l] > arr[largest])\n        largest = l;\n\n    // If right child is larger than largest so far\n    if (r < N && arr[r] > arr[largest])\n        largest = r;\n\n    // If largest is not root\n    if (largest != i) {\n        var swap = arr[i];\n        arr[i] = arr[largest];\n        arr[largest] = swap;\n\n        // Recursively heapify the affected sub-tree\n        heapify(arr, N, largest);\n    }\n}",
  "C++":
    "using namespace std;\n \n// To heapify a subtree rooted with node i\n// which is an index in arr[].\n// n is size of heap\nvoid heapify(int arr[], int N, int i)\n{\n \n    // Initialize largest as root\n    int largest = i;\n \n    // left = 2*i + 1\n    int l = 2 * i + 1;\n \n    // right = 2*i + 2\n    int r = 2 * i + 2;\n \n    // If left child is larger than root\n    if (l < N && arr[l] > arr[largest])\n        largest = l;\n \n    // If right child is larger than largest\n    // so far\n    if (r < N && arr[r] > arr[largest])\n        largest = r;\n \n    // If largest is not root\n    if (largest != i) {\n        swap(arr[i], arr[largest]);\n \n        // Recursively heapify the affected\n        // sub-tree\n        heapify(arr, N, largest);\n    }\n}\n \n// Main function to do heap sort\nvoid heapSort(int arr[], int N)\n{\n \n    // Build heap (rearrange array)\n    for (int i = N / 2 - 1; i >= 0; i--)\n        heapify(arr, N, i);\n \n    // One by one extract an element\n    // from heap\n    for (int i = N - 1; i > 0; i--) {\n \n        // Move current root to end\n        swap(arr[0], arr[i]);\n \n        // call max heapify on the reduced heap\n        heapify(arr, i, 0);\n    }\n}}",
};
