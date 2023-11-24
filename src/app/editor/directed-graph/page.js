"use client";
import Header from "@/components/Header";
import Graph from "@/components/Graph/Graph";
import Vertices from "@/components/Graph/Vertices";
import Input from "@/components/Input";
import { Toolbar } from "@/components/Graph/Toolbar";
import ColorPicker from "@/components/Graph/ColorPicker";
import Edges from "@/components/Graph/Edges";
import Button from "@/components/Button";
import { useState } from "react";
import { VERTICES, EDGES } from "@/mockdata/graphVertex";

const page = () => {
  const [vertices, setVertices] = useState(VERTICES);
  const [edges, setEdges] = useState(EDGES);
  const [value, setValue] = useState("");
  const addVertex = () => {
    event.preventDefault();
    const id = Object.keys(vertices).length;
    setVertices({
      ...vertices,
      [id]: {
        value,
        id,
        radius: 25,
        x: Math.random() * 500 + 50,
        y: Math.random() * 500 + 50,
      },
    });
    setValue("");
  };
  return (
    <div className="w-full h-[80vh]">
      <Header text="Directed Graph" />
      <div className="flex w-full justify-evenly h-full ">
        <div className="flex flex-col gap-3 h-full w-1/5">
          <form>
            <Input
              placeholder="ex. A"
              button="add"
              onClick={addVertex}
              value={value}
              setValue={setValue}
            />
          </form>
          <Vertices vertices={vertices} edges={edges} />
        </div>
        <div className="flex flex-col gap-2">
          <Toolbar
            vertices={vertices}
            setVertices={setVertices}
            edges={edges}
            setEdges={setEdges}
          />
          <Graph
            width={600}
            height={600}
            vertices={vertices}
            setVertices={setVertices}
            edges={edges}
          />
          <ColorPicker />
        </div>
        <div className="flex flex-col gap-3 h-full w-1/5">
          <Edges vertices={vertices} edges={edges} />
          <Button text="RESET COLOR" onClick={() => {}} />
          <Button text="DOWNLOAD PNG" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default page;
