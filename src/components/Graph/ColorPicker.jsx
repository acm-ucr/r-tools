import { COLORS } from "@/data/colors";
import { FaSquare } from "react-icons/fa";

const ColorPicker = ({ data, setData }) => {
  return (
    <div className="flex gap-2 justify-center w-full">
      <FaSquare
        onClick={() => setData({ ...data, selectedColor: "white" })}
        className={`text-white text-3xl duration-200 hover:scale-110 ${
          data.selectedColor === "white" && "border-2 p-0.5 rounded"
        }`}
      />
      {Object.entries(COLORS).map(([name, color], index) => (
        <FaSquare
          onClick={() => {
            if (data.tool === "pen" && data.tool === "brush")
              setData({ ...data, selectedColor: name });
          }}
          key={index}
          className={`${color.text} ${
            data.selectedColor === name &&
            color.border + " border-2 p-0.5 rounded"
          } text-3xl duration-200 hover:scale-110`}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
