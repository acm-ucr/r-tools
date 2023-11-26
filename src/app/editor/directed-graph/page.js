"use client";
import Header from "@/components/Header";
import Graph from "@/components/Graph/Graph";
import Vertices from "@/components/Graph/Vertices";
import Input from "@/components/Input";
import { Toolbar } from "@/components/Graph/Toolbar";
import ColorPicker from "@/components/Graph/ColorPicker";
import Edges from "@/components/Graph/Edges";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { VERTICES, EDGES } from "@/mockdata/graphVertex";
import shortUUID from "short-uuid";
import Cursor from "@/components/Graph/Cursor";

const page = () => {
  const [vertices, setVertices] = useState(VERTICES);
  const [edges, setEdges] = useState(EDGES);
  const [value, setValue] = useState("");
  const [tool, setTool] = useState("cursor");
  const [selectedVertex, setSelectedVertex] = useState(null);
  const [selectedColor, setSelectedColor] = useState();
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const addVertex = () => {
    event.preventDefault();
    const id = shortUUID.generate();
    setVertices({
      ...vertices,
      [id]: {
        value,
        id,
        radius: 25,
        x: Math.random() * 500 + 50,
        y: Math.random() * 500 + 50,
        color: "white",
      },
    });
    setValue("");
  };

  const deleteVertex = (id) => {
    if (!id) return;
    const newVertices = { ...vertices };
    delete newVertices[id];
    setVertices(newVertices);

    const newEdges = {};
    Object.entries(edges).forEach(([edge, d]) => {
      if (edge !== selectedVertex) {
        newEdges[edge] = d.filter((e) => e.to != selectedVertex);
      }
    });
    setEdges(newEdges);
    setSelectedVertex(null);
  };

  const addEdge = (from, to, color) => {
    const neighbor = edges[from];
    if (!neighbor) {
      setEdges({
        ...edges,
        [from]: [{ to: to, color: color }],
      });
    } else if (!neighbor.some((e) => e.to === to)) {
      setEdges({
        ...edges,
        [from]: [...neighbor, { to: to, color: color }],
      });
    }
    return;
  };

  const clear = () => {
    setVertices({});
    setEdges({});
  };

  const cursorMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  const deleteEdge = (from, to) => {
    setEdges({ ...edges, [from]: edges[from].filter((e) => e.to !== to) });
  };

  const resetColor = () => {
    const newVertices = {};
    Object.entries(vertices).forEach(([key, vertex]) => {
      newVertices[key] = { ...vertex, color: "white" };
    });
    const newEdges = {};
    Object.entries(edges).forEach(([key, edge]) => {
      newEdges[key] = edge.map((e) => ({ ...e, color: "white" }));
    });
    setEdges(newEdges);
    setVertices(newVertices);
  };

  useEffect(() => {
    const keyDown = (e) => {
      if (e.key === "Backspace") {
        deleteVertex(selectedVertex);
      }
    };
    document.addEventListener("mousemove", cursorMove);
    document.addEventListener("keydown", keyDown);
    return () => {
      document.removeEventListener("mousemove", cursorMove);
      document.addEventListener("keydown", keyDown);
    };
  }, [selectedVertex]);

  return (
    <div
      className={`w-full ${
        (tool === "brush" || tool === "pen") && "cursor-none"
      }`}
    >
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
          <Vertices
            vertices={vertices}
            edges={edges}
            selectedVertex={selectedVertex}
            setSelectedVertex={setSelectedVertex}
            directed={true}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Toolbar
            tool={tool}
            setTool={setTool}
            handleDelete={deleteVertex}
            selectedVertex={selectedVertex}
            setSelectedVertex={setSelectedVertex}
            setSelectedColor={setSelectedColor}
            clear={clear}
            cursorPos={cursorPos}
          />
          <Graph
            width={600}
            height={600}
            vertices={vertices}
            setVertices={setVertices}
            edges={edges}
            setEdges={setEdges}
            selectedVertex={selectedVertex}
            setSelectedVertex={setSelectedVertex}
            tool={tool}
            addEdge={addEdge}
            deleteEdge={deleteEdge}
            selectedColor={selectedColor}
            deleteVertex={deleteVertex}
            directed={true}
          />
          <ColorPicker
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        </div>
        <div className="flex flex-col gap-3 h-full w-1/5">
          <Edges vertices={vertices} edges={edges} directed={true} />
          <Button text="RESET COLOR" onClick={resetColor} />
          <Button text="DOWNLOAD PNG" onClick={() => {}} />
        </div>
      </div>
      <Cursor tool={tool} selectedColor={selectedColor} cursorPos={cursorPos} />
    </div>
  );
};

export default page;
