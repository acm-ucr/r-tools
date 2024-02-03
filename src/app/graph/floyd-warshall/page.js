"use client";
import GraphAlgorithm from "@/components/Graph/GraphAlgorithm";
import Header from "@/components/Header";
import { algorithm } from "@/util/graph/floyd-warshall";

const page = () => {
  return (
    <>
      <Header text="Floyd Warshall" />
      <GraphAlgorithm
        algorithm={algorithm}
        distances={true}
        allowNegativeEdge={true}
      />
    </>
  );
};

export default page;
