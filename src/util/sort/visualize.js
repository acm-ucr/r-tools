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

export const generateGraph = (
  vertices,
  edges,
  highLightedVertices,
  highLightedEdges
) => {
  const newVertices = {};
  const newEdges = {};
  Object.entries(vertices).forEach(([id, vertex]) => {
    newVertices[id] = {
      ...vertex,
      color: highLightedVertices[id] || vertex.color,
    };
  });
  Object.entries(edges).forEach(([from, edge]) => {
    newEdges[from] = edge.map((e) => {
      return {
        ...e,
        color:
          highLightedEdges.find(
            (highLightEdge) =>
              highLightEdge.from === from && highLightEdge.to === e.to
          )?.color || e.color,
      };
    });
  });
  return { vertices: newVertices, edges: newEdges };
};
