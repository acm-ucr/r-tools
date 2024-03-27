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

const generateGraph = (
  vertices,
  edges,
  highLightedVertices,
  highLightedEdges
) => {
  const newVertices = {};
  const newEdges = {};

  // Update vertices colors
  Object.entries(vertices).forEach(([id, vertex]) => {
    newVertices[id] = {
      ...vertex,
      color: highLightedVertices[id] || vertex.color,
    };
  });

  // Update edges colors
  Object.entries(edges).forEach(([from, edge]) => {
    newEdges[from] = edge.map((e) => {
      const highlightedEdge = Array.isArray(highLightedEdges)
        ? highLightedEdges.find(
            (highLightEdge) =>
              highLightEdge.from === from && highLightEdge.to === e.to
          )
        : undefined;

      return {
        ...e,
        color: highlightedEdge ? highlightedEdge.color : e.color,
      };
    });
  });

  return { vertices: newVertices, edges: newEdges };
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
  for (let k = 0; k < numVertices; k++) {
    for (let i = 0; i < numVertices; i++) {
      for (let j = 0; j < numVertices; j++) {
        // Highlight the current vertex being processed
        yield {
          table: generateTable(vertices, distances, predecessors),
          graph: generateGraph(vertices, edges, { [i]: "purple" }, []),
        };

        // Check if vertices i, k, and j exist
        if (
          distances[i] &&
          distances[i][k] !== undefined &&
          distances[k] &&
          distances[k][j] !== undefined
        ) {
          if (distances[i][j] > distances[i][k] + distances[k][j]) {
            distances[i][j] = distances[i][k] + distances[k][j];
            predecessors[i][j] = predecessors[k][j];

            // Highlight the edge being relaxed
            yield {
              table: generateTable(vertices, distances, predecessors),
              graph: generateGraph(vertices, edges, {}, [
                { from: i, to: j, color: "pink" },
              ]),
            };
          }
        }
      }
    }
  }

  yield {
    table: generateTable(vertices, distances, predecessors),
    graph: generateGraph(vertices, edges, {}, []),
  };
}
