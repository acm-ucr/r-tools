"use client";
import GraphPage from "@/components/Graph/GraphPage";
import Toggle from "@/components/Graph/Toggle";
import Header from "@/components/Header";
import { useState } from "react";

const page = () => {
  const [directedGraph, setDirectedGraph] = useState(true);
  const [weightedGraph, setWeightedGraph] = useState(false);
  return (
    <>
      <Header text="Graphs" />
      <div className="p-2" />
      <div className="flex gap-10 justify-center">
        <Toggle
          toggle={directedGraph}
          setToggle={setDirectedGraph}
          label="directed graph"
        />
        <Toggle
          toggle={weightedGraph}
          setToggle={setWeightedGraph}
          label="weighted graph"
        />
      </div>
      <div className="p-3" />
      <GraphPage directed={directedGraph} weighted={weightedGraph} />
    </>
  );
};

export default page;
