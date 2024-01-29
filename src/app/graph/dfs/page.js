"use client";

import GraphAlgorithm from "@/components/Graph/GraphAlgorithm";
import Header from "@/components/Header";
import { algorithm } from "@/util/graph/dfs";

const page = () => {
  return (
    <>
      <Header text="Depth First Search" />
      <GraphAlgorithm algorithm={algorithm} />
    </>
  );
};

export default page;
