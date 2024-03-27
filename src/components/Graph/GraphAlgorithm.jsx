"use client";
import { useContext, useEffect, useState } from "react";
import Graph from "@/components/Graph/Graph";
import DataContext from "../DataContext";
import { importJSON } from "@/util/editor/graphFunctions";
import toast from "react-hot-toast";
import Table from "../Table";
import { GRAPH_PAGE } from "@/data/graphPage";
import Upload from "../Upload";
import ActionButton from "../ActionButton";
import { FaPause, FaPlay } from "react-icons/fa";
import { LuStepForward } from "react-icons/lu";
import { MdOutlineReplay } from "react-icons/md";
import GraphIndications from "./GraphIndications";

const size = 500;
const GraphAlgorithm = ({ algorithm }) => {
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
  const isDirected = () => {
    return data.directed;
  };

  const check = () => {
    const allowNegativeEdge = GRAPH_PAGE[algorithm].negative;
    const allowWeighted = GRAPH_PAGE[algorithm].weighted;
    const allowDirected = GRAPH_PAGE[algorithm].directed;
    const requireStartVertex = GRAPH_PAGE[algorithm].requireStartVertex;

    if (requireStartVertex && !data.selectedVertex) {
      toast.error("Please select a vertex to start");
      return false;
    }
    if (allowWeighted === -1 && isWeighted()) {
      toast.error("This algorithm doesn't allow weights");
      return false;
    }
    if (allowWeighted === 1 && !isWeighted()) {
      toast.error("This algorithm has to run on weighted graphs");
      return false;
    }
    if (allowDirected === -1 && isDirected()) {
      toast.error("This algorithm doesn't allow directed graphs");
      return false;
    }
    if (allowDirected === 1 && !isDirected()) {
      toast.error("This algorithm has to run on directed graphs");
      return false;
    }
    const hasNegative = hasNegativeEdge();
    if (allowNegativeEdge === -1 && hasNegative) {
      toast.error("This algorithm doesn't allow negative weights");
      return false;
    }
    return true;
  };

  const handlePlay = () => {
    if (check()) {
      setPlay(!play);
    }
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
    if (data.selectedVertex && check()) {
      const graphAlgorithm = GRAPH_PAGE[algorithm].algorithm(
        newData,
        data.selectedVertex
      );
      setSteps(graphAlgorithm);
      setCurrent(graphAlgorithm.next().value);
    } else {
      setCurrent(null);
    }
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
    if (data.selectedVertex || !GRAPH_PAGE[algorithm].requireStartVertex) {
      if (!check()) return;
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
          <GraphIndications
            directed={data.directed}
            weighted={data.weighted}
            colorkeys={GRAPH_PAGE[algorithm].colorkeys}
          />
          <Graph
            width={size}
            height={size}
            setData={setData}
            data={{ ...data, ...current?.graph }}
            editable={false}
          />
          <div className="grid grid-cols-3 gap-1 items-center w-full">
            {play ? (
              <ActionButton function={handlePlay} text="pause" icon={FaPause} />
            ) : (
              <ActionButton function={handlePlay} text="play" icon={FaPlay} />
            )}
            <ActionButton
              function={handleStep}
              text="step"
              icon={LuStepForward}
            />
            <ActionButton
              function={handleReplay}
              text="replay"
              icon={MdOutlineReplay}
            />
          </div>
          <Upload
            text="IMPORT A JSON"
            onChange={(e) => {
              importJSON(e, data, setData);
              e.target.value = null;
            }}
          />
        </div>
        {current?.table && (
          <Table
            matrix={current?.table}
            header={GRAPH_PAGE[algorithm].header}
            rounded={true}
          />
        )}
      </div>
    </>
  );
};

export default GraphAlgorithm;
