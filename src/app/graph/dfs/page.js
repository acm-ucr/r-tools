"use client";

import GraphAlgorithm from "@/components/Graph/GraphAlgorithm";
import Header from "@/components/Header";
import { algorithm } from "@/util/graph/dfs";

const page = () => {
  return (
    <>
      <Header text="Depth First Search" />
      <GraphAlgorithm
        algorithm={algorithm}
        allowNegativeEdge={false}
        allowWeighted={false}
      />
    </>
  );
};

export default page;
