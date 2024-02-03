"use client";
import GraphAlgorithm from "@/components/Graph/GraphAlgorithm";
import Header from "@/components/Header";
import { algorithm } from "@/util/graph/dijkstra";

const page = () => {
  return (
    <>
      <Header text="Dijkstra" />
      <GraphAlgorithm
        algorithm={algorithm}
        distances={true}
        allowNegativeEdge={false}
      />
    </>
  );
};

export default page;
