import GraphAlgorithm from "@/components/Graph/GraphAlgorithm";
import Header from "@/components/Header";
import { GRAPH_PAGE } from "@/data/graphPage";

const page = ({ params }) => {
  return (
    <>
      <Header text={GRAPH_PAGE[params.algorithm].title} />
      <GraphAlgorithm algorithm={params.algorithm} />
    </>
  );
};

export default page;

export async function generateStaticParams() {
  return [
    {
      algorithm: "bellman-ford",
    },
    {
      algorithm: "bfs",
    },
    {
      algorithm: "dfs",
    },
    {
      algorithm: "dijkstra",
    },
    {
      algorithm: "floyd-warshall",
    },
    {
      algorithm: "kruskals",
    },
  ];
}
