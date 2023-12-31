export const getArray = (arr, selection) =>
  arr.map((num, index) => ({
    number: num,
    highlight: selection[index],
  }));
export const getArrayColor = (arr, selection) =>
  arr.map((num, index) => ({
    number: num,
    color: selection[index],
  }));

export const getTable = (table, selection) =>
  table.map((row, index) =>
    row.map((num, col) => ({
      data: num,
      color: selection?.find(
        ({ row: r, col: c }) =>
          (r === index || r === null) && (c === col || c === null)
      )?.color,
    }))
  );
