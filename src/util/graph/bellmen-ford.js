const generateTable = (vertices, start, distance, previous) => {
  const table = [];
  table.push([vertices[start].value, distance[start], "none"]);
  Object.entries(vertices).forEach(([id, vertex]) => {
    if (id !== start) {
      table.push([
        vertex.value,
        distance[id] || "none",
        previous[id] || "none",
      ]);
    }
  });
  return table;
};

export function* algorithm(data, start) {
  /* highlight color:
      yellow: cloud
      purple: edges in the minheap
      pink: the edge with the
      teal: the current vertex
     */
  const vertices = data.vertices;
  const edges = data.edges;
  const distances = {};

  // initialize distances and previous
  Object.entries(vertices).forEach(([id, vertex]) => {
    if (id === start) {
      distances[id] = 0;
    } else {
      distances[id] = Infinity;
    }
    previous[id] = null;
  });

  yield {
    table: generateTable(vertices, start, distances, previous),
    graph: { vertices: vertices, edges: edges },
  };

  return { distances };
}
