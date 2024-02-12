import bellmanFord from "@/util/graph/bellman-ford";
import dijkstra from "@/util/graph/dijkstra";

export const GRAPH_PAGE = {
  dijkstra: {
    title: "Dijkstra",
    algorithm: dijkstra,
    // todo fix these, these are probably not correct
    negative: 0,
    weighted: 0,
    directed: 0,
  },
  "bellman-ford": {
    title: "Bellman Ford",
    algorithm: bellmanFord,
    negative: -1,
    weighted: 1,
    directed: 0,
  },
};
