const generateTable = (vertices, distances, predecessors) => {
  const table = [
    [
      "",
      ...Object.values(vertices).map((vertex) => vertex.value),
      ...Object.values(vertices).map((vertex) => `${vertex.value} Pre`),
    ],
  ];
  Object.entries(vertices).forEach(([startId, startVertex]) => {
    const row = [startVertex.value];
    Object.entries(vertices).forEach(([endId, endVertex]) => {
      const distance = distances[startId][endId];
      row.push(distance === Infinity ? "∞" : distance);
    });
    Object.entries(vertices).forEach(([endId]) => {
      const predecessor = predecessors[startId][endId];
      row.push(predecessor !== null ? vertices[predecessor].value : "/");
    });
    table.push(row);
  });
  return table;
};

export default function* algorithm(data) {
  /* highlight color:
      yellow: cloud
      purple: edges in the minheap
      pink: the edge with the
      teal: the current vertex
     */
  const vertices = data.vertices;
  const edges = data.edges;
  const distances = {};
  const predecessors = {};

  // initialize distances and predecessors matrices
  Object.entries(vertices).forEach(([startId]) => {
    distances[startId] = {};
    predecessors[startId] = {};
    Object.entries(vertices).forEach(([endId]) => {
      if (startId === endId) {
        distances[startId][endId] = 0;
        predecessors[startId][endId] = null;
      } else {
        distances[startId][endId] = Infinity;
        predecessors[startId][endId] = null;
      }
    });
  });

  yield {
    table: generateTable(vertices, distances, predecessors),
    graph: { vertices: vertices, edges: edges },
  };

  return { distances, predecessors };
}
