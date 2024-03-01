const generateTable = (vertices, visited, predecessors) => {
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
      const visit = visited[startId][endId];
      row.push(visit);
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
  const vertices = data.vertices;
  const edges = data.edges;
  const visited = {};
  const predecessors = {};

  // initialize visited and predecessors matrices
  Object.entries(vertices).forEach(([startId]) => {
    visited[startId] = {};
    predecessors[startId] = {};
    Object.entries(vertices).forEach(([endId]) => {
      if (startId === endId) {
        visited[startId][endId] = false;
        predecessors[startId][endId] = null;
      } else {
        visited[startId][endId] = true;
        predecessors[startId][endId] = null;
      }
    });
  });

  yield {
    table: generateTable(vertices, visited, predecessors),
    graph: { vertices: vertices, edges: edges },
  };

  return { visited, predecessors };
}
