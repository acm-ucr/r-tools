"use client";
import { useContext, useEffect } from "react";

import Graph from "@/components/Graph/Graph";
import DataContext from "../DataContext";
import { initForAlgo, importJSON } from "@/util/editor/graphFunctions";
const size = 500;
const Dijkstra = () => {
  const { data, setData } = useContext(DataContext);
  useEffect(() => {
    initForAlgo(data, setData);
  }, []);
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
            data={data}
            editable={false}
          />
        </div>
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
