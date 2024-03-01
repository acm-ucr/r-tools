"use client";
import { useContext, useEffect, useState } from "react";
import Graph from "@/components/Graph/Graph";
import DataContext from "../DataContext";
import { importJSON } from "@/util/editor/graphFunctions";
import toast from "react-hot-toast";
import Table from "../Table";
import { GRAPH_PAGE } from "@/data/graphPage";

const size = 500;
const GraphAlgorithm = ({ algorithm }) => {
  const allowNegativeEdge = GRAPH_PAGE[algorithm].negative;
  const allowWeighted = GRAPH_PAGE[algorithm].weighted;
  const requireStartVertex = GRAPH_PAGE[algorithm].directed;

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
    if (requireStartVertex && !data.selectedVertex) {
      toast.error("Please select a vertex to start");
      return;
    }
    setPlay(!play);
  };
  const handleReplay = () => {
    setPlay(false);
    setStepIndex(0);
    setCurrent(null);
    const newData = data; // reinitialize the data
    Object.entries(data.vertices).forEach(([key, vertex]) => {
      // set vertices back to default color
      newData.vertices[key] = { ...vertex, color: "white" };
    });
    Object.entries(data.edges).forEach(([key, edge]) => {
      // set edges back to default color
      newData.edges[key] = edge.map((e) => ({ ...e, color: "white" }));
    });
    setData({
      ...newData,
      tool: "cursor",
    });
    if (data.selectedVertex) {
      // to prevent user from running an algorithm that doesn't allow weighted or negative edges via replay button
      if (!allowNegativeEdge && hasNegativeEdge()) {
        toast("This algorithm doesn't allow negative weights");
        return;
      }
      if (!allowWeighted && isWeighted()) {
        toast("This algorithm doesn't allow weights");
        return;
      }
      const graphAlgorithm = algorithm(newData, data.selectedVertex);
      setSteps(graphAlgorithm);
      setCurrent(graphAlgorithm.next().value);
    } else {
      setCurrent(null);
    }
  };
  const hasNegativeEdge = () => {
    return (
      data.edges &&
      Object.values(data.edges).some((edges) =>
        edges.some((edge) => edge.hasOwnProperty("weight") && edge.weight < 0)
      )
    );
  };
  const isWeighted = () => {
    return data.weighted;
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
      if (allowNegativeEdge === -1 && hasNegativeEdge()) {
        toast("This algorithm doesn't allow negative weights");
        return;
      }
      if (allowWeighted === -1 && isWeighted()) {
        toast("This algorithm doesn't allow weights");
        return;
      }
      const graphAlgorithm = GRAPH_PAGE[algorithm].algorithm(
        newData,
        data.selectedVertex
      );
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
        <div>
          <div className="flex justify-start items-center m-2">
            <div
              className={`h-4 w-4 rounded-full ${
                data.directed ? "bg-rtools-green" : "bg-gray-300 opacity-30"
              }`}
            ></div>
            <span className={`ml-2 mr-4 ${data.directed ? "" : "opacity-30"}`}>
              Directed
            </span>
            <div
              className={`h-4 w-4 rounded-full ${
                data.weighted ? "bg-rtools-green" : "bg-gray-300 opacity-30"
              }`}
            ></div>
            <span className={`ml-2 mr-4 ${data.weighted ? "" : "opacity-30"}`}>
              Weighted
            </span>
          </div>
          <Graph
            width={size}
            height={size}
            setData={setData}
            data={{ ...data, ...current?.graph }}
            editable={false}
          />
        </div>
        {current?.table && (
          <Table
            matrix={current?.table}
            header={["vertex", "distance", "previous"]}
            rounded={true}
          />
        )}
        <button onClick={handlePlay}>play</button>
        <button onClick={handleStep}>step</button>
        <button onClick={handleReplay}>replay</button>
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
