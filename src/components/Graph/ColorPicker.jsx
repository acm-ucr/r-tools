import { COLORS } from "@/data/icons";
import { FaSquare } from "react-icons/fa";

const ColorPicker = ({ selectedColor, setSelectedColor }) => {
  return (
    <div className="flex gap-2 justify-center w-full">
      <FaSquare
        onClick={() => setSelectedColor("white")}
        className={`text-white text-3xl duration-200 hover:scale-110 ${
          selectedColor === "white" && "border-2 p-0.5 rounded"
        }`}
      />
      {Object.entries(COLORS).map(([name, color], index) => (
        <FaSquare
          onClick={() => setSelectedColor(name)}
          key={index}
          className={`${color.text} ${
            selectedColor === name && color.border + " border-2 p-0.5 rounded"
          } text-3xl duration-200 hover:scale-110`}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
