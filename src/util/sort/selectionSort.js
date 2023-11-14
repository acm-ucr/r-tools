import { getArray } from "./getArray";

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
    yield { line: 0, array: getArray(arr, [i]) };
    let minIndex = i;
    yield { line: 1, array: getArray(arr, [i, minIndex]) };
    for (let j = i + 1; j < arr.length; j++) {
      yield { line: 2, array: getArray(arr, [i, minIndex, j]) };
      if (arr[j] < arr[minIndex]) {
        yield { line: 3, array: getArray(arr, [i, minIndex, j]) };
        minIndex = j;
        yield { line: 4, array: getArray(arr, [i, minIndex, j]) };
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    yield { line: 5, array: getArray(arr, [i, minIndex]) };
  }
}
