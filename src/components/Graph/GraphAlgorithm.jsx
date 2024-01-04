"use client";
import Toggle from "@/components/Graph/Toggle";
import { useState, useContext, useEffect } from "react";

import Graph from "@/components/Graph/Graph";
import DataContext from "../DataContext";
const size = 500;
const GraphEditor = () => {
  const [directed, setDirected] = useState(true);
  const [weighted, setWeighted] = useState(false);
  const { data, setData } = useContext(DataContext);
  useEffect(() => {
    setData({ ...data, tool: "cursor" });
  }, []);
  return (
    <>
      <div className="flex gap-10 justify-center my-2">
        <Toggle
          toggle={directed}
          setToggle={setDirected}
          label="directed graph"
        />
        <Toggle
          toggle={weighted}
          setToggle={setWeighted}
          label="weighted graph"
        />
      </div>
      <div className="flex w-full justify-evenly">
        <div className="flex flex-col gap-2">
          <Graph
            width={size}
            height={size}
            directed={directed}
            weighted={weighted}
            setData={setData}
            data={data}
            editable={true}
          />
        </div>
      </div>
    </>
  );
};

export default GraphEditor;
