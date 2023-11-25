import { BsCursorFill } from "react-icons/bs";
import { FaEraser, FaPaintBrush, FaPen, FaTrash } from "react-icons/fa";

const style = "text-rtools-blue-100 hover:text-white cursor-pointer";
const tools = [
  {
    icon: <BsCursorFill />,
    name: "cursor",
  },
  {
    icon: <FaEraser />,
    name: "eraser",
  },
  {
    icon: <FaPaintBrush />,
    name: "brush",
  },
  {
    icon: <FaPen />,
    name: "pen",
  },
];

export const Toolbar = ({
  vertices,
  setVertices,
  edges,
  setEdges,
  tool,
  setTool,
  handleDelete,
  setSelectedVertex,
  setSelectedColor,
  selectedVertex,
  clear,
}) => {
  return (
    <div className="w-full flex justify-between">
      <div className="flex gap-2 text-xl ml-2">
        <FaTrash
          className={style}
          onClick={() => handleDelete(selectedVertex)}
        />
        {tools.map((t, index) => (
          <div
            key={index}
            className={`${
              tool === t.name ? "text-white" : "text-rtools-blue-100"
            } hover:text-white cursor-pointer`}
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
    </div>
  );
};
