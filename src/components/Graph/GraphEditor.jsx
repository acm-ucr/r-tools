"use client";
import EdgesList from "@/components/Graph/EdgesList";
import Toggle from "@/components/Graph/Toggle";
import VerticesList from "@/components/Graph/VerticesList";
import Input from "@/components/Input";
import { useState, useEffect } from "react";
import Button from "@/components/Button";
import {
  addVertex,
  downLoadJSON,
  downloadPNG,
  downloadSVG,
  importJSON,
  resetColor,
  setEdgeWeight,
  getTwoWayUndirectedEdge,
  getOneWayUndirectedEdge,
} from "@/util/editor/graphFunctions";
import { Toolbar } from "@/components/Graph/Toolbar";
import Graph from "@/components/Graph/Graph";
import ColorPicker from "@/components/Graph/ColorPicker";
const size = 500;
const GraphEditor = () => {
  const [directed, setDirected] = useState(true);
  const [weighted, setWeighted] = useState(false);
  const [data, setData] = useState({
    vertices: {},
    edges: {},
    selectedVertex: null,
    selectedEdge: null,
    selectedColor: null,
    input: "",
    tool: "cursor",
  });
  const handleUserKeyPress = (e) => {
    if (e.code.startsWith("Digit") && data.selectedEdge)
      setEdgeWeight(
        data,
        setData,
        data.selectedEdge.from,
        data.selectedEdge.to,
        parseInt(e.key)
      );
  };
  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [data]);
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
        <div className="flex flex-col gap-3 w-1/5">
          <Input
            placeholder="ex. A"
            button="add"
            onSubmit={() => addVertex(data, setData, size)}
            value={data.input}
            setValue={(newValue) => {
              setData({ ...data, input: newValue });
            }}
          />
          <VerticesList
            data={data}
            setData={setData}
            edges={directed ? data.edges : getTwoWayUndirectedEdge(data)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Toolbar data={data} setData={setData} />
          <Graph
            width={size}
            height={size}
            directed={directed}
            weighted={weighted}
            setData={setData}
            data={data}
            editable={true}
          />
          <ColorPicker data={data} setData={setData} />
        </div>
        <div className="flex flex-col gap-3 w-1/5">
          <EdgesList
            directed={directed}
            weighted={weighted}
            data={data}
            setData={setData}
            edges={directed ? data.edges : getOneWayUndirectedEdge(data)}
          />
          <Button
            text="RESET COLOR"
            onClick={() => resetColor(data, setData)}
          />
          <Button text="DOWNLOAD SVG" onClick={downloadSVG} />
          <Button text="DOWNLOAD PNG" onClick={downloadPNG} />
          <Button text="DOWNLOAD JSON" onClick={() => downLoadJSON(data)} />
          <input
            type="file"
            onChange={(e) => {
              importJSON(e, data, setData);
              e.target.value = null;
            }}
            value={null}
          />
        </div>
      </div>
    </>
  );
};

export default GraphEditor;
