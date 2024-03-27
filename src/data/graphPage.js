import bellmanFord from "@/util/graph/bellman-ford";
import bfs from "@/util/graph/bfs";
import dfs from "@/util/graph/dfs";
import dijkstra from "@/util/graph/dijkstra";
import floydWarshall from "@/util/graph/floyd-warshall";
import kruskals from "@/util/graph/kruskals";
import prims from "@/util/graph/prims";

export const GRAPH_PAGE = {
  "bellman-ford": {
    title: "Bellman Ford",
    algorithm: bellmanFord,
    negative: 0,
    weighted: 1,
    directed: 0,
    colorkeys: {
      cloud: "yellow",
      minheap: "purple",
      "minimum weight": "pink",
      current: "teal",
    },
    requireStartVertex: true,
    header: ["Vertex", "Distance", "Previous"],
  },
  bfs: {
    title: "Breadth First Search",
    algorithm: bfs,
    negative: -1,
    weighted: -1,
    directed: 0,
    colorkeys: {},
    requireStartVertex: true,
    header: ["Vertex", "Reachable"],
    colorkeys: {
      cloud: "yellow",

      current: "teal",
    },
  },
  dfs: {
    title: "Depth First Search",
    algorithm: dfs,
    negative: 0,
    weighted: 0,
    directed: 0,
    colorkeys: {
      cloud: "yellow",

      current: "teal",
    },
    header: ["Vertex", "Reachable"],
    requireStartVertex: true,
  },
  dijkstra: {
    title: "Dijkstra",
    algorithm: dijkstra,
    negative: -1,
    weighted: 1,
    directed: 0,
    colorkeys: {
      cloud: "yellow",
      minheap: "purple",
      "minimum weight": "pink",
      current: "teal",
    },
    requireStartVertex: true,
    header: ["Vertex", "Distance", "Previous"],
  },
  "floyd-warshall": {
    title: "Floyd Warshall",
    algorithm: floydWarshall,
    negative: 0,
    weighted: 1,
    directed: 0,
    colorkeys: {
      from: "teal",
      to: "purple",
      current: "pink",
    },
    requireStartVertex: false,
  },
  kruskals: {
    title: "Kruskals",
    algorithm: kruskals,
    negative: 0,
    weighted: 1,
    directed: -1,
    colorkeys: {
      cloud: "yellow",
      minheap: "purple",
      "minimum weight": "pink",
      current: "teal",
    },
    requireStartVertex: true,
  },
  prims: {
    title: "Prims",
    algorithm: prims,
    negative: -1,
    weighted: 1,
    directed: -1,
    colorkeys: {
      cloud: "yellow",
      minheap: "purple",
      "minimum weight": "pink",
      current: "teal",
    },
    requireStartVertex: true,
  },
};
