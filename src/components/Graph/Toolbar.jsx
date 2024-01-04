import { BsCursorFill } from "react-icons/bs";
import { FaEraser, FaPaintBrush, FaPen, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { clear, deleteEdge, deleteVertex } from "@/util/editor/graphFunctions";

const style = "text-rtools-blue-100 hover:text-white cursor-pointer";
const tools = [
  {
    icon: <BsCursorFill />,
    name: "cursor",
    notes: "Select to move nodes",
  },
  {
    icon: <FaEraser />,
    name: "eraser",
    notes: "Select, then drag across an edge to delete the edge",
  },
  {
    icon: <FaPaintBrush />,
    name: "brush",
    notes:
      "Select, then choose a color at the bottom of the screen, then drag cross a vertex or edge to color it",
  },
  {
    icon: <FaPen />,
    name: "pen",
    notes:
      "Select, then choose two nodes to draw a directed edge between (from first selected to second selected)",
  },
];

export const Toolbar = ({ data, setData }) => {
  const [notes, setNotes] = useState(null);

  return (
    <div className="w-full flex justify-between">
      <div className="flex gap-2 text-xl ml-2">
        <FaTrash
          className={style}
          onClick={() => {
            if (data.selectedVertex)
              deleteVertex(data, setData, data.selectedVertex);
            if (data.selectedEdge)
              deleteEdge(
                data,
                setData,
                data.selectedEdge.from,
                data.selectedEdge.to
              );
          }}
          onMouseEnter={() =>
            setNotes("Select to delete currently highlighted node")
          }
          onMouseLeave={() => setNotes(null)}
        />
        {tools.map((t, index) => (
          <div
            key={index}
            className={`${
              data.tool === t.name ? "text-white" : "text-rtools-blue-100"
            } hover:text-white cursor-pointer relative`}
            onMouseEnter={() => setNotes(t.name)}
            onMouseLeave={() => setNotes(null)}
            onClick={() => {
              setData({
                ...data,
                tool: t.name,
                selectedVertex: null,
                selectedColor:
                  t.name === "pen" || t.name === "brush" || t.name === "eraser"
                    ? "white"
                    : null,
              });
            }}
          >
            {t.icon}
            {notes === t.name && (
              <div className="bg-white text-black p-2 rounded-md shadow-md text-base w-48 absolute">
                {t.notes}
              </div>
            )}
          </div>
        ))}
      </div>
      <div
        onClick={() => clear(data, setData)}
        className="text-rtools-blue-100 hover:text-white cursor-pointer"
      >
        clear
      </div>
    </div>
  );
};
