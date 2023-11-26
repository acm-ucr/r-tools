import { BsCursorFill } from "react-icons/bs";
import { FaEraser, FaPaintBrush, FaPen, FaTrash } from "react-icons/fa";
import { useState } from "react";

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

export const Toolbar = ({
  tool,
  setTool,
  handleDelete,
  setSelectedVertex,
  setSelectedColor,
  selectedVertex,
  clear,
  cursorPos,
}) => {
  const [notes, setNotes] = useState(null);
  return (
    <div className="w-full flex justify-between">
      <div className="flex gap-2 text-xl ml-2">
        <FaTrash
          className={style}
          onClick={() => handleDelete(selectedVertex)}
          onMouseEnter={() =>
            setNotes("Select to delete currently highlighted node")
          }
          onMouseLeave={() => setNotes(null)}
        />
        {tools.map((t, index) => (
          <div
            key={index}
            className={`${
              tool === t.name ? "text-white" : "text-rtools-blue-100"
            } hover:text-white cursor-pointer`}
            onMouseEnter={() => setNotes(t.notes)}
            onMouseLeave={() => setNotes(null)}
            onClick={() => {
              setTool(t.name);
              setSelectedVertex(null);
              if (t.name === "pen" || t.name === "brush") {
                setSelectedColor("white");
              } else setSelectedColor(null);
            }}
          >
            {t.icon}
          </div>
        ))}
      </div>
      <div
        onClick={clear}
        className="text-rtools-blue-100 hover:text-white cursor-pointer"
      >
        clear
      </div>
      {notes && (
        <div
          className="bg-white text-black p-2 rounded-md shadow-md w-1/5"
          style={{
            position: "absolute",
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
          }}
        >
          {notes}
        </div>
      )}
    </div>
  );
};
