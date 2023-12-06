import { merge } from "d3";
import { getArray } from "./getArray";
export const code = [
  "merge_sort(arr)",
  "\xa0\xa0\xa0\xa0if length of arr <=1",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0return arr",
  "\xa0\xa0\xa0\xa0middle = floor(length of arr/2)",
  "\xa0\xa0\xa0\xa0left_half = arr[0 to middle - 1]",
  "\xa0\xa0\xa0\xa0right_half = arr[middle to end]",
  "\xa0\xa0\xa0\xa0sorted_left = merge_sort(left_half)",
  "\xa0\xa0\xa0\xa0sorted_right = merge_sort(right_half)",
  "\xa0\xa0\xa0\xa0result = merge(sortedLeft, sortedRight)",
  "merge(sorted_left, sorted_right)",
  "\xa0\xa0\xa0\xa0result = []",
  "\xa0\xa0\xa0\xa0leftIndex=0",
  "\xa0\xa0\xa0\xa0rightIndex=0",
  "\xa0\xa0\xa0\xa0while leftIndex < length of sorted_left and rightIndex < length of sorted_right",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0if sorted_left[leftIndex] < sorted_right[rightIndex]",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0append left[leftIndex] to result",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0++leftIndex",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0else",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0append right[rightIndex] to result",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0++rightIndex",
  "\xa0\xa0\xa0\xa0append remaining elements of sorted_left to result",
  "\xa0\xa0\xa0\xa0append remaining elements of sorted_right to result",
  "\xa0\xa0\xa0\xa0return result",
];

export function* sort(arr) {
  yield* mergeSort(arr);
  yield { line: 1, array: getArray(arr, []) };
  function* mergeSort(arr) {
    yield { line: 1, array: getArray(arr, []) };
    if (arr.length <= 1) {
      yield { line: 2, array: getArray(arr, []) };
      return arr;
    }
    yield { line: 3, array: getArray(arr, []) };
    const middle = Math.floor(arr.length / 2);
    yield { line: 4, array: getArray(arr, []) };
    const leftHalf = arr.slice(0, middle);
    yield { line: 5, array: getArray(arr, []) };
    const rightHalf = arr.slice(middle);
    yield { line: 6, array: getArray(arr, []) };
    const sortedLeft = yield* mergeSort(leftHalf);
    yield { line: 7, array: getArray(arr, []) };
    const sortedRight = yield* mergeSort(rightHalf);
    yield { line: 8, array: getArray(arr, []) };
    return yield* merge(sortedLeft, sortedRight);
  }

  function* merge(sortedLeft, sortedRight) {
    yield { line: 9, array: getArray(arr, []) };
    let result = [];
    yield { line: 10, array: getArray(arr, []) };
    let leftIndex = 0;
    yield { line: 11, array: getArray(arr, []) };
    let rightIndex = 0;
    yield { line: 12, array: getArray(arr, []) };
    while (leftIndex < sortedLeft.length && rightIndex < sortedRight.length) {
      yield { line: 13, array: getArray(arr, []) };
      if (sortedLeft[leftIndex] < sortedRight[rightIndex]) {
        yield { line: 14, array: getArray(arr, []) };
        result.push(sortedLeft[leftIndex]);
        yield { line: 15, array: getArray(arr, []) };
        leftIndex++;
        yield { line: 16, array: getArray(arr, []) };
      } else {
        yield { line: 17, array: getArray(arr, []) };
        result.push(sortedRight[rightIndex]);
        yield { line: 18, array: getArray(arr, []) };
        rightIndex++;
        yield { line: 19, array: getArray(arr, []) };
      }
    }

    yield { line: 20, array: getArray(arr, []) };
    return result.concat(
      sortedLeft.slice(leftIndex),
      sortedRight.slice(rightIndex)
    );
  }
}

export const example = {
  Python:
    "def merge_sort (arr):\n  if len(arr) <= 1: \n    return arr \n\n  #Split the array into two halves\n  middle = len(arr) // 2 \n  left_half = arr[:middle]\n  right_half = arr[middle:]\n\n  #Recursive call to merge_sort for each half\n  sorted_left = merge_sort(left_half)\n  sorted_right = merge_sort(right_half)\n\n  #Merge the sorted halves\n  return merge(sorted_left, sorted_right)\n\ndef merge(left, right):\n  result = []\n  left_index = 0\n  right_index = 0\n\n  while left_index < len(left) and right_index < len(right):\n    if left[left_index] < right[right_index]:\n      result.append(left[left_index])\n      left_index += 1\n    else:\n      result.append(right[right_index])\n      right_index += 1\n\n  # Append any remaining elements from left and right arrays\n  result.extend(left[left_index:])\n  result.extend(right[right_index:])\n\n  return result\n\n# Example usage:\nunsorted_array = [8,4,1,7,3,5,2,6]\nsorted_array = merge_sort(unsorted_array)\nprint(sorted_array)",
  JavaScript:
    "function merge(arr) {\n  if (arr.length <= 1) {\n    return arr;\n  }\n\n  // Split the array into two halves\n  const middle = Math.floor(arr.length / 2);\n  const leftHalf = arr.slice(0, middle);\n  const rightHalf = arr.slice(middle);\n\n  // Recursive call to mergeSort for each half\n  const sortedLeft = merge(leftHalf);\n  const sortedRight = mergeSort(rightHalf);\n\n  // Merge the sorted halves\n  return merge(sortedLeft, sortedRight);\n}\n\nfunction merge(left, right) {\n  let result = [];\n  let leftIndex = 0;\n  let rightIndex = 0;\n\n  // Compare elments and merge them in sorted order\n  while (leftIndex < left.length && rightIndex < right.index) {\n    if (left[leftIndex] < right[rightIndex]) {\n      result.push(left[leftIndex]);\n      leftIndex++\n    } else {\n      result.push(right[rightIndex]);\n      rightIndex++;\n    }\n  }\n\n //Append any remaining elements from the left and right arrays\n  return result.concat(left.slice(leftIndex), right.slice(rightIndex));\n}\n\n// Example usage:\nconst unsortedArray = [8, 4, 1, 7, 3, 5, 2, 6];\nconst sortedArray = mergeSort(unsortedArray);\nconsole.log(sortedArray);",
  "C++":
    '#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid merge(vector<int>& arr, int left, int middle, int right) {\n  int n1  = middle - left + 1;\n  int n2 = right - middle;\n\n  // Create temporary arrays\n  vector<int> leftArray(n1);\n  vector<int> rightArray(n2);\n\n  // Copy data to temporary arrays leftArray[] and rightArray[]\n  for(int i = 0; i < n1; i++)\n    leftArray.at(i) =  arr.at(left + 1);\n  for (int j = 0; j < n2; j++)\n    rightArray.at(j) = arr.at(middle + 1 + j);\n\n  // Merge the temporary arrays back into arr[left..right]\n  int i = 0; // Initial index of left subarray\n  int j = 0; // Initial index of right subarray\n  int k = left; // Initial index of merged subarray\n\n  while (i < n1 && j < n2) {\n    if (leftArray.at(i) <= rightArray.at(j)) {\n      array.at(k) = leftArray.at(i);\n      i++;\n    } else {\n      arr.at(k) = rightArray.at(j);\n      j++\n    }\n    k++;\n  }\n\n  // Copy the reamining elements of leftArray[], if there are any\n  while (i < n1) {\n    arr.at(k) = leftArray.at(i);\n    i++;\n    k++;\n  }\n\n  // Copy the remaining elements of rightArray[], if there are any\n  while (j < n2) {\n    arr.at(k) = rightArray.at(j);\n    j++;\n    k++;\n  }\n}\n\nvoid mergeSort(vector<int>& arr, int left, int right) {\n  if (left < right) {\n    // Same as (left + right) / 2, but avoids overflow for large left and right\n    int middle = left + (right - left) / 2;\n\n    // Sort first and second halves\n    mergeSort(arr, left, middle);\n    mergeSort(arr, middle + 1, right);\n\n    // Merge the sorted halves\n    merge(arr, left, middle, right);\n  }\n}\n\nint main() {\n  // Example usage:\n  vector<int> unsortedArray = {8, 4, 1, 7, 3, 5, 2, 6};\n\n  // Perform merge sort\n  mergeSort(unsortedArray, 0, unsortedArray.size() - 1);\n\n  // Print the sorted array\n for (const auto& num : unsortedArray) {\n    cout << num << " ";\n  }\n\n  retrun 0;\n}',
};
