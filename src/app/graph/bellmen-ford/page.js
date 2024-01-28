"use client";
import GraphAlgorithm from "@/components/Graph/GraphAlgorithm";
import Header from "@/components/Header";
import { algorithm } from "@/util/graph/bellmen-ford";

const page = () => {
  return (
    <>
      <Header text="Bellmen Ford" />
      <GraphAlgorithm algorithm={algorithm} allowNegativeEdge={true} />
    </>
  );
};

export default page;
