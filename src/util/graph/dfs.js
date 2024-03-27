const generateTable = (vertices, start, previous) => {
  const table = [];
  table.push([vertices[start].value, "none"]);
  Object.entries(vertices).forEach(([id, vertex]) => {
    if (id !== start) {
      table.push([vertex.value, previous[id] || "none"]);
    }
  });
  return table;
};

const generateGraph = (vertices, edges, highLightedVertices) => {
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
        color: e.color,
      };
    });
  });
  return { vertices: newVertices, edges: newEdges };
};

export default function* algorithm(data, start) {
  const vertices = data.vertices;
  const edges = data.edges;
  const visited = {};
  const previous = {};
  const stack = [];

  Object.entries(vertices).forEach(([id, vertex]) => {
    previous[id] = null;
  });

  stack.push(start);

  while (stack.length) {
    const current = stack.pop();
    yield {
      table: generateTable(vertices, start, previous),
      graph: generateGraph(vertices, edges, { [current]: "teal" }),
    };

    if (!visited[current]) {
      visited[current] = true;
      vertices[current].color = "teal";
      yield {
        table: generateTable(vertices, start, previous),
        graph: { vertices: vertices, edges: edges },
      };
      if (edges[current]) {
        for (let i = 0; i < edges[current].length; i++) {
          const edge = edges[current][i];
          if (visited[edge.to]) {
            continue;
          }
          stack.push(edge.to);
          previous[edge.to] = vertices[current].value;
        }
      }

      vertices[current].color = "yellow";
      yield {
        table: generateTable(vertices, start, previous),
        graph: { vertices: vertices, edges: edges },
      };
    }
  }
  yield {
    table: generateTable(vertices, start, previous),
    graph: { vertices: vertices, edges: edges },
  };
}
