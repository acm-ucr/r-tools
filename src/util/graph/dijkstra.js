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
const generateGraph = (
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
class MinHeap {
  constructor() {
    this.heap = [];
  }
  push(item) {
    this.heap.push(item);
    let current = this.heap.length - 1;
    while (current >= 0) {
      const parent = Math.floor((current - 1) / 2);
      if (parent >= 0 && this.heap[parent].weight > this.heap[current].weight) {
        const temp = this.heap[parent];
        this.heap[parent] = this.heap[current];
        this.heap[current] = temp;
        current = parent;
      } else break;
    }
    console.log(this.heap);
  }
  pop() {
    const itemToReturn = this.heap[0];
    this.heap = this.heap.slice(1);
    this.heapify(0);
    return itemToReturn;
  }

  heapify(i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (
      left < this.heap.length &&
      this.heap[left].weight < this.heap[largest].weight
    )
      largest = left;
    if (
      right < this.heap.length &&
      this.heap[right].weight < this.heap[largest].weight
    )
      largest = right;

    if (largest != i) {
      const temp = this.heap[i];
      this.heap[i] = this.heap[largest];
      this.heap[largest] = temp;
      this.heapify(this.heap, largest);
    }
  }
  getLength() {
    return this.heap.length;
  }
}
export function* algorithm(data, start) {
  const vertices = data.vertices;
  const edges = data.edges;
  const visited = {};
  const distances = {};
  const previous = {};
  let current = start;
  const pq = new MinHeap();

  // initialize distances and previous
  Object.entries(vertices).forEach(([id, vertex]) => {
    if (id === current) {
      distances[id] = 0;
    } else {
      distances[id] = Infinity;
    }
    previous[id] = null;
  });

  pq.push({ from: current, to: current });
  while (pq.getLength()) {
    const minEdge = pq.pop();
    current = minEdge.to;
    edges[minEdge.from] = edges[minEdge.from].map((edge) => {
      if (edge.to === minEdge.to) return { ...edge, color: "yellow" };
      return edge;
    });
    yield {
      table: generateTable(vertices, start, distances, previous),
      graph: generateGraph(vertices, edges, {}, [
        { from: minEdge.from, to: minEdge.to, color: "pink" },
      ]),
    };
    if (!visited[current]) {
      visited[current] = true;
      vertices[current].color = "yellow";
      yield {
        table: generateTable(vertices, start, distances, previous),
        graph: { vertices: vertices, edges: edges },
      };
      for (let i = 0; i < edges[current].length; i++) {
        const edge = edges[current][i];
        if (visited[edge.to]) {
          edges[current][i].color = "yellow";
          yield {
            table: generateTable(vertices, start, distances, previous),
            graph: generateGraph(vertices, edges, { [edge.to]: "teal" }, [
              { from: current, to: edge.to, color: "teal" },
            ]),
          };
          continue;
        }
        pq.push({ from: current, ...edges[current][i] });
        edges[current][i].color = "purple";
        const newDistance = distances[current] + edge.weight;
        yield {
          table: generateTable(vertices, start, distances, previous),
          graph: generateGraph(vertices, edges, { [edge.to]: "teal" }, [
            { from: current, to: edge.to, color: "teal" },
          ]),
        };
        if (distances[edge.to] > newDistance) {
          distances[edge.to] = newDistance;
          previous[edge.to] = vertices[current].value;
        }
      }
      yield {
        table: generateTable(vertices, start, distances, previous),
        graph: { vertices: vertices, edges: edges },
      };
    }
  }
  yield {
    table: generateTable(vertices, start, distances, previous),
    graph: { vertices: vertices, edges: edges },
  };

  return { distances };
}
