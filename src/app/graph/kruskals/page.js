"use client";
import GraphAlgorithm from "@/components/Graph/GraphAlgorithm";
import Header from "@/components/Header";
import { algorithm } from "@/util/graph/kruskals";

const page = () => {
  return (
    <>
      <Header text="Kruskals" />
      <GraphAlgorithm
        algorithm={algorithm}
        allowNegativeEdge={true}
        allowWeighted={true}
      />
    </>
  );
};

export default page;
