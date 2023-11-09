import React from "react";
import { FaRandom } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { FaCode } from "react-icons/fa";

const ArrayToolbar = ({ random, restart, step, showCode, setShowCode }) => {
  return (
    <div className="p-4">
      <div className="flex space-x-4">
        <div className=" hover:text-white duration-300 text-rtools-blue-100 py-2 px-2 flex items-center cursor-pointer">
          <FaRandom className="mr-2" />
          random array
        </div>

        <div className=" hover:text-white duration-300 text-rtools-blue-100 py-2 px-2 flex items-center cursor-pointer">
          <FaRedo className="mr-2" />
          restart
        </div>

        <div className=" hover:text-white duration-300 text-rtools-blue-100 py-2 px-2 flex items-center cursor-pointer">
          <FaPlay className="mr-2" />
          step over
        </div>

        <div className=" hover:text-white duration-300 text-rtools-blue-100  py-2 px-2 flex items-center cursor-pointer">
          <FaCode className="mr-2" />
          showcode
        </div>
      </div>
    </div>
  );
};

export default ArrayToolbar;
