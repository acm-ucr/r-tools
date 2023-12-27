"use client";
import Input from "@/components/Input";
import EdgesList from "./EdgesList";
import Button from "@/components/Button";
import { useMemo, useState } from "react";
import {
  addVertex,
  downLoadJSON,
  downloadPNG,
  downloadSVG,
  importJSON,
  resetColor,
  getUndirectedEdge,
} from "@/util/editor/graphFunctions";
import VerticesList from "./VerticesList";
import Editor from "./Editor";
const size = 600;
const GraphPage = ({ directed, weighted }) => {
  const [data, setData] = useState({
    vertices: {},
    edges: {},
    selectedVertex: null,
    selectedEdge: null,
    selectedColor: null,
    value: "",
    tool: "cursor",
  });

  const undirectedEdge = useMemo(() => getUndirectedEdge(data), [data.edges]);

  return (
    <div className="flex w-full justify-evenly h-full">
      <div className="flex flex-col gap-3 h-full w-1/5">
        <form>
          <Input
            placeholder="ex. A"
            button="add"
            onSubmit={() => addVertex(data, setData, size)}
            value={data.value}
            setValue={(newValue) => {
              setData({ ...data, value: newValue });
            }}
          />
        </form>
        <VerticesList
          data={data}
          setData={setData}
          edges={directed ? data.edges : undirectedEdge.twoWay}
        />
      </div>
      <Editor
        size={size}
        data={data}
        setData={setData}
        directed={directed}
        weighted={weighted}
        undirectedEdge={undirectedEdge}
      />
      <div className="flex flex-col gap-3 h-full w-1/5">
        <EdgesList
          directed={directed}
          weighted={weighted}
          data={data}
          setData={setData}
          edges={directed ? data.edges : undirectedEdge.oneWay}
        />
        <Button text="RESET COLOR" onClick={() => resetColor(data, setData)} />
        <Button text="DOWNLOAD SVG" onClick={downloadSVG} />
        <Button text="DOWNLOAD PNG" onClick={downloadPNG} />
        <Button text="DOWNLOAD JSON" onClick={() => downLoadJSON(data)} />
        <input type="file" onChange={(e) => importJSON(e, data, setData)} />
      </div>
    </div>
  );
};

export default GraphPage;
