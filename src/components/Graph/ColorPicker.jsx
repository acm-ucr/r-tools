import { COLORS } from "@/data/icons";
import { FaSquare } from "react-icons/fa";

const ColorPicker = () => {
  return (
    <div className="flex gap-2 justify-center w-full">
      {Object.entries(COLORS).map(([name, color], index) => (
        <FaSquare
          key={index}
          className={`${color.text} text-3xl cursor-pointer`}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
