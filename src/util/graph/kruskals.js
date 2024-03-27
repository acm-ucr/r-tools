const generateTable = (vertices, start, distance, previous) => {
  const table = [];
  table.push([vertices[start].value, distance[start], "none"]);
  Object.entries(vertices).forEach(([id, vertex]) => {
    if (id !== start) {
      table.push([vertex.value, distance[id] || 0, previous[id] || "none"]);
    }
  });

  return table;
};

export default function* algorithm(data, start) {
  const vertices = data.vertices;
  const edges = data.edges;
  const distance = {};
  const previous = {};

  Object.entries(vertices).forEach(([id, vertex]) => {
    if (id === start) {
      distance[id] = 0;
    } else {
      distance[id] = Infinity;
    }
    previous[id] = null;
  });
  yield {
    table: generateTable(vertices, start, distance, previous),
    graph: { vertices: vertices, edges: edges },
  };

  return { distance };
}
