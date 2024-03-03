"use client";
import GraphAlgorithm from "@/components/Graph/GraphAlgorithm";
import Header from "@/components/Header";
import { algorithm } from "@/util/graph/bellmen-ford";

const page = () => {
  return (
    <>
      <Header text="Bellman Ford" />
      <GraphAlgorithm
        algorithm={algorithm}
        header={["vertex", "distance", "previous"]}
        allowNegativeEdge={true}
      />
    </>
  );
};

export default page;
