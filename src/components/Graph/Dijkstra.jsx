"use client";
import { useContext, useEffect, useState } from "react";
import Graph from "@/components/Graph/Graph";
import DataContext from "../DataContext";
import { initForAlgo, importJSON } from "@/util/editor/graphFunctions";
import { algorithm } from "@/util/graph/dijkstra";
import toast from "react-hot-toast";
import Table from "../Table";
const size = 500;
const Dijkstra = () => {
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
  const handleRun = () => {
    if (!data.selectedVertex) {
      toast.error("Please select a starting vertex");
      return;
    }
    const graphAlgorithm = algorithm(data, data.selectedVertex);
    setStepIndex(0);
    setSteps(graphAlgorithm);
    setCurrent(graphAlgorithm.next().value);
  };

  useEffect(() => {
    setCurrent(null);
    initForAlgo(data, setData);
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
      <div className="flex gap-10 justify-center my-2">
        {data.directed ? <div>directed</div> : <div>undirected</div>}
        {data.weighted ? <div>weighted</div> : <div>unweighted</div>}
      </div>
      <div className="flex w-full justify-evenly">
        <div className="flex flex-col gap-2">
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
        <button onClick={handleRun}>run</button>
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

export default Dijkstra;
