import { getArray as getArray } from "./getArray";

export const code = [
  "isSorted(arr):", // 0
  "\xa0\xa0\xa0\xa0for (i = 1; i < arr.length; i++):",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0if (arr[i] < arr[i - 1]):",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0return false",
  "\xa0\xa0\xa0\xa0return true",
  "",
  "shuffle(arr):", // 6
  "\xa0\xa0\xa0\xa0for (i = 0; i < arr.length; i++):",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0randomIndex = random(0, arr.length - 1)",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0arr[i], arr[randomIndex] = arr[randomIndex], arr[i]",
  "\xa0\xa0\xa0\xa0return arr",
  "",
  "bogosort(arr):", // 12
  "\xa0\xa0\xa0\xa0while (!isSorted(arr)):",
  "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0arr = shuffle(arr)",
  "\xa0\xa0\xa0\xa0return arr",
];

function* isSorted(arr) {
  yield { line: 0, array: getArray(arr, []) };
  yield { line: 1, array: getArray(arr, [1]) };
  for (let i = 1; i < arr.length; i++) {
    yield { line: 2, array: getArray(arr, [i, i - 1]) };
    if (arr[i] < arr[i - 1]) {
      yield { line: 3, array: getArray(arr, []) };
      return false;
    }
    yield { line: 1, array: getArray(arr, [i + 1]) };
  }
  yield { line: 4, array: getArray(arr, []) };
  return true;
}

function* shuffle(arr) {
  yield { line: 6, array: getArray(arr, []) };
  yield { line: 7, array: getArray(arr, [0]) };
  for (let i = 0; i < arr.length; i++) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    yield { line: 8, array: getArray(arr, [i, randomIndex]) };
    yield { line: 9, array: getArray(arr, [i, randomIndex]) };
    const swap = arr[randomIndex];
    arr[randomIndex] = arr[i];
    arr[i] = swap;
    yield { line: 9, array: getArray(arr, [i, randomIndex]) };
    yield { line: 7, array: getArray(arr, [i + 1]) };
  }
  yield { line: 10, array: getArray(arr, []) };
  return arr;
}

export function* sort(arr) {
  yield { line: 12, array: getArray(arr, []) };
  yield { line: 13, array: getArray(arr, []) };
  let arrIsSorted = yield* isSorted(arr);
  while (!arrIsSorted) {
    yield { line: 13, array: getArray(arr, []) };
    yield { line: 14, array: getArray(arr, []) };
    arr = yield* shuffle(arr);
    yield { line: 14, array: getArray(arr, []) };
    yield { line: 13, array: getArray(arr, []) };
    arrIsSorted = yield* isSorted(arr);
    yield { line: 13, array: getArray(arr, []) };
  }
  yield { line: 15, array: getArray(arr, []) };
}

export const example = {
  Python: "",
  JavaScript: "",
  "C++": "",
};
