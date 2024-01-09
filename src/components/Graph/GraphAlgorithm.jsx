"use client";
import { useContext, useEffect, useState } from "react";
import Graph from "@/components/Graph/Graph";
import DataContext from "../DataContext";
import { importJSON } from "@/util/editor/graphFunctions";
import toast from "react-hot-toast";
import Table from "../Table";

const size = 500;
const GraphAlgorithm = ({ algorithm, allowNegativeEdge }) => {
  const { data, setData } = useContext(DataContext);
  const [steps, setSteps] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [current, setCurrent] = useState(null);
  const [play, setPlay] = useState(false);
  const handleStep = () => {
    if (!steps) return;
    const next = steps.next();
    if (next.done) {
      toast.success("done");
      setPlay(false);
      return;
    } else {
      setStepIndex(stepIndex + 1);
      setCurrent(next.value);
    }
  };
  const handlePlay = () => {
    if (!data.selectedVertex) {
      toast.error("Please select a vertex to start");
      return;
    }
    setPlay(!play);
  };
  const hasNegativeEdge = () => {
    // TODO: add negative weight check
    /*
    Edges are stored in data.edges, you can use the graph editor to make a graph and download 
    as json to see what the grpah data being stored as.
    If there is nagative edge toast an error message like "this algorithm doesn't allow negative edgs" and returen true.
    If there is no negative edge, return false
    */
    return false;
  };
  useEffect(() => {
    const newData = data;
    Object.entries(data.vertices).forEach(([key, vertex]) => {
      newData.vertices[key] = { ...vertex, color: "white" };
    });
    Object.entries(data.edges).forEach(([key, edge]) => {
      newData.edges[key] = edge.map((e) => ({ ...e, color: "white" }));
    });
    setData({
      ...newData,
      tool: "cursor",
    });
    if (data.selectedVertex) {
      if (!allowNegativeEdge && hasNegativeEdge()) {
        return;
      }
      const graphAlgorithm = algorithm(newData, data.selectedVertex);
      setStepIndex(0);
      setSteps(graphAlgorithm);
      setCurrent(graphAlgorithm.next().value);
    } else {
      setCurrent(null);
    }
  }, [data.selectedVertex]);

  useEffect(() => {
    const id = setInterval(() => {
      if (play) handleStep();
    }, 300);

    return () => {
      clearInterval(id);
    };
  });

  return (
    <>
      <div className="flex w-full justify-evenly">
        <Graph
          width={size}
          height={size}
          setData={setData}
          data={{ ...data, ...current?.graph }}
          editable={false}
        />
        {current?.table && (
          <Table
            matrix={current?.table}
            header={["vertex", "distance", "previous"]}
            rounded={true}
          />
        )}
        <button onClick={handlePlay}>play</button>
        <button onClick={handleStep}>step</button>
        <input
          type="file"
          onChange={(e) => {
            importJSON(e, data, setData, false);
            e.target.value = null;
          }}
          value={null}
        />
      </div>
    </>
  );
};

export default GraphAlgorithm;
