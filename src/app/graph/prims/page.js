"use client";
import GraphAlgorithm from "@/components/Graph/GraphAlgorithm";
import Header from "@/components/Header";
import { algorithm } from "@/util/graph/prims";

const page = () => {
  return (
    <>
      <Header text="Prim's Algorithm" />
      <GraphAlgorithm
        algorithm={algorithm}
        allowNegativeEdge={true}
        allowWeighted={true}
      />
    </>
  );
};

export default page;
