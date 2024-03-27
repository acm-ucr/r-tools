import { max, min } from "d3";
import { getTable } from "./visualize";

export const code = [
  "function bucketSort(arr, bucketSize):", // 0
  "# Determine the minimum and maximum values in the array", // 1
  "minValue = min(arr)", // 2
  "maxValue = max(arr)", // 3
  "", // 4
  "# Create buckets", // 5
  "bucketCount = floor((maxValue - minValue) / bucketSize) + 1", // 6
  "for j from 0 to bucketCount - 1:", // 7
  "\xa0\xa0\xa0\xa0buckets.push([])", // 8
  "",
  "# Distribute elements into buckets",
  "for k from 0 to arr.length - 1:",
  "\xa0\xa0\xa0\xa0bucketIndex = floor((arr[k] - minValue) / bucketSize)",
  "\xa0\xa0\xa0\xa0buckets[bucketIndex].push(arr[k])",
  "",
  "# Sort each bucket and concatenate them",
  "arr = []",
  "for m from 0 to bucketCount - 1:",
  "\xa0\xa0\xa0\xa0sort(buckets[m])",
  "\xa0\xa0\xa0\xa0arr = arr.concat(buckets[m])",
  "",
  "return arr",
];

export function* sort(arr) {
  const table = [];
  // create buckets
  const bucketSize = 5;
  yield {
    line: 0,
    tables: [getTable([arr], [])],
  };
  const minValue = min(arr);
  yield {
    line: 2,
    tables: [
      getTable([arr], [{ row: 0, col: arr.indexOf(minValue), color: "teal" }]),
    ],
  };
  const maxValue = max(arr);
  yield {
    line: 3,
    tables: [
      getTable(
        [arr],
        [
          { row: 0, col: arr.indexOf(minValue), color: "teal" },
          { row: 0, col: arr.indexOf(maxValue), color: "yellow" },
        ]
      ),
    ],
  };
  const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
  const buckets = [];
  for (let j = 0; j < bucketCount; j++) {
    yield {
      line: 7,
      tables: [getTable([arr], []), getTable(table, [])],
    };
    table.push([
      `${j * bucketSize + minValue}-${(j + 1) * bucketSize + minValue}`,
    ]);
    yield {
      line: 8,
      tables: [getTable([arr], []), getTable(table, [])],
    };
    buckets.push([]);
  }

  // Distribute elements into buckets
  for (let k = 0; k < arr.length; k++) {
    yield {
      line: 11,
      tables: [
        getTable([arr], [{ row: 0, col: k, color: "purple" }]),
        getTable(table, []),
      ],
    };
    const bucketIndex = Math.floor((arr[k] - minValue) / bucketSize);
    yield {
      line: 12,
      tables: [
        getTable([arr], [{ row: 0, col: k, color: "purple" }]),
        getTable(table, [{ row: bucketIndex, col: 0, color: "purple" }]),
      ],
    };
    buckets[bucketIndex].push(arr[k]);
    table[bucketIndex].push(arr[k]);
    yield {
      line: 13,
      tables: [
        getTable([arr], [{ row: 0, col: k, color: "purple" }]),
        getTable(table, [{ row: bucketIndex, col: null, color: "purple" }]),
      ],
    };
  }

  // Sort each bucket and concatenate them
  arr = [];
  yield {
    line: 16,
    tables: [getTable([arr]), getTable(table)],
  };
  for (let m = 0; m < buckets.length; m++) {
    yield {
      line: 17,
      tables: [
        getTable([arr]),
        getTable(table, [{ row: m, col: 0, color: "pink" }]),
      ],
    };
    buckets[m].sort((a, b) => a - b);
    table[m] = [table[m][0], ...buckets[m]];
    yield {
      line: 18,
      tables: [
        getTable([arr]),
        getTable(table, [{ row: m, col: null, color: "pink" }]),
      ],
    };
    const currentLengh = arr.length;
    arr = [...arr, ...buckets[m]];
    console.log(
      Array.from({ length: arr.length - currentLengh }).map((_, i) => ({
        row: 0,
        col: currentLengh + i,
        color: "pink",
      }))
    );
    yield {
      line: 19,
      tables: [
        getTable(
          [arr],
          Array.from({ length: arr.length - currentLengh }).map((_, i) => ({
            row: 0,
            col: currentLengh + i,
            color: "pink",
          }))
        ),
        getTable(table, [{ row: m, col: null, color: "pink" }]),
      ],
    };
  }

  return arr;
}

export const example = {
  Python: `def insertion_sort(arr):
# Sorts the array using the Insertion Sort algorithm.
for i in range(1, len(arr)):
    key = arr[i]
    j = i - 1
    while j >= 0 and arr[j] > key:
        arr[j + 1] = arr[j]
        j -= 1
    arr[j + 1] = key

def bucket_sort(arr):
# Sorts the array using the Bucket Sort algorithm.
# Find maximum and minimum values in the array
max_val = max(arr)
min_val = min(arr)
# Calculate bucket size
bucket_size = max(1, (max_val - min_val) // len(arr))
# Create buckets
bucket_count = (max_val - min_val) // bucket_size + 1
buckets = [[] for _ in range(bucket_count)]
# Assign elements to buckets
for num in arr:
    index = (num - min_val) // bucket_size
    buckets[index].append(num)
# Sort each bucket using Insertion Sort
for bucket in buckets:
    insertion_sort(bucket)
# Concatenate buckets
k = 0
for i in range(bucket_count):
    for num in buckets[i]:
        arr[k] = num
        k += 1
if __name__ == "__main__":
# Example usage:
arr = [29, 17, 5, 18, 22, 11, 27, 3, 9]
print("Original array:", arr)
bucket_sort(arr)
print("Sorted array:", arr)
`,
  JavaScript: `const insertionSort = (arr) => {
  /**
   * Sorts the array using the Insertion Sort algorithm.
   */
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
};

const bucketSort = (arr) => {
  /**
   * Sorts the array using the Bucket Sort algorithm.
   */
  const maxVal = Math.max(...arr);
  const minVal = Math.min(...arr);
  const bucketSize = Math.max(1, Math.floor((maxVal - minVal) / arr.length));
  const bucketCount = Math.floor((maxVal - minVal) / bucketSize) + 1;
  const buckets = Array.from({ length: bucketCount }, () => []);

  // Assign elements to buckets
  for (const num of arr) {
    const index = Math.floor((num - minVal) / bucketSize);
    buckets[index].push(num);
  }

  // Sort each bucket using Insertion Sort
  for (const bucket of buckets) {
    insertionSort(bucket);
  }

  // Concatenate buckets
  let k = 0;
  for (const bucket of buckets) {
    for (const num of bucket) {
      arr[k] = num;
      k++;
    }
  }
};

// Example usage:
const arr = [29, 17, 5, 18, 22, 11, 27, 3, 9];
console.log("Original array:", arr);
bucketSort(arr);
console.log("Sorted array:", arr);
`,
  "C++": `#include <iostream>
#include <vector>
#include <algorithm>

// Function to sort individual buckets using Insertion Sort
void insertionSort(std::vector<int> &bucket)
{
    for (size_t i = 1; i < bucket.size(); i++)
    {
        int key = bucket[i];
        int j = i - 1;
        while (j >= 0 && bucket[j] > key)
        {
            bucket[j + 1] = bucket[j];
            j--;
        }
        bucket[j + 1] = key;
    }
}

// Function to perform Bucket Sort
void bucketSort(std::vector<int> &arr)
{
    const int n = arr.size();
    if (n <= 1)
        return; // If array is empty or has only one element, it's already sorted

    // Find maximum and minimum values in the array
    int maxVal = *std::max_element(arr.begin(), arr.end());
    int minVal = *std::min_element(arr.begin(), arr.end());

    // Calculate bucket size
    int bucketSize = std::max(1, (maxVal - minVal) / n);

    // Calculate number of buckets
    int bucketCount = (maxVal - minVal) / bucketSize + 1;

    // Create buckets
    std::vector<std::vector<int>> buckets(bucketCount);

    // Assign elements to buckets
    for (int num : arr)
    {
        int index = (num - minVal) / bucketSize;
        buckets[index].push_back(num);
    }

    // Sort individual buckets
    for (auto &bucket : buckets)
    {
        insertionSort(bucket);
    }

    // Concatenate buckets back into the original array
    int k = 0;
    for (const auto &bucket : buckets)
    {
        for (int num : bucket)
        {
            arr[k++] = num;
        }
    }
}

int main()
{
    // Example usage:
    std::vector<int> arr = {29, 17, 5, 18, 22, 11, 27, 3, 9};
    std::cout << "Original array:";
    for (int num : arr)
    {
        std::cout << " " << num;
    }
    std::cout << std::endl;

    bucketSort(arr);

    std::cout << "Sorted array:";
    for (int num : arr)
    {
        std::cout << " " << num;
    }
    std::cout << std::endl;

    return 0;
}
`,
};
