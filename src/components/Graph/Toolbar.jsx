import { FaEraser, FaPaintBrush, FaPen, FaTrash } from "react-icons/fa";

const style = "text-rtools-blue-100 hover:text-white cursor-pointer";

export const Toolbar = ({ vertices, setVertices, edges, setEdges }) => {
  return (
    <div className="flex gap-2 text-xl ml-2">
      <FaTrash className={style} />
      <FaEraser className={style} />
      <FaPaintBrush className={style} />
      <FaPen className={style} />
    </div>
  );
};
