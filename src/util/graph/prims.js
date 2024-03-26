import { getTwoWayUndirectedEdge } from "../editor/graphFunctions";

class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(vertex, priority) {
    this.queue.push({ vertex, priority });
    this.sort();
  }

  dequeue() {
    return this.queue.shift();
  }

  sort() {
    this.queue.sort((a, b) => a.priority - b.priority);
  }

  isEmpty() {
    return !this.queue.length;
  }
}

export function* algorithm(data, start) {
  /* vertex now has an associated index */
  const vertexMap = {};
  Object.keys(data.vertices).forEach((id, index) => {
    vertexMap[id] = index;
  });
  const edgeList = getTwoWayUndirectedEdge(data);
  const table = Array.from({ length: Object.keys(data.vertices).length }, () =>
    Array.from({ length: Object.keys(data.vertices).length }, () => "")
  );
  Object.entries(edgeList).forEach(([from, edge]) => {
    edge.forEach((content) => {
      table[vertexMap[from]][vertexMap[content.to]] = content.weight;
    });
  });
  let edgeCount = 0;
  Object.entries(data.edges).forEach(([from, edge]) => {
    if (edge && Array.isArray(edge)) edgeCount += edge.length;
  });
  const pq = new PriorityQueue();
  const visited = Array.from({ length: edgeCount });
  const result = [];
  Object.entries(edgeList[start]).forEach(([index, edge]) => {
    pq.enqueue(edgeList[start][index], edgeList[start][index].weight);
  });
  visited[vertexMap[start]] = true;
  let finalWeight = 0;

  while (pq.queue.length !== 0) {
    const dequeue = pq.dequeue();
    const curVertex = dequeue["vertex"];
    const to = curVertex["to"];
    const weight = curVertex["weight"];
    if (visited[vertexMap[to]]) continue;
    visited[vertexMap[to]] = true;
    result.push(to);
    console.log("weight added: ", weight);
    finalWeight += weight;
    yield {
      table: table,
      graph: data,
    };

    Object.entries(edgeList[to]).forEach(([index, edge]) => {
      pq.enqueue(edgeList[to][index], edgeList[to][index].weight);
    });
  }
  console.log("RESULT:", result);
  console.log("Final Weight:", finalWeight);

  yield {
    table: table,
    graph: data,
  };
}
