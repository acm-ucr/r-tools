"use client";

import GraphAlgorithm from "@/components/Graph/GraphAlgorithm";
import Header from "@/components/Header";
import { algorithm } from "@/util/graph/bfs";

const page = () => {
  return (
    <>
      <Header text="Breadth First Search" />
      <GraphAlgorithm header={["vertex", "previous"]} algorithm={algorithm} />
    </>
  );
};

export default page;
