import { FaEraser, FaPaintBrush, FaPen } from "react-icons/fa";
import { COLORS } from "@/data/icons";

const Cursor = ({ tool, selectedColor, cursorPos }) => {
  const style = {
    stroke: "white",
    strokeWidth: "20px",
    cursor: "none",
    pointerEvents: "none",
    color:
      selectedColor &&
      (selectedColor === "white" || !selectedColor
        ? "black"
        : COLORS[selectedColor].textColor),
    position: "absolute",
    left: `${cursorPos.x}px`,
    top: `${cursorPos.y}px`,
  };
  return tool === "brush" ? (
    <FaPaintBrush style={style} />
  ) : tool === "pen" ? (
    <FaPen style={style} />
  ) : tool === "eraser" ? (
    <FaEraser style={style} />
  ) : null;
};

export default Cursor;
