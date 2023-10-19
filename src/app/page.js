import CodeView from "@/components/CodeView";

const code = {
  "C++":
    "void selectionSort(int arr[], int n) {\n    for (int i = 0; i < n - 1; i++) {\n        // Find the minimum element in the unsorted part of the array\n        int minIndex = i;\n        for (int j = i + 1; j < n; j++) {\n            if (arr[j] < arr[minIndex]) {\n                minIndex = j;\n            }\n        }\n        // Swap the found minimum element with the first element\n        int temp = arr[i];\n        arr[i] = arr[minIndex];\n        arr[minIndex] = temp;\n    }\n}",
  Java: "public static void selectionSort(int[] arr) {\n        int n = arr.length;\n\n        for (int i = 0; i < n - 1; i++) {\n            int minIndex = i;\n\n            // Find the index of the minimum element in the unsorted part of the array\n            for (int j = i + 1; j < n; j++) {\n                if (arr[j] < arr[minIndex]) {\n                    minIndex = j;\n                }\n            }\n\n            // Swap the minimum element with the first element of the unsorted part\n            int temp = arr[i];\n            arr[i] = arr[minIndex];\n            arr[minIndex] = temp;\n        }\n    }",
  Python:
    "def selection_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        min_index = i\n        # Find the index of the minimum element in the unsorted part of the array\n        for j in range(i + 1, n):\n            if arr[j] < arr[min_index]:\n                min_index = j\n        # Swap the minimum element with the first element of the unsorted part\n        arr[i], arr[min_index] = arr[min_index], arr[i]",
};
const Home = () => {
  return (
    <>
      <CodeView codes={code} />
    </>
  );
};

export default Home;
