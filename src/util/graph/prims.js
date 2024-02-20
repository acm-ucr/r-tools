import { getTwoWayUndirectedEdge } from "../editor/graphFunctions";

export function* algorithm(data, start) {
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
  yield {
    table: table,
    graph: data,
  };
}
