"use client";
import EdgesList from "@/components/Graph/EdgesList";
import Toggle from "@/components/Graph/Toggle";
import VerticesList from "@/components/Graph/VerticesList";
import Input from "@/components/Input";
import { useEffect, useContext } from "react";
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
import DataContext from "../DataContext";
const size = 500;
const GraphEditor = () => {
  const { data, setData } = useContext(DataContext);
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
  useEffect(() => {
    setData({ ...data, edges: getOneWayUndirectedEdge(data) });
  }, [data.directed]);
  return (
    <>
      <div className="flex gap-10 justify-center my-2">
        <Toggle
          label="directed graph"
          field="directed"
          object={data}
          setObject={setData}
        />
        <Toggle
          object={data}
          setObject={setData}
          label="weighted graph"
          field="weighted"
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
            edges={data.directed ? data.edges : getTwoWayUndirectedEdge(data)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Toolbar data={data} setData={setData} />
          <Graph
            width={size}
            height={size}
            directed={data.directed}
            weighted={data.weighted}
            setData={setData}
            data={data}
            editable={true}
          />
          <ColorPicker data={data} setData={setData} />
        </div>
        <div className="flex flex-col gap-3 w-1/5">
          <EdgesList
            directed={data.directed}
            weighted={data.weighted}
            data={data}
            setData={setData}
            edges={data.directed ? data.edges : getOneWayUndirectedEdge(data)}
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
