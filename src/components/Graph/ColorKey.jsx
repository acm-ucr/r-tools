import React from "react";
import { FaSquare } from "react-icons/fa";
import { COLORS } from "@/data/colors";

const ColorKey = ({ color, text }) => {
  return (
    <div className="flex items-center">
      <FaSquare className={`${COLORS[color].text}`} />
      <div className="ml-1 text-xl">{text}</div>
    </div>
  );
};

export default ColorKey;
