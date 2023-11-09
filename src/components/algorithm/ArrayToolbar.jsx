import React from "react";
import { FaRandom } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { FaCode } from "react-icons/fa";

const ArrayToolbar = ({ random, restart, step, showCode, setShowCode }) => {
  return (
    <div className="p-4">
      <div className="flex space-x-4">
        {[
          { icon: <FaRandom className="mr-2" />, text: "random array" },
          { icon: <FaRedo className="mr-2" />, text: "restart" },
          { icon: <FaPlay className="mr-2" />, text: "step over" },
          { icon: <FaCode className="mr-2" />, text: "showcode" },
        ].map((item, index) => (
          <div
            key={index}
            className="hover:text-white duration-300 text-rtools-blue-100 py-2 px-2 flex items-center cursor-pointer"
          >
            {item.icon}
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArrayToolbar;
