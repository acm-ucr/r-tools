export const getArray = (arr, selection) => {
  return arr.map((num, index) => ({
    number: num,
    highlight: selection.includes(index),
  }));
};
