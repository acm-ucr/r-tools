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
    negative: 1,
    weighted: 1,
    directed: 1,
  },
  bfs: {
    title: "Breadth First Search",
    algorithm: bfs,
    negative: -1,
    weighted: 0,
    directed: 1,
  },
  dfs: {
    title: "Depth First Search",
    algorithm: dfs,
    negative: -1,
    weighted: 0,
    directed: 1,
  },
  dijkstra: {
    title: "Dijkstra",
    algorithm: dijkstra,
    negative: -1,
    weighted: 1,
    directed: 1,
  },
  "floyd-warshall": {
    title: "Floyd Warshall",
    algorithm: floydWarshall,
    negative: 1,
    weighted: 1,
    directed: 1,
  },
  kruskals: {
    title: "Kruskals",
    algorithm: kruskals,
    negative: -1,
    weighted: 1,
    directed: -1,
  },
  prims: {
    title: "Prims",
    algorithm: prims,
    negative: -1,
    weighted: 1,
    directed: -1,
  },
};
