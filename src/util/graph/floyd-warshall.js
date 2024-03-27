import { generateGraph } from "../sort/visualize";
import { getTable } from "../sort/visualize";

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
      purple: vertices being processed in the current iteration
      pink: the edge being relaxed
      teal: the current vertex being processed
     */
  const vertices = data.vertices;
  const edges = data.edges;
  const numVertices = Object.keys(vertices).length;
  const distances = {};
  const predecessors = {};
  const verticesMap = {};

  Object.keys(vertices).forEach((id, index) => {
    verticesMap[index] = id;
  });

  // Initialize distances and predecessors matrices
  Object.keys(vertices).forEach((startId) => {
    distances[startId] = {};
    predecessors[startId] = {};
    Object.keys(vertices).forEach((endId) => {
      if (startId === endId) {
        distances[startId][endId] = 0;
      } else {
        distances[startId][endId] = Infinity;
      }
      predecessors[startId][endId] = null;
    });
  });

  // Update distances and predecessors based on edges
  Object.entries(edges).forEach(([from, edge]) => {
    edge.forEach((e) => {
      distances[from][e.to] = e.weight;
      predecessors[from][e.to] = from;
    });
  });
  yield {
    table: generateTable(vertices, distances, predecessors),
    graph: generateGraph(vertices, edges, {}, []),
  };
  // Main Floyd-Warshall algorithm
  for (let vertex = 0; vertex < numVertices; vertex++) {
    for (let from = 0; from < numVertices; from++) {
      for (let to = 0; to < numVertices; to++) {
        const newWeight =
          distances[verticesMap[from]][verticesMap[vertex]] +
          distances[verticesMap[vertex]][verticesMap[to]];
        if (newWeight < distances[verticesMap[from]][verticesMap[to]]) {
          distances[verticesMap[from]][verticesMap[to]] = newWeight;
          predecessors[verticesMap[from]][verticesMap[to]] =
            verticesMap[vertex];
        }
        yield {
          table: getTable(generateTable(vertices, distances, predecessors), [
            { row: from + 1, col: to + 1, color: "pink" },
            { row: from + 1, col: to + 1 + numVertices, color: "pink" },
          ]),
          graph: generateGraph(
            vertices,
            edges,
            {
              [verticesMap[from]]: "teal",
              [verticesMap[to]]: "purple",
            },
            []
          ),
        };
      }
    }
  }
  yield {
    table: generateTable(vertices, distances, predecessors),
    graph: generateGraph(vertices, edges, {}, []),
  };
}
