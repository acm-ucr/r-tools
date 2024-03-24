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
        header={["vertex", "distance", "previous"]}
        allowNegativeEdge={false}
      />
    </>
  );
};

export default page;
