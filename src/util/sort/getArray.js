export const getArray = (arr, selection) =>
  arr.map((num, index) => ({
    number: num,
    highlight: selection.includes(index),
  }));
