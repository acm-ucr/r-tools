import { getArray as getArray } from "./getArray";

export const code = [
  "heapify(arr, N, i):",
  "\xa0\xa0\xa0\xa0largest = i",
  "\xa0\xa0\xa0\xa0left = 2 * i + 1",
  "\xa0\xa0\xa0\xa0right = 2 * i + 2",
  "\xa0\xa0\xa0\xa0if left < N and arr[left] > arr[largest]:",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0largest = left",
  "\xa0\xa0\xa0\xa0if right < N and arr[right] > arr[largest:",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0largest = right",
  "\xa0\xa0\xa0\xa0if (largest != i):",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0arr[i], arr[largest] = arr[largest], arr[i]",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0heapify(arr, N, largest)",
  "",
  "heapSort(arr):",
  "\xa0\xa0\xa0\xa0N = arr.length",
  "\xa0\xa0\xa0\xa0for (i = floor(N / 2) - 1; i >= 0; i--):",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0heapify(arr, N, i)",
  "",
  "\xa0\xa0\xa0\xa0for (i = N - 1; i > 0; i--):",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0arr[0], arr[i] = arr[i], arr[0]",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0heapify(arr, i, 0)",
];

function* heapify(arr, N, i) {
  const lineOffset = 0;
  yield { line: lineOffset, array: getArray(arr, []) };
  let largest = i;
  yield { line: lineOffset + 1, array: getArray(arr, [largest]) };
  const l = 2 * i + 1;
  yield { line: lineOffset + 2, array: getArray(arr, [l, largest]) };
  const r = 2 * i + 2;
  yield { line: lineOffset + 3, array: getArray(arr, [l, r, largest]) };
  yield { line: lineOffset + 4, array: getArray(arr, [l, largest]) };
  if (l < N && arr[l] > arr[largest]) {
    largest = l;
    yield { line: lineOffset + 5, array: getArray(arr, [largest]) };
  }
  yield { line: lineOffset + 6, array: getArray(arr, [r, largest]) };
  if (r < N && arr[r] > arr[largest]) {
    largest = r;
    yield { line: lineOffset + 7, array: getArray(arr, [largest]) };
  }
  yield { line: lineOffset + 8, array: getArray(arr, [largest, i]) };
  if (largest != i) {
    yield { line: lineOffset + 9, array: getArray(arr, [largest, i]) };
    const swap = arr[i];
    arr[i] = arr[largest];
    arr[largest] = swap;
    yield { line: lineOffset + 9, array: getArray(arr, [largest, i]) };
    yield {
      line: lineOffset + 10,
      array: getArray(arr, [largest, ...getChildrenIndices(arr, N, largest)]),
    };
    yield* heapify(arr, N, largest);
    yield {
      line: lineOffset + 10,
      array: getArray(arr, [largest, ...getChildrenIndices(arr, N, largest)]),
    };
  }
}

const getChildrenIndices = (arr, n, i) => {
  let result = [];

  const leftChildIndex = 2 * i + 1;
  if (leftChildIndex < n) {
    result.push(leftChildIndex);
    const leftChildrenIndices = getChildrenIndices(arr, n, leftChildIndex);
    result = [...result, ...leftChildrenIndices];
  }
  const rightChildIndex = 2 * i + 2;
  if (rightChildIndex < n) {
    result.push(rightChildIndex);
    const rightChildrenIndices = getChildrenIndices(arr, n, rightChildIndex);
    result = [...result, ...rightChildrenIndices];
  }
  return result;
};

export function* sort(arr) {
  const lineOffset = 12;
  yield { line: lineOffset, array: getArray(arr, []) };
  const N = arr.length;
  yield { line: lineOffset + 1, array: getArray(arr, []) };
  yield { line: lineOffset + 2, array: getArray(arr, []) };
  for (let i = Math.floor(N / 2) - 1; i >= 0; i--) {
    yield { line: lineOffset + 2, array: getArray(arr, [i]) };
    yield {
      line: lineOffset + 3,
      array: getArray(arr, [i, ...getChildrenIndices(arr, N, i)]),
    };
    yield* heapify(arr, N, i);
    yield {
      line: lineOffset + 3,
      array: getArray(arr, [i, ...getChildrenIndices(arr, N, i)]),
    };
  }
  yield { line: lineOffset + 4, array: getArray(arr, []) };

  yield { line: lineOffset + 5, array: getArray(arr, [N - 1]) };
  for (let i = N - 1; i > 0; i--) {
    yield { line: lineOffset + 6, array: getArray(arr, [i, 0]) };
    const temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    yield { line: lineOffset + 6, array: getArray(arr, [0, i]) };
    yield {
      line: lineOffset + 7,
      array: getArray(arr, [0, ...getChildrenIndices(arr, i, 0)]),
    };
    yield* heapify(arr, i, 0);
    yield {
      line: lineOffset + 7,
      array: getArray(arr, [0, ...getChildrenIndices(arr, i, 0)]),
    };
    yield { line: lineOffset + 5, array: getArray(arr, [N - 1]) };
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
